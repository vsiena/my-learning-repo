# Notes for using git

### Link to lesson
- [Lesson](https://theprimeagen.github.io/fem-git/)

### Git Manual From Terminal
- `man man` to see manual: This will open up the man page for man.

### Key Terms
- repo: a git tracked project
- commit: A point in time representing the project in its entirety.
- index: I will use this term or staging area interchangeably.
    - The Git index is a critical data structure in Git. It serves as the “staging area” between the files you have on your filesystem and your commit history. When you run git add , the files from your working directory are hashed and stored as objects in the index, leading them to be “staged changes”.
- squash: to take several commits and turn it into one commit
- work tree, working tree, main working tree: This is your git repo. This is the set of files that represent your project. Your working tree is setup by `git init` or `git clone`.
- untracked, staged, and tracked:
    - `untracked` files. this means files that are not staged for the first time (indexed) or already committed / tracked by the repo. These files are the easiest to accidentally lose work on since git does not have any information about these files.
    - `indexed` / staged: this is where the changes are to be committed. You must stage before you commit and you stage changes by using the git add command. see man git-add for more information
    - `tracked`. These are files that are already tracked by git. Now a file could be tracked AND have staged changes (changes stored in the index) ready to be committed.
- remote: The same git repo on another computer or directory. You can accept changes from or potentially push changes too. Think github





