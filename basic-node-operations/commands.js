const fs = require("fs");

//write out data
function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
    //parses the user input to understand which command was typed
    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];
}

switch (command) {
    case "echo":
        //we will add the functionality of echo next within the object commandLibrary    
        commandLibrary.echo(userInputArray.slice(1).join(" "));
        break;

    case "cat":
        commandLibrary.cat(userInputArray.slice(1));
        break;

    case "head":
        commandLibrary.cat(userInputArray.slice(0, 1));
        break;

    case "tail":
        commandLibrary.cat(userInputArray.slice(command.length - 1));
        break;

    default:
        commandLibrary.errorHandler(userInputArray);
}


//where we will store the logic of our commands
const commandLibrary = {
    echo: function(userInput) {
        done(userInput);
    },
    cat: function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },
    head: function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            let dataArray = data.toString().split('\n');
            let lines = [];
            for (let i = 0; i < 5; i++) {
                lines.push(dataArray[i]);
            }
            data = lines.join('\n');
            done(data);
        });
    },
    tail: function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            let dataArray = data.toString().split('\n');
            let lines = [];
            for (let i = dataArray.length - 6; i < dataArray.length; i++) {
                lines.push(dataArray[i]);
            }
            data = lines.join('\n');
            done(data);
        });
    },
    errorHandler: function(userInput) {
        done('Error! ' + userInput + ' is not a command');
    }
};


module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;