const vscode = acquireVsCodeApi();

document.getElementById("run-button").addEventListener("click", runCode);
function runCode() {
    const language = document.getElementById("languages").value;
    if (language === null || language === "select") {
        vscode.postMessage({
            "command": "error",
            "error": "Please specify a language."
        });
        return;
    }

    const sourceCodeFile = document.getElementById("fileSelect").value;
    if (sourceCodeFile === null || sourceCodeFile === "select") {
        vscode.postMessage({
            "command": "error",
            "error": "Please specify a source code file."
        });
        return;
    }

    let inputFile = document.getElementById("inputSelect").value;
    let outputTest = document.getElementById("outputSelect").value;

    if (inputFile === "None") {
        inputFile = null;
    }

    if (outputTest === "None") {
        outputTest = null;
    }

    vscode.postMessage({
        "command": "codeSubmission",
        language,
        sourceCodeFile,
        inputFile,
        outputTest
    });
    return;
}

document.getElementById("reload-button").addEventListener("click", reloadWebview);
function reloadWebview() {
    vscode.postMessage({
        "command": "reload"
    })
}
