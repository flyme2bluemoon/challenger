import * as vscode from "vscode";

export async function quickPicker(placeholder: string, items: string[], required: boolean = true) {
    if (!required) {
        items.unshift("Skip");
    }
    const res = await vscode.window.showQuickPick(items, {
        placeHolder: placeholder,
        canPickMany: false
    });
    return res;
}
