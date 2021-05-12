import * as vscode from "vscode";
import { availableLanguages } from "./globals";
import { quickPicker } from "./quickPicker";
import { getWorkspaceInfo } from "./fileManager";
import { submissionHandler } from "./submissionHandler"

export async function CommandPaletteProvider() {
    const language = await quickPicker("Select language", availableLanguages);
    if (language === undefined) {
        vscode.window.showErrorMessage("Please select a language.");
        return;
    }
    const workspaceInfo = await getWorkspaceInfo();
    if (workspaceInfo === undefined) {
        vscode.window.showErrorMessage("This extension only works inside workspaces.");
        return;
    }
    const sourceCodeFile = await quickPicker("Select Source Code File", workspaceInfo.cwdList);
    if (sourceCodeFile === undefined) {
        vscode.window.showErrorMessage("Please select a source code file.");
        return;
    }
    let inputFile: string | undefined;
    if (workspaceInfo.inputList !== undefined) {
        inputFile = await quickPicker("Select input file", workspaceInfo.inputList, false);
        if (inputFile === "Skip") {
            inputFile = undefined;
        }
    } else {
        inputFile = undefined;
    }
    let outputTest: string | undefined;
    if (workspaceInfo.outputList !== undefined) {
        outputTest = await quickPicker("Select output test file", workspaceInfo.outputList, false);
        if (outputTest === "Skip") {
            outputTest = undefined;
        }
    } else {
        outputTest = undefined;
    }
    submissionHandler(language, sourceCodeFile, inputFile, outputTest);
}
