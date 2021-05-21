# Change Log

All notable changes to the "challenger" extension will be documented in this file.

## Unreleased

### Added
- Support for Dart, Javascript, Typescript, Java, Rust
- Settings file to select compilers when there are multiple available
- Add support for a `.cpignore` file

## [0.2.0] / 2021-05-21

### Added
- Access the extension through the Command Palette
    - Choose language, source file, input file and output test all from command palette
    - Command palette quick run option to run the text file in focus
- Added support for source code files inside subdirectories of workspace folder
- Added support for multiple input and output directories
- More bugs to be fixed later ;)

### Fixed
- Improved sidebar webview stability
- Removed `inputSelectElement` and `outputSelectElement` text when there is no input or output directories
- Reworked index.html to make it the code more maintainable using mustache
- Misc bug fixes

## [0.1.0] / 2021-05-10

### Added
- Initial release
- Sidebar webview
    - Programming language select field
    - Source code select field
    - Input file select field
    - Output test select field
    - Reload webview button
- Autoremove compiled binaries for compiled languages
- Support for C, C++, Python and Swift
- Support for POSIX (macOS and Linux) systems

### Deprecated
- Support for Python 2 will not be including since Python 2 is deprecated
