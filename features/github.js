const { exec } = require("child_process");
const chalk = require("chalk");

const log = (log) => console.log(`${chalk.red("[BOOM]")} ${log}`);

function CreateIssue(title) {
  exec("git config --get remote.origin.url", (err, stdout) => {
    if (err) {
      return;
    }

    const urlTitle = title.replace(/ /g, "+");

    if (typeof stdout === "string") {
      let url = stdout.trim() + "/issues/new/" + "?title=" + urlTitle;
      exec(`start ${url}`);
    }
  });
  log("Created new issue!");
}

function PullMain() {
  exec(`git fetch && git pull origin main`);
  log(`Pulled from the latest!`);
}

function ResetHead() {
  exec(`git reset --hard HEAD`);
  log(`Reset head to latest commit!`);
}

function SwitchBranch(branch) {
  exec(`git checkout ${branch}`, (err) => {
    // branch does not exist
    if (err && err.message.includes("did not match any file(s) known to git")) {
      // create new branch
      exec(`git checkout -b ${branch}`, (err) => {
        if (err) {
          log("Error creating branch!");
        }

        log(`Created new branch ${chalk.blue(branch)}!`);
      });
    } else {
      log(`Switched to branch ${chalk.blue(branch)}!`);
    }
  });
}

function ShowBranches() {
  exec(`git branch`, (err, stdout, stderr) => {
    if (err) {
      log("Error getting branches!");
    }

    const branches = stdout.split("\n");
    const currentBranch = branches
      .find((branch) => branch.includes("*"))
      .replace("* ", "");

    console.log(`Current branch: ${chalk.blue(currentBranch)}`);
    for (let branch of branches) {
      if (branch.includes("*")) continue;
      if (branch.trim().length <= 0) continue;
      console.log(`• ${chalk.green(branch)}`);
    }
  });
}

function ShowIssues() {
  exec("git config --get remote.origin.url", (err, stdout, stderr) => {
    if (err) return;

    if (typeof stdout === "string") {
      let url = stdout.trim() + "/issues/";
      exec(`start ${url}`);
    }

    log("Showing issues.");
  });
}

function ShowPulls() {
  exec("git config --get remote.origin.url", (err, stdout, stderr) => {
    if (err) return;

    if (typeof stdout === "string") {
      let url = stdout.trim() + "/pulls/";
      exec(`start ${url}`);
    }

    log("Showing pull requests.");
  });
}

function PushHere(commitMessage) {
  exec(`git branch`, (err, stdout, stderr) => {
    if (err) {
      log("Error getting branches!");
    }

    const branches = stdout.split("\n");
    const currentBranch = branches
      .find((branch) => branch.includes("*"))
      .replace("* ", "");

    exec(
      `git add . && git commit -m "${commitMessage}" && git push origin ${currentBranch}`,
      (err, stdout, stderr) => {
        if (err) {
          if (err.message.includes("nothing to commit, working tree clean")) {
            log("Nothing to commit!");
            return;
          }
          if (
            err.message.includes(
              "Updates were rejected because the tip of your current branch is behind"
            )
          ) {
            log("Your current branch is behind, run 'boom pull' to update!");
            return;
          }

          log("Error pushing!");
          return;
        }

        log(`Pushed to ${chalk.blue(currentBranch)}!`);
      }
    );
  });
}

function PullHere() {
  exec(`git branch`, (err, stdout, stderr) => {
    if (err) {
      log("Error getting branches!");
    }

    const branches = stdout.split("\n");
    const currentBranch = branches
      .find((branch) => branch.includes("*"))
      .replace("* ", "");

    exec(
      `git fetch && git pull origin ${currentBranch}`,
      (err, stdout, stderr) => {
        if (err) {
          if (
            err.message.includes(
              "Please commit your changes or stash them before you merge"
            )
          ) {
            log("Please commit your changes or stash them before you merge.");
            return;
          }

          log("Error pulling!");
          return;
        }

        log(`Pulled from ${chalk.blue(currentBranch)}!`);
      }
    );
  });
}

module.exports = {
  CreateIssue,
  PullMain,
  ResetHead,
  SwitchBranch,
  ShowBranches,
  ShowIssues,
  ShowPulls,
  PushHere,
  PullHere,
};
