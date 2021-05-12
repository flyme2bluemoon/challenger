import * as vscode from "vscode";

async function listCurrentWorkingDirectory() {
    // Since the undefined check is explicitly ignored, ensure that any callers have already checked whether or not vscode.workspace.workspaceFolders is defined.
    // Notice how this function is not exported. That is on purpose. This function should only be called by getWorkspaceInfo which has checks in place.
    // A similar message applies to the listInputDirectory and listOutputDirectory functions
    const currentWorkingDirectory = vscode.workspace.workspaceFolders![0].uri;
    const directoryListing = await vscode.workspace.fs.readDirectory(currentWorkingDirectory);
    return directoryListing;
}

async function listInputDirectory() {
    const inputDirectoryUri = vscode.Uri.joinPath(vscode.workspace.workspaceFolders![0].uri, "input");
    const directoryListing = await vscode.workspace.fs.readDirectory(inputDirectoryUri);
    const res = directoryListing.map(e => "input/" + e[0]);
    return res;
}

async function listOutputDirectory() {
    const outputDirectoryUri = vscode.Uri.joinPath(vscode.workspace.workspaceFolders![0].uri, "output");
    const directoryListing = await vscode.workspace.fs.readDirectory(outputDirectoryUri);
    const res = directoryListing.map(e => "output/" + e[0]);
    return res;
}

export async function getWorkspaceInfo() {
    if (vscode.workspace.workspaceFolders === undefined) {
        return undefined;
    }

    let workspaceInfo: any = {};

    let files: Array<string> = [];
    let inputDirectory = false;
    let outputDirectory = false;

    const directoryListing = await listCurrentWorkingDirectory();

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

    workspaceInfo.cwdList = files;

    if (inputDirectory) {
        const inputFilesListing = await listInputDirectory();
        workspaceInfo.inputList = inputFilesListing;
    }
    if (outputDirectory) {
        const outputFilesListing = await listOutputDirectory();
        workspaceInfo.outputList = outputFilesListing;
    }

    return workspaceInfo;
}
