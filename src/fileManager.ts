import * as vscode from "vscode";

async function listDirectoryContents(relativeDirectory: string) {
    const workspaceFolder = vscode.workspace.workspaceFolders![0].uri;
    const directoryPath = vscode.Uri.joinPath(workspaceFolder, relativeDirectory);
    const directoryListing = await vscode.workspace.fs.readDirectory(directoryPath);
    return directoryListing;
}

function filterFiles(directoryListing: [string, vscode.FileType][], relativeDirectory: string = "") {
    let list: Array<string> = [];
    for (const file of directoryListing) {
        if (file[1] == 1) {
            list.push(relativeDirectory + (relativeDirectory ? "/" : "") + file[0]);
        }
    }
    return list;
}

async function listDirectory(relativeDirectory: string = "") {
    const directoryListing = await listDirectoryContents(relativeDirectory);

    let files: Array<string> = [];
    let inputFiles: Array<string> = [];
    let outputFiles: Array<string> = [];

    for (const file of directoryListing) {
        if (file[1] == 2) {
            if (file[0] === "input") {
                const subdirectoryListing = await listDirectoryContents(relativeDirectory + (relativeDirectory ? "/" : "") + "input");
                inputFiles = inputFiles.concat(filterFiles(subdirectoryListing, relativeDirectory));
            } else if (file[0] === "output") {
                const subdirectoryListing = await listDirectoryContents(relativeDirectory + (relativeDirectory ? "/" : "") + "output");
                outputFiles = outputFiles.concat(filterFiles(subdirectoryListing, relativeDirectory));
            } else {
                const subdirectoryListing = await listDirectory(file[0]);
                files = files.concat(subdirectoryListing.files);
                inputFiles = inputFiles.concat(subdirectoryListing.inputFiles);
                outputFiles = outputFiles.concat(subdirectoryListing.outputFiles);
            }
        } else {
            files.push(relativeDirectory + (relativeDirectory ? "/" : "") + file[0]);
        }
    }

    return {
        files,
        inputFiles,
        outputFiles
    };
}

export async function getWorkspaceInfo() {
    if (vscode.workspace.workspaceFolders === undefined) {
        return undefined;
    }

    let workspaceInfo: any = {};

    const directoryListings = await listDirectory();

    workspaceInfo.cwdList = directoryListings.files;
    workspaceInfo.inputList = directoryListings.inputFiles;
    workspaceInfo.outputList = directoryListings.outputFiles;

    return workspaceInfo;
}
