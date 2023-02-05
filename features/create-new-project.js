const { exec } = require("child_process");
const chalk = require("chalk");

const log = (log) => console.log(`${chalk.red("[BOOM]")} ${log}`);

function CreateNextProject(name) {
  exec(`mkdir ${name}`, () => {
    exec(
      `git clone https://github.com/CodeSteel/NextJS-Template ${name}`,
      (error) => {
        if (error) {
          log("Error creating project!");
        }
      }
    );
  });
}

module.exports = { CreateNextProject };
