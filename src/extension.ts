import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { CommandPaletteProvider } from "./CommandPaletteProvider";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("runChallenger", () => {
            CommandPaletteProvider();
        })
    );

    const provider = new SidebarProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            SidebarProvider.viewType,
            provider
        )
    );
}

export function deactivate() {}
