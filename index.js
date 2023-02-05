#! /usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk");
<<<<<<< HEAD
const { StartProject } = require("./features/start-project.js");
const {
  CreateIssue,
  PullMain,
  ResetHead,
  SwitchBranch,
  ShowBranches,
  ShowIssues,
  ShowPulls,
  PushHere,
  PullHere,
} = require("./features/github.js");

const log = (log) => console.log(`${chalk.red("[BOOM]")} ${log}`);

program.addHelpCommand("help [command]", "Displays help for command.");
program.addHelpText(
  "afterAll",
  `\nMore information at ${chalk.red("https://github.com/CodeSteel/Boom")}.`
);

const ping = program
=======
const readline = require("readline");
const { exec } = require("child_process");
const {createNextProject} = require('./create-new-project');

const pingProgram = program
>>>>>>> c3f6ca6c7a7d966be718db486bd4cc00c54672e6
  .command("ping")
  .description("Pings boom.")
  .action(() => {
    log("Pong!");
  });

const switch_to_main = program
  .command("main")
  .description("Switches to the main branch.")
  .action(() => {
    SwitchBranch("main");
  });

const push_here = program
  .command("push")
  .argument("[commit]", "the commit message")
  .description("Pushes the current branch to the remote.")
  .action((commitMessage) => {
    if (!commitMessage) {
      log("No commit message provided!");
      return;
    }

    PushHere(commitMessage);
  });

const pull_here = program
  .command("pull")
  .description("Pulls the latest changes from the remote.")
  .action(() => {
    PullHere();
  });

const start_project = program
  .command("start")
  .argument("[project]", "the name of the project")
  .description(
    "Start's a Create-Inc project. Only works for Create-Inc projects running on Windows."
  )
  .action(async (project) => {
    await StartProject(project);
    log(`Development environment '${project}' started.`);
  });

const show_pulls = program
  .command("pulls")
  .description("Shows all pull requests.")
  .action(() => {
    ShowPulls();
  });

const show_issues = program
  .command("issues")
  .description("Shows all issues.")
  .action(() => {
    ShowIssues();
  });

const new_issue = program
  .command("issue")
  .description("Creates a new issue.")
  .argument("[title]", "title of the issue")
  .action((title) => {
    if (!title) {
      log("No title provided!");
      return;
    }

    CreateIssue(title);
  });

const show_branches = program
  .command("branches")
  .description("Displays the current branch and lists all branches.")
  .action(() => {
    ShowBranches();
  });

const switch_branch = program
  .command("branch")
  .description(
    "Switches to a branch, or creates a new branch if it doesn't exist."
  )
  .argument("[branch]", "the name of the branch")
  .action((branch) => {
    if (!branch) {
      log("No branch name provided!");
      return;
    }

    SwitchBranch(branch);
  });

const pull_main = program
  .command("pullmain")
  .description("Fetches latest and pulls from main.")
  .action(() => {
    PullMain();
  });

const reset_head = program
  .command("resethead")
  .description("Resets the head to the latest commit.")
  .action(() => {
    ResetHead();
  });

const newProjectProgram = program
  .command("newproject")
  .description("creates a new project")
  .argument("[type]", "the type of project")
  .argument("[name]", "the name of the project")
  .action((type, name) => {
    if (!name || !type) {
      return;
    }

    switch(type) {
      case "next":
        console.log(chalk.red("[BOOM]") + ` creating next project '${name}'...`);
        createNextProject(name);
    }
  }); 

program.parse(process.argv);

module.exports = { program };
