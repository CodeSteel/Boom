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
  .command("issue")
  .description("creates a new issue")
  .argument("[title]", "title of the issue")
  .action((title) => {
    if (title) {
      exec("git config --get remote.origin.url", (err, stdout, stderr) => {
        if (err) {
          return;
        }

        const urlTitle = title.replace(/ /g, "+");

        if (typeof stdout === "string") {
          let url = stdout.trim() + "/issues/new/" + "?title=" + urlTitle;
          exec(`start ${url}`);
        }
      });
      console.log(chalk.green("[BOOM]") + " created new issue!");
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question("• Issue Name?: ", (name) => {
        exec("git config --get remote.origin.url", (err, stdout, stderr) => {
          if (err) {
            return;
          }

          if (typeof stdout === "string") {
            const urlTitle = name.replace(/ /g, "+");

            let url = stdout.trim() + "/issues/new/" + "?title=" + urlTitle;
            exec(`start ${url}`);
          }
        });

        console.log(chalk.green("[BOOM]") + " created new issue!");
        rl.close();
      });
    }
  });

const pushHereProgram = program
  .command("push")
  .description("pushes to the current branch")
  .argument("[message]", "the commit message")
  .action((message) => {
    if (message) {
      exec(`git add . && git commit -m "${message}" && git push`);
      console.log(chalk.green("[BOOM]") + ` pushed to current branch!`);
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question("• Commit Message?: ", (name) => {
        exec(`git add . && git commit -m "${name}" && git push`);
        console.log(chalk.green("[BOOM]") + ` pushed to current branch!`);
        rl.close();
      });
    }
  });

const pullHereProgramm = program
  .command("pull")
  .description("fetches latest and pulls from the current branch")
  .action(() => {
    exec(`git fetch && git pull`);
    console.log(chalk.green("[BOOM]") + ` pulled from the latest!`);
  });

const mergeMainProgram = program
  .command("main")
  .description("merges main into the current branch")
  .action(() => {
    exec(`git merge main`);
    console.log(chalk.green("[BOOM]") + ` merged main into current branch!`);
  });

const resetHeadProgram = program
  .command("resethead")
  .description("resets the head to the latest commit")
  .action(() => {
    exec(`git reset --hard HEAD`);
    console.log(chalk.green("[BOOM]") + ` reset head to latest commit!`);
  });

const newBranchProgram = program
  .command("new")
  .description("creates a new branch")
  .argument("[branch]", "the name of the branch")
  .action(async (branch) => {
    let branchName = branch;

    if (!branchName) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question("• Branch Name?: ", (name) => {
        branchName = name;
        exec(`git checkout -b ${branchName}`, () => {
          console.log(
            chalk.green("[BOOM]") +
              ` created new branch ` +
              chalk.blue(branchName) +
              "!"
          );
        });
        rl.close();
      });
    } else {
      exec(`git checkout -b ${branchName}`, () => {
        console.log(
          chalk.green("[BOOM]") +
            ` created new branch ` +
            chalk.blue(branchName) +
            "!"
        );
      });
    }
  });

const switchBranchProgram = program
  .command("switch")
  .description("switches to a branch")
  .argument("[branch]", "the name of the branch")
  .action((branch) => {
    let branchName = branch;

    if (!branchName) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question("• Branch Name?: ", (name) => {
        branchName = name;
        exec(`git checkout ${branchName}`, (err, stdout, stderr) => {
          if (err) {
            console.log(chalk.red("[BOOM]") + " " + err);

            const rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout,
            });

            if (
              err.message.includes("did not match any file(s) known to git")
            ) {
              rl.question("• Create Branch? (y/n): ", (name) => {
                if (name.toLowerCase() === "y") {
                  exec(`git checkout -b ${branchName}`, (err) => {
                    if (err) {
                      console.log(
                        chalk.red("[BOOM]") + " error creating branch!"
                      );
                    }

                    console.log(
                      chalk.green("[BOOM]") +
                        ` created new branch ` +
                        chalk.blue(branchName) +
                        "!"
                    );

                    return;
                  });
                }
                rl.close();
              });
            }
          } else {
            console.log(
              chalk.green("[BOOM]") +
                ` switched to branch ` +
                chalk.blue(branchName) +
                "!"
            );
          }
        });
        rl.close();
      });
    } else {
      exec(`git checkout ${branchName}`, (err, stdout, stderr) => {
        if (err) {
          console.log(chalk.red("[BOOM]") + " " + err);

          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });

          if (err.message.includes("did not match any file(s) known to git")) {
            rl.question("• Create Branch? (y/n): ", (name) => {
              if (name.toLowerCase() === "y") {
                exec(`git checkout -b ${branchName}`, (err) => {
                  if (err) {
                    console.log(
                      chalk.red("[BOOM]") + " error creating branch!"
                    );
                  }

                  console.log(
                    chalk.green("[BOOM]") +
                      ` created new branch ` +
                      chalk.blue(branchName) +
                      "!"
                  );

                  return;
                });
              }
              rl.close();
            });
          }
        } else {
          console.log(
            chalk.green("[BOOM]") +
              ` switched to branch ` +
              chalk.blue(branchName) +
              "!"
          );
        }
      });
    }
  });

const branchProgram = program
  .command("branch")
  .description("shows the current branch and lists all branches")
  .action(() => {
    exec(`git branch`, (err, stdout, stderr) => {
      if (err) {
        console.log(chalk.red("[BOOM]") + " error getting branches!");
      }

      console.log(chalk.green("[BOOM]") + " showing branches:");
      console.log(chalk.blue(stdout));
    });
  });

const deleteBranchProgram = program
  .command("delete")
  .description("deletes a branch")
  .argument("[branch]", "the name of the branch")
  .action((branch) => {
    if (!branch) {
      rl.question("• Branch Name?: ", (name) => {
        if (name == "main") {
          console.log(chalk.red("[BOOM]") + " cannot delete main branch!");
          return;
        }
        exec(`git branch -d ${name}`, (err, stdout, stderr) => {
          if (err) {
            console.log(chalk.red("[BOOM]") + " error deleting branch!");
            return;
          }

          console.log(
            chalk.green("[BOOM]") + ` deleted branch ` + chalk.blue(name) + "!"
          );
        });
        rl.close();
      });
    } else {
      if (branch == "main") {
        console.log(chalk.red("[BOOM]") + " cannot delete main branch!");
        return;
      }
      exec(`git branch -d ${branch}`, (err, stdout, stderr) => {
        if (err) {
          console.log(chalk.red("[BOOM]") + " error deleting branch!");
          return;
        }

        console.log(
          chalk.green("[BOOM]") + ` deleted branch ` + chalk.blue(branch) + "!"
        );
      });
    }
  });

const issuesProgram = program
  .command("issues")
  .description("shows all issues")
  .action(() => {
    exec("git config --get remote.origin.url", (err, stdout, stderr) => {
      if (err) return;

      if (typeof stdout === "string") {
        let url = stdout.trim() + "/issues/";
        exec(`start ${url}`);
      }

      console.log(chalk.green("[BOOM]") + " opening issues.");
    });
  });

const pullsProgram = program
  .command("pulls")
  .description("shows all pull requests")
  .action(() => {
    exec("git config --get remote.origin.url", (err, stdout, stderr) => {
      if (err) return;

      if (typeof stdout === "string") {
        let url = stdout.trim() + "/pulls/";
        exec(`start ${url}`);
      }

      console.log(chalk.green("[BOOM]") + " opening PRs.");
    });
  });

program.parse(process.argv);

module.exports = { program };
