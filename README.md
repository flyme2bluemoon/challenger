# Challenger

VSCode Extension to help run and test command line programs for competitive programming competitions.

## Using the extension

Open the extension webview in the VScode sidebar. You must select a language and the source code file. Optionally, you can select an input file and an output test. The input file will be passed to the standard input (stdin) of your program. The standard output will be compared to the output test file if one is selected. The input file must be in a directory called `input` and the output test must be in a directory called `output`.

#### Example directory layout

```
.
├── input
│   └── input.txt
├── output
│   └── output.txt
└── sourcecode.cpp
```

## Features

- Compile and run your code for you
- Clean up binary files after running them
- Select file to pass into the standard input of the program
- Compare standard output to a file

## Important notes/FAQ

- This project is still in beta, there may be some bugs left to be ironed out.
    - Please submit bugs using the [Github issues](https://github.com/flyme2bluemoon/challenger/issues) of this repo.
    - Although this extension is meant to help speed up your workflow, be sure to still know how to compile and run your code during competitions in case of a bug
    - Sometimes reloading the VScode window can solve some issues.
        - You can reload the window by searching for `Developer: Reload Window` in the Command Palette.
        - Alternatively, you can reload the window using the following keyboard shortcuts `Command+R` or `Control+R` on macOS and Linux/Windows respectively.
- Please make sure this tool is permitted before using it in competitive competitions. Although I suspect you will most likely be fine, use at your own risk.
- Currently, this extension only works on POSIX (macOS and Linux) systems. It does **NOT** work on Windows since POSIX shell commands do not work in Powershell.
    - This extension might work thorugh Windows Subsystem for Linux (WSL) although your mileage may vary.
- Make sure that you have the compiler or interpreter of the language you choose. This extension does not come with or install any compilers/interpreters. Please see [the languages section](#language-support) for more information.
- Have fun and enjoy!

## Language Support

Below are the list of languages supported by this extension and the expected compilers/interpreters as well as the command used to run them.

### C

> Notes: `cc` should be a symlink or a copy of the default system C compiler. The default C compiler on macOS should be clang and the default C compiler on Linux should be the GNU C compiler (gcc).

```
cc source.c -o challenger_tmpfilename.tmp
./challenger_tmpfilename.tmp
```

### C++

> Notes: `c++` should be a symlink or copy of the default system C++ compiler. The default C++ compiler on macOS should be clang++ and the default C++ compiler on Linux should be g++. The C++ standard used is C++17.

```
c++ source.cpp -std=c++17 -o challenger_tmpfilename.tmp
./challenger_tmpfilename.tmp
```

### Python

> Notes: Python 3 is being using since support for Python 2 is deprecated.

```
python3 source.py
```

### Swift

```
swiftc source.swift -o challenger_tmpfilename.tmp
./challenger_tmpfilename.tmp
```

## Build the extension

```sh
git clone https://github.com/flyme2bluemoon/challenger.git
cd challenger
npm install
npm run compile # or npm run watch
code .
# F5 to run extention
```
