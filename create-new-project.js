const { exec } = require("child_process");

function createNextProject(name) {
    exec(`mkdir ${name}`, () => {
        exec(`git clone https://github.com/CodeSteel/NextJS-Template ${name}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`Error: ${error.message}`);
                return;
            }
        });
    });
} 

module.exports = {createNextProject};