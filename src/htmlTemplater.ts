import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as Mustache from "mustache";
import { getNonce } from "./getNonce";
import { availableLanguages } from "./globals";
import { getWorkspaceInfo } from "./fileManager";

export async function getHtmlSrc(extensionUri: vscode.Uri, cspSource: string) {
    const scriptUri = path.join("vscode-resource:", extensionUri.fsPath, "media", "app.js");
    const styleResetUri = path.join("vscode-resource:", extensionUri.fsPath, "media", "reset.css");
    const styleVSCodeUri = path.join("vscode-resource:", extensionUri.fsPath, "media", "vscode.css");
    const styleMainUri = path.join("vscode-resource:", extensionUri.fsPath, "media", "main.css");
    const bootstrapUri = path.join("vscode-resource:", extensionUri.fsPath, "media", "bootstrap.min.css");
    const nonce = getNonce();

    let view = {
        bootstrapUri,
        styleResetUri,
        styleVSCodeUri,
        styleMainUri,
        scriptUri,
        cspSource,
        nonce,
        languageSelectElement: "",
        fileSelectElement: "",
        inputSelectElement: "",
        outputSelectElement: ""
    };

    let htmlSrc = fs.readFileSync(vscode.Uri.joinPath(extensionUri, "webviews", "index.html").fsPath, "utf8");

    let languageSelectElement = `<label for="languages">Language</label><select name="languages" id="languages" class="form-select"><option selected disabled>select</option>`;
    availableLanguages.forEach(lang => {
        languageSelectElement += `<option>${lang}</option>`;
    });
    languageSelectElement += `</select>`;
    view.languageSelectElement = languageSelectElement;

    const workspaceInfo = await getWorkspaceInfo();
    if (workspaceInfo !== undefined) {
        let fileSelectElement = "<label for='fileSelect'>Source Code</label> <select name='fileSelect' id='fileSelect' class='form-select'> <option selected disabled>select</option>";
        workspaceInfo.cwdList.forEach((file: string) => {
            fileSelectElement += `<option>${file}</option>`;
        });
        fileSelectElement += `</select>`;
        view.fileSelectElement = fileSelectElement;

        if (workspaceInfo.inputList !== undefined) {
            let inputSelectElement = "<label for='inputSelect'>Input file</label> <select name='inputSelect' id='inputSelect' class='form-select'> <option selected>None</option>";
            workspaceInfo.inputList.forEach((file: string) => {
                inputSelectElement += `<option>${file}</option>`;
            });
            inputSelectElement += `</select>`;
            view.inputSelectElement = inputSelectElement;
        }

        if (workspaceInfo.outputList !== undefined) {
            let outputSelectElement = "<label for='outputSelect'>Output test</label> <select name='outputSelect' id='outputSelect' class='form-select'> <option selected>None</option>";
            workspaceInfo.outputList.forEach((file: string) => {
                outputSelectElement += `<option>${file}</option>`;
            });
            outputSelectElement += `</select>`;
            view.outputSelectElement = outputSelectElement;
        }
    } else {
        vscode.window.showErrorMessage("This extension only works inside workspaces.");
    }

    htmlSrc = Mustache.render(htmlSrc, view);

    return htmlSrc;
}
