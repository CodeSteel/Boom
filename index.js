#! /usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const readline = require("readline");
const { exec } = require("child_process");
// const { getURL, getRepository } = require("./git");

const pingProgram = program
  .command("ping")
  .description("pings boom")
  .action(() => {
    console.log(chalk.green("BOOM") + " said pong!");
  });

const newIssueProgram = program
  .command("newissue")
  .description("creates a new issue")
  .action(() => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("• Issue Name?: ", (name) => {
      console.log(chalk.green("[BOOM]") + " creating issue with " + name);

      exec("git config --get remote.origin.url", (err, stdout, stderr) => {
        if (err) {
          return;
        }

        if (typeof stdout === "string") {
          let url =
            stdout.trim() +
            "/issues/new/" +
            "?title=" +
            name.trim().replace(" ", "%20");
          console.log(url);
          exec(`start ${url}`);
        }
      });

      rl.close();
    });
  });

const pushHereProgram = program
  .command("push")
  .description("pushes to the current branch")
  .action(() => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("• Commit Message?: ", (name) => {
      console.log(chalk.green("[BOOM]") + " pushing to current branch");
      exec(`git add . && git commit -m "${name}" && git push`);
      rl.close();
    });
  });

program.parse(process.argv);

module.exports = { program };
