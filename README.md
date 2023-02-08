# Boom - Streamline Github Commands

A Command Line Interface (CLI) tool to simplify and speed up common Github operations.

## Installation

### **yarn**

`yarn global add @steelio/boom-cli`

### **npm**

`npm install -g @steelio/boom-cli`

## Commands

### **ping**

Pings the `boom` CLI to verify its availability.

### **main**

Switches the current branch to the `main` branch.

### **push [commit]**

Pushes the current branch to the remote repository. Optionally, you can specify a `commit` message.

### **pull**

Retrieves the latest changes from the remote repository and updates the current branch.

### **start [project]**

Start's a project environment. Only works on Windows. Make sure your cursor is at the center of the newly opened terminal window.

### **pulls**

Displays all pull requests in the repository.

### **issues**

Lists all open issues in the repository.

### **issue [title]**

Creates a new issue with a specified `title`.

### **branches**

Shows the current branch and lists all branches in the repository.

### **branch [branch]**

Switches to an existing branch or creates a new branch if it does not exist. You can specify the name of the `branch` you want to switch to or create.

### **pullmain**

Fetches the latest changes from the remote repository and pulls the updated `main` branch.

### **resethead**

Resets the head of the current branch to the latest commit.

### **help [command]**

Displays help for a specific `command`. Use this to get more information about each command.
