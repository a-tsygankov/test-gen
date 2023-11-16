
// This method is called when your extension is deactivated
export function deactivate() {}

import axios from 'axios';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.generateTests', () => {
        generateTests();
    });

    context.subscriptions.push(disposable);
}


function generateTests() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const selectedText = editor.document.getText(editor.selection);
        // Process the selected text (class or method) for test generation
        generateUnitTests(selectedText);
    } else {
        vscode.window.showInformationMessage('No text selected. Select a class or method first.');
    }
}

async function generateUnitTests(selectedText: string) {
    // Use the selected text to generate prompts for ChatGPT and get the generated tests
    const prompts = createPrompts(selectedText);
    const generatedTests = await getGeneratedTestsFromChatGPT(prompts);

    // Display the generated tests in a new editor
    vscode.workspace.openTextDocument({ content: generatedTests }).then(doc => {
        vscode.window.showTextDocument(doc);
    });
}

function createPrompts(selectedText: string): string[] {
    // Implement logic to create prompts for ChatGPT based on the selected class or method
    // Return an array of prompts
    // Example: ["Write a test for the following class: ...", "Write a test for the following method: ..."]
    return [];
}

async function getGeneratedTestsFromChatGPT(prompts: string[]): Promise<string> {
    // Implement logic to make a request to the ChatGPT API and get generated tests
    // You may need to use an API key and handle authentication
    const response = await axios.post('ChatGPT_API_URL', { prompts });
    return response.data.generatedTests;
}