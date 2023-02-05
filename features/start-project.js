const { keyboard, Key, mouse, left, right, down } = require("@nut-tree/nut-js");

const openHorizontalPanel = [Key.LeftShift, Key.LeftAlt, Key.Equal];
const openVerticalPanel = [Key.LeftShift, Key.LeftAlt, Key.Minus];
const openNewTerminal = [Key.LeftControl, Key.LeftShift, Key.N];

const moveMouseAmount = 200; // amount of pixels the mouse needs to move from the center of the terminal to the next pane

const createNewPaneDelay = 300; // how long to wait before typing after creating a new terminal pane
const createNewTerminalDelay = 500; // how long to wait before typing after creating a new terminal

keyboard.config.autoDelayMs = 40;

const createDirectory = "F:/CreateXYZ";

async function RunCombo(combo) {
  await keyboard.pressKey(...combo);
  await keyboard.releaseKey(combo[combo.length - 1]);
  await keyboard.releaseKey(...combo);
}

async function Type(prompt) {
  await keyboard.type(prompt);
  await keyboard.pressKey(Key.Enter);
  await keyboard.releaseKey(Key.Enter);
}

async function StartProject(project) {
  const directory = `${createDirectory}/${project}`;

  await RunCombo(openNewTerminal);
  setTimeout(async () => {
    // start docker container
    await Type(`cd ${directory}/api`);
    await Type("yarn docker:compose");

    // start web
    await RunCombo(openHorizontalPanel);
    setTimeout(async () => {
      await mouse.move(right(moveMouseAmount));
      await Type(`cd ${directory}/web`);
      await Type("yarn dev");

      // start storybook
      RunCombo(openVerticalPanel);
      setTimeout(async () => {
        await mouse.move(down(moveMouseAmount));
        await Type(`cd ${directory}/web`);
        await Type("yarn storybook");

        // start vscode
        await mouse.move(left(moveMouseAmount * 2));

        RunCombo(openVerticalPanel);
        setTimeout(async () => {
          await Type(`cd ${directory}/`);
          await Type("code .");
        }, createNewPaneDelay);
      }, createNewPaneDelay);
    }, createNewPaneDelay);
  }, createNewTerminalDelay);

  return true;
}

module.exports = {
  StartProject,
};
