const gitHelp = {
  init: {
    description:
      "Initializes a new Git repository in the current directory.\nSteps:\n1. Navigate to the directory you want to initialize.\n2. Run the command `git init`.\n3. A `.git` directory will be created, and the folder is now a Git repository.",
    example: "`git init`",
    keywords: ["init", "initialize"],
  },
  add: {
    description:
      "Stages changes to be committed.\nSteps:\n1. After making changes to files, use `git add <file>` to stage specific files.\n2. To stage all changes, use `git add .`.\n3. The files are now ready to be committed.",
    example: "`git add .`",
    keywords: ["add", "stage"],
  },
  commit: {
    description:
      "Commits staged changes with a message describing what you've done.\nSteps:\n1. Stage your changes using `git add`.\n2. Run the command `git commit -m 'Your message'`.\n3. The changes are now committed to the repository.",
    example: "`git commit -m 'Your commit message'`",
    keywords: ["commit", "save"],
  },
  push: {
    description:
      "Pushes local repository changes to a remote repository (e.g., GitHub).\nSteps:\n1. Ensure you're on the correct branch by running `git branch`.\n2. Run `git push origin <branch>` to push your changes.\n3. Your changes will be available in the remote repository.",
    example: "`git push origin main`",
    keywords: ["push", "upload"],
  },
  pull: {
    description:
      "Fetches and integrates changes from a remote repository into your current branch.\nSteps:\n1. Ensure you're on the correct branch using `git branch`.\n2. Run `git pull origin <branch>`.\n3. The remote changes will be merged with your local branch.",
    example: "`git pull origin main`",
    keywords: ["pull", "fetch"],
  },
  status: {
    description:
      "Displays the state of the working directory and the staging area, showing any changes made.\nSteps:\n1. Run `git status` to see which files are staged for commit and which have changes but are unstaged.\n2. Review the output for untracked, modified, or deleted files.",
    example: "`git status`",
    keywords: ["status", "state", "changes"],
  },
  branch: {
    description:
      "Lists branches, creates a new branch, or shows the branch you're currently on.\nSteps:\n1. Use `git branch` to list all branches.\n2. Run `git branch <branch-name>` to create a new branch.\n3. To switch branches, use `git checkout <branch-name>`.",
    example: "`git branch` or `git branch new-feature`",
    keywords: ["branch", "feature"],
  },
  checkout: {
    description:
      "Switches to another branch or a specific commit.\nSteps:\n1. Run `git checkout <branch-name>` to switch to an existing branch.\n2. Use `git checkout -b <new-branch>` to create and switch to a new branch.",
    example: "`git checkout main` or `git checkout -b new-branch`",
    keywords: ["checkout", "switch"],
  },
  merge: {
    description:
      "Merges the specified branch into the current branch.\nSteps:\n1. Ensure you're on the branch where you want to merge changes using `git branch`.\n2. Run `git merge <branch-name>` to merge changes from the specified branch into your current branch.",
    example: "`git merge feature-branch`",
    keywords: ["merge", "combine"],
  },
  clone: {
    description:
      "Creates a copy of an existing repository in a new directory.\nSteps:\n1. Run `git clone <repository-url>`.\n2. A new directory with the repository's files will be created.",
    example: "`git clone https://github.com/user/repo.git`",
    keywords: ["clone", "copy"],
  },
  log: {
    description:
      "Displays the commit history for the current branch.\nSteps:\n1. Use `git log` to view the commit history.\n2. Add options like `git log --oneline` for a condensed view.\n3. Use `git log -p` to see differences introduced by each commit.",
    example: "`git log`",
    keywords: ["log", "history"],
  },
  diff: {
    description:
      "Shows the differences between files in the working directory and the staging area, or between commits.\nSteps:\n1. Run `git diff` to see changes between the working directory and the index.\n2. Use `git diff <commit1> <commit2>` to compare two commits.",
    example: "`git diff`",
    keywords: ["diff", "difference", "compare"],
  },
  rebase: {
    description:
      "Reapplies commits on top of another base tip, allowing for a cleaner commit history.\nSteps:\n1. Use `git rebase <branch-name>` to rebase your current branch onto another branch.\n2. Conflicts may arise; resolve them and use `git rebase --continue`.",
    example: "`git rebase branch-name`",
    keywords: ["rebase", "apply", "base"],
  },
  stash: {
    description:
      "Temporarily stores your uncommitted changes so you can work on something else, then restore them later.\nSteps:\n1. Run `git stash` to store changes without committing.\n2. Use `git stash apply` to reapply the stashed changes.",
    example: "`git stash`",
    keywords: ["stash", "store", "save"],
  },
  reset: {
    description:
      "Resets the current HEAD to a specified state. Can be used to undo commits or changes.\nSteps:\n1. Use `git reset --hard <commit>` to undo changes and remove all history after the commit.\n2. Use `git reset --soft` to keep changes but reset commit history.",
    example: "`git reset --hard commit-hash` or `git reset --soft HEAD~1`",
    keywords: ["reset", "undo"],
  },
  fetch: {
    description:
      "Downloads objects and refs from another repository without merging them.\nSteps:\n1. Run `git fetch origin` to retrieve data from the remote repository.\n2. This only updates your local copy; use `git merge` or `git pull` to integrate.",
    example: "`git fetch origin`",
    keywords: ["fetch", "download"],
  },
};

const greetings = {
  hi: "Hi! How can I help you with Git today?",
  hello: "Hello! What Git command would you like to know more about?",
  hey: "Hey there! Ask me anything about Git!",
  help: "Sure, I'm here to help! Ask me about any Git command, like `git status` or `git init`.",
};

function explainCommand(command) {
  const lowerCommand = command.toLowerCase();

  if (greetings[lowerCommand]) {
    return greetings[lowerCommand];
  }

  for (const key in gitHelp) {
    const commandDetails = gitHelp[key];
    const foundKeyword = commandDetails.keywords.find((keyword) =>
      lowerCommand.includes(keyword)
    );
    if (foundKeyword) {
      return `${commandDetails.description}\nExample: ${commandDetails.example}`;
    }
  }

  return "Sorry, I don't recognize that Git command. Try again!";
}

module.exports = explainCommand;
