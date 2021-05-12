import * as vscode from "vscode";
import { getTempFilename, getTempOutFilename } from "./getTempFilename";

export function submissionHandler(language: string, sourceCodeFile: string, inputFile: any, outputTest: any) {
    const terminalWindow = vscode.window.createTerminal("Challenger Terminal");
    let cleanUpNeeded = false;
    const tempFilename = getTempFilename();
    let outputFilename = null;
    if (outputTest) {
        outputFilename = getTempOutFilename();
    }
    let runCommand = "";
    if (language === "C") {
        runCommand += `cc ${sourceCodeFile} -o ${tempFilename}`;
        cleanUpNeeded = true;
        runCommand += ` && ${inputFile ? `cat ${inputFile} |` : ""} ./${tempFilename} ${outputTest ? `| tee ${outputFilename}` : ""}`;
    } else if (language === "C++") {
        runCommand += `c++ ${sourceCodeFile} -std=c++17 -o ${tempFilename}`;
        cleanUpNeeded = true;
        runCommand += ` && ${inputFile ? `cat ${inputFile} |` : ""} ./${tempFilename} ${outputTest ? `| tee ${outputFilename}` : ""}`;
    } else if (language === "Python") {
        runCommand += `${inputFile ? `cat ${inputFile} |` : ""} python3 ${sourceCodeFile} ${outputTest ? `| tee ${outputFilename}` : ""}`;
    } else if (language === "Swift") {
        runCommand +=`swiftc ${sourceCodeFile} -o ${tempFilename}`;
        cleanUpNeeded = true;
        runCommand += ` && ${inputFile ? `cat ${inputFile} |` : ""} ./${tempFilename} ${outputTest ? `| tee ${outputFilename}` : ""}`;
    } else {
        vscode.window.showWarningMessage("An error has occured. Please submit an issue at https://github.com/flyme2bluemoon/challenger/issues. Sorry for the inconvenience...")
    }
    if (outputTest) {
        runCommand += ` && diff ${outputTest} ${outputFilename}; rm ${outputFilename}`;
    }
    if (cleanUpNeeded) {
        runCommand += ` && rm ${tempFilename}`;
    }
    runCommand += "; echo 'Press enter to exit this terminal' && read && exit;";
    terminalWindow.sendText(runCommand);
    terminalWindow.show(false);
}
