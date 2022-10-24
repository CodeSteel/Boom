#! /usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const readline = require("readline");
const { exec } = require("child_process");

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
  .argument("<message>", "the commit message")
  .action((message) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    if (message) {
      exec(`git add . && git commit -m "${message}" && git push`);
    } else {
      rl.question("• Commit Message?: ", (name) => {
        console.log(chalk.green("[BOOM]") + " pushing to current branch");
        exec(`git add . && git commit -m "${name}" && git push`);
        rl.close();
      });
    }
  });

const testProgram = program
  .command("test")
  .description("runs tests")
  .argument("<test>", "the test to run")
  .action((test) => {
    if (test) {
      console.log("Woah, what is " + test);
    } else {
      console.log("Just a simple test!");
    }
  });

program.parse(process.argv);

module.exports = { program };