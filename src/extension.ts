import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { CommandPaletteProvider } from "./CommandPaletteProvider";
import { QuickRun } from "./QuickRun";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("runChallenger", () => {
            CommandPaletteProvider();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("quickRunChallenger", () => {
            QuickRun();
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
