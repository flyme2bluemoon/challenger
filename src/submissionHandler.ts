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
    if (language === "c") {
        runCommand += `cc ${sourceCodeFile} -o ${tempFilename}`;
        cleanUpNeeded = true;
        runCommand += ` && ${inputFile ? `cat ${inputFile} |` : ""} ./${tempFilename} ${outputTest ? `| tee ${outputFilename}` : ""}`;
    } else if (language === "cpp") {
        runCommand += `c++ ${sourceCodeFile} -std=c++17 -o ${tempFilename}`;
        cleanUpNeeded = true;
        runCommand += ` && ${inputFile ? `cat ${inputFile} |` : ""} ./${tempFilename} ${outputTest ? `| tee ${outputFilename}` : ""}`;
    } else if (language === "py") {
        runCommand += `${inputFile ? `cat ${inputFile} |` : ""} python3 ${sourceCodeFile} ${outputTest ? `| tee ${outputFilename}` : ""}`;
    } else if (language === "swift") {
        runCommand +=`swiftc ${sourceCodeFile} -o ${tempFilename}`;
        cleanUpNeeded = true;
        runCommand += ` && ${inputFile ? `cat ${inputFile} |` : ""} ./${tempFilename} ${outputTest ? `| tee ${outputFilename}` : ""}`;
    }
    if (outputTest) {
        runCommand += ` && diff ${outputTest} ${outputFilename} && rm ${outputFilename}`;
    }
    if (cleanUpNeeded) {
        runCommand += ` && rm ${tempFilename}`;
    }
    runCommand += "; echo 'Press enter to exit this terminal' && read && exit;";
    terminalWindow.sendText(runCommand);
    terminalWindow.show(false);
}
