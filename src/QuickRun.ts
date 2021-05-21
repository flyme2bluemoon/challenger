import * as vscode from "vscode";
import * as path from "path";
import { availableLanguages } from "./globals";
import { quickPicker } from "./quickPicker";
import { submissionHandler } from "./submissionHandler";

export async function QuickRun() {
    if (vscode.window.activeTextEditor === undefined) {
        vscode.window.showErrorMessage("Only works with an active text editor!")
        return;
    }

    const fileName = vscode.window.activeTextEditor.document.fileName;

    const fileExtension = path.extname(fileName);

    let language: string | undefined = undefined;
    switch (fileExtension) {
        case ".c":
            language = "C";
            break;
        case ".cc":
        case ".cpp":
            language = "C++";
            break;
        case ".py":
            language = "Python";
            break;
        case ".swift":
            language = "Swift";
            break;
        default:
            language = await quickPicker("Select language", availableLanguages);
    }

    if (language === undefined) {
        vscode.window.showErrorMessage("Please select a language or use the correct file extension for you source code.");
        return;
    }

    submissionHandler(language, fileName, null, null);

    return;
}
