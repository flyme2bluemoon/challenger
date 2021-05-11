import * as vscode from "vscode";
import { submissionHandler } from "./submissionHandler";
import { getHtmlSrc } from "./htmlTemplater";

export class SidebarProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = "challenger-sidebar";

    private _view?: vscode.WebviewView;

    constructor(
        private readonly _extensionUri: vscode.Uri,
    ) {}

    public async resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,

            localResourceRoots: [
                this._extensionUri
            ]
        };

        webviewView.webview.html = await this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.command) {
                case "codeSubmission": {
                    submissionHandler(data.language, data.sourceCodeFile, data.inputFile, data.outputTest);
                    break;
                }
                case "info": {
                    vscode.window.showInformationMessage(data.message);
                    break;
                }
                case "error": {
                    vscode.window.showErrorMessage(data.error);
                    break;
                }
                case "warning": {
                    vscode.window.showWarningMessage(data.warning);
                    break;
                }
                case "reload": {
                    webviewView.webview.html = await this._getHtmlForWebview(webviewView.webview);
                }
            }
        });
    }

    private async _getHtmlForWebview(webview: vscode.Webview) {
        const htmlSrc = getHtmlSrc(this._extensionUri, webview.cspSource);

        return htmlSrc;
    }
}
