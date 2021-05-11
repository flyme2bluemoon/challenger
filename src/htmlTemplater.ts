import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { getNonce } from "./getNonce";

export async function getHtmlSrc(extensionUri: vscode.Uri, cspSource: string) {
    const scriptUri = path.join("vscode-resource:", extensionUri.fsPath, "media", "app.js");
    const styleResetUri = path.join("vscode-resource:", extensionUri.fsPath, "media", "reset.css");
    const styleVSCodeUri = path.join("vscode-resource:", extensionUri.fsPath, "media", "vscode.css");
    const styleMainUri = path.join("vscode-resource:", extensionUri.fsPath, "media", "main.css");
    const bootstrapUri = path.join("vscode-resource:", extensionUri.fsPath, "media", "bootstrap.min.css");

    const nonce = getNonce();

    let htmlSrc = fs.readFileSync(vscode.Uri.joinPath(extensionUri, "webviews", "index.html").fsPath, "utf8");
    htmlSrc = htmlSrc.replaceAll("bootstrapUri", bootstrapUri);
    htmlSrc = htmlSrc.replaceAll("styleResetUri", styleResetUri);
    htmlSrc = htmlSrc.replaceAll("styleVSCodeUri", styleVSCodeUri);
    htmlSrc = htmlSrc.replaceAll("styleMainUri", styleMainUri);
    htmlSrc = htmlSrc.replaceAll("scriptUri", scriptUri);
    htmlSrc = htmlSrc.replaceAll("cspSource", cspSource);
    htmlSrc = htmlSrc.replaceAll("getNonce", nonce);

    if (typeof vscode.workspace.workspaceFolders !== "undefined") {
        const currentWorkingDirectory = vscode.workspace.workspaceFolders[0].uri;
        const directoryListing = await vscode.workspace.fs.readDirectory(currentWorkingDirectory);
        let files: Array<string> = [];
        let inputDirectory = false;
        let outputDirectory = false;
        directoryListing.forEach(file => {
            if (file[1] == 2) {
                if (file[0] == "input") {
                    inputDirectory = true;
                } else if (file[0] == "output") {
                    outputDirectory = true;
                }
            } else {
                files.push(file[0]);
            }
        });
        let fileSelectElement: Array<string> = ["<label for='fileSelect'>Source Code</label>", "<select name='fileSelect' id='fileSelect' class='form-select'>", "<option selected disabled>select</option>"];
        files.forEach(file => {
            fileSelectElement.push(`<option value="${file}">${file}</option>`);
        });
        fileSelectElement.push("</select>");
        htmlSrc = htmlSrc.replaceAll("fileSelectElement", fileSelectElement.join(" "));
        if (inputDirectory) {
            const inputDirectoryUri = vscode.Uri.joinPath(currentWorkingDirectory, "input");
            const tmpInputFilesListing = await vscode.workspace.fs.readDirectory(inputDirectoryUri);
            const inputFilesListing = tmpInputFilesListing.map(e => e[0]);
            let inputSelectElement: Array<String> = ["<label for='inputSelect'>Input file</label>", "<select name='inputSelect' id='inputSelect' class='form-select'>", "<option selected>None</option>"];
            inputFilesListing.forEach(file => {
                inputSelectElement.push(`<option>input/${file}</option>`);
            });
            inputSelectElement.push("</select>");
            htmlSrc = htmlSrc.replaceAll("inputSelectElement", inputSelectElement.join(" "));
        }
        if (outputDirectory) {
            const outputDirectoryUri = vscode.Uri.joinPath(currentWorkingDirectory, "output");
            const tmpOutputFilesListing = await vscode.workspace.fs.readDirectory(outputDirectoryUri);
            const outputFilesListing = tmpOutputFilesListing.map(e => e[0]);
            let outputSelectElement: Array<String> = ["<label for='outputSelect'>Output test</label>", "<select name='outputSelect' id='outputSelect' class='form-select'>", "<option selected>None</option>"];
            outputFilesListing.forEach(file => {
                outputSelectElement.push(`<option>output/${file}</option>`);
            });
            outputSelectElement.push("</select>");
            htmlSrc = htmlSrc.replaceAll("outputSelectElement", outputSelectElement.join(" "));
        }
    }

    return htmlSrc;
}
