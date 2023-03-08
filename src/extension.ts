import * as vscode from 'vscode';
import * as markdownit from 'markdown-it';

const axios = require("axios");
const packageJson = require('../package.json');
const md = new markdownit();

// Gets called when the extension is activated
export async function activate(context: vscode.ExtensionContext) {
	const latestVersion = await getLatestReleaseInfo('JeroenBL', 'TheAssistent');
	if (latestVersion && latestVersion.version !== packageJson.version) {
		await vscode.window.showInformationMessage(`Version: [${latestVersion.version}] of TheAssistent is now available on: [Github](https://github.com/JeroenBL/TheAssistent/releases/latest)`);
	}

	registerCommands();
}

export function deactivate() { }

// Registers all available commands from the extension in VSCode
function registerCommands() {
	vscode.commands.registerCommand('theassistent.convertToAcademicEnglish', registerCommandConvertToAcademicEnglish);
	vscode.commands.registerCommand('theassistent.convertToSpecificLanguage', registerCommandConvertToSpecificLanguage);
	vscode.commands.registerCommand('theassistent.convertToPowerShell', registerCommandConvertToPowerShell);
	vscode.commands.registerCommand('theassistent.explainCode', registerCommandExplainCode);
	vscode.commands.registerCommand('theassistent.addCodeComments', registerCommandAddCodeComments);
	vscode.commands.registerCommand('theassistent.createPowerShellRegex', registerCommandCreatePowerShellRegex);
	vscode.commands.registerCommand('theassistent.getCompletionBasedOnUserPrompt', registerCommandGetCompletionBasedOnUserPrompt);
	vscode.commands.registerCommand('theassistent.requestCodeReview', registerCommandRequestCodeReview);
	vscode.commands.registerCommand('theassistent.getMeetingSummary', registerCommandGetMeetingSummary);
	vscode.commands.registerCommand('theassistent.explainError', registerCommandExplainError);
}

// Registers the command for: [ConvertToAcademicEnglish]
async function registerCommandConvertToAcademicEnglish() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	const selectedText = editor.document.getText(selection);
  
	const prompt = `I want you to act as a language translator. You will translate my text to academic English and correct grammar and spelling mistakes. My text:\n\n${selectedText}`;
	const model = "text-davinci-003";
	const temperature = 1;
	const maxTokens = 700;
	const topP = 0.1;
	
	await getCompletionResult(prompt, model, temperature, maxTokens, topP);
}

// Registers the command for: [ConvertToSpecificLanguage]
async function registerCommandConvertToSpecificLanguage() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	const selectedText = editor.document.getText(selection);
	const inputLanguage = await vscode.window.showInputBox({
		prompt: 'Specify language',
		value: 'Spanish'
	});

	const prompt = `I want you to act as an ${inputLanguage} translator, correct spelling and improve my text. You will translate my text and answer in the corrected and improved version of my text in ${inputLanguage}. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level ${inputLanguage} words and sentences. Keep the meaning same, but make them more literary. I want you to only reply with the correction, improvements and nothing else. My text:\n\n${selectedText}`;
	const model = "text-davinci-003";
	const temperature = 0.3;
	const maxTokens = undefined;
	const topP = 1;

	await getCompletionResult(prompt, model, temperature, maxTokens, topP);
}

// Registers the command for: [ConvertToPowerShell]
async function registerCommandConvertToPowerShell() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	const selectedText = editor.document.getText(selection);

	const prompt = `I want you to convert the following code to PowerShell:\n\n${selectedText}`;
	const model = "text-davinci-003";
	const temperature = 0.3;
	const maxTokens = undefined;
	const topP = 1;

	await getCompletionResult(prompt, model, temperature, maxTokens, topP);
}

// Registers the command for: [ExplainCode]
async function registerCommandExplainCode() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	const selectedText = editor.document.getText(selection);

	const prompt = `I want you to explain the following code:\n\n${selectedText}`;
	const model = "text-davinci-003";
	const temperature = 1;
	const maxTokens = undefined;
	const topP = 1;

	await getCompletionResult(prompt, model, temperature, maxTokens, topP);
}

// Registers the command for: [AddCodeComments]
async function registerCommandAddCodeComments() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	const selectedText = editor.document.getText(selection);

	const prompt = `Add code comments for each line for the following PowerShell code:\n\n${selectedText}`;
	const model = "text-davinci-003";
	const temperature = 1;
	const maxTokens = undefined;
	const topP = 1;
	
	await getCompletionResult(prompt, model, temperature, maxTokens, topP);
}

// Registers the command for: [createPowerShellRegex]
async function registerCommandCreatePowerShellRegex() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	const selectedText = editor.document.getText(selection);
	const input = await vscode.window.showInputBox({
		prompt: 'Specify the PowerShell regex you need',
		value: 'a regex that matches a url'
	});
	const prompt = `Write a regex using PowerShell match for:\n\n${input}\n\n and only return a concise PowerShell code example that clearly shows how to use it. Do not wrap the result in backticks.`;
	const model = "text-davinci-003";
	const temperature = 1;
	const maxTokens = undefined;
	const topP = 1;
	
	await getCompletionResult(prompt, model, temperature, maxTokens, topP);
}

// Registers the command for: [getCompletionBasedOnUserPrompt]
async function registerCommandGetCompletionBasedOnUserPrompt() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const prompt = await vscode.window.showInputBox({ prompt: 'Specify prompt' });
	
	if (prompt !== undefined && prompt !== '') {
		await getCompletionResult(prompt, undefined, undefined, undefined, undefined);
	}
}

// Registers the command for: [requestCodeReview]
async function registerCommandRequestCodeReview() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	const selectedText = editor.document.getText(selection);

	const prompt = `I want you to act as a code reviewer. I will provide you with some PowerShell code and you will do an in-depth review - including pros, cons, bugs and improvements. My code:\n\n${selectedText}`;
	const model = "text-davinci-003";
	const temperature = 0;
	const maxTokens = undefined;
	const topP = 1;
	
	await getCompletionResult(prompt, model, temperature, maxTokens, topP);
}

// Registers the command for: [getMeetingSummary]
async function registerCommandGetMeetingSummary() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	const selectedText = editor.document.getText(selection);

	const prompt = `Convert my short hand notes into a first-hand account of the meeting. My notes:\n\n${selectedText}`;
	
	await getCompletionResult(prompt, undefined, undefined, undefined, undefined);
}

// Registers the command for: [explainError]
async function registerCommandExplainError() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	const selectedText = editor.document.getText(selection);

	const prompt = `I want you to provide a clear explanation of the following error and also provide five solutions and ways to debug the error:\n\n${selectedText}`;
	
	await getCompletionResult(prompt, undefined, undefined, undefined, undefined);
}

// Async function that invokes the 'postAICompletion' function and creates the HTML view
async function getCompletionResult(prompt?: string, model?: string, temperature?: number, maxTokens?: number, topP?: number) {
	try {
		const response = await postAICompletion(prompt, model, temperature, maxTokens, topP);
		await createHTMLView(response, prompt);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Async function that actually posts the GPT completion to the OpenAI API
async function postAICompletion(prompt?: string, model?: string, temperature?: number, maxTokens?: number, topP?: number): Promise<string> {
	// Get current configuration settings
	const configuration = vscode.workspace.getConfiguration("theassistent") as vscode.WorkspaceConfiguration;

	if (!model) { model = configuration.model; }
	if (!temperature) { temperature = configuration.temperature; }
	if (!maxTokens) { maxTokens = configuration.maxTokens; }
	if (!topP) { topP = configuration.topP; }

	const requestBody = {
		prompt: prompt,
		model: model,
		temperature: temperature,
		max_tokens: maxTokens,
		top_p: topP
	};

	const headers = {
		Authorization: `Bearer ${configuration.apiKey}`
	};

	// Show progress bar while making API call
	return vscode.window.withProgress({
		location: vscode.ProgressLocation.Notification,
		title: 'TheAssistent',
		cancellable: true // set cancellable option to true
	}, async (progress, token) => { // add token parameter to function
		token.onCancellationRequested(() => {
			// handle cancellation request
			vscode.window.showInformationMessage('API call cancelled');
		});
		progress.report({ message: 'Getting completion result...' });
		const response = await axios.post('https://api.openai.com/v1/completions', requestBody, { headers });
		progress.report({ message: 'Completion result ready...' });
		return response;
	});
}
  
// Async function that creates an HTML view containig the result
async function createHTMLView(result: any, lineText?: any) {
	const plainTextResult = result.data.choices[0].text;
	const htmlResult = `
	<div style="font-family: sans-serif; font-size: 14px;">
   	   ${md.render(lineText)}
	  <br />
	  <h2>Results:</h2>
	  <pre style="white-space: pre-wrap;">${plainTextResult}</pre>
	  <br />
	  <button id="copy-button" style="background-color: #4CAF50; color: white; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Copy</button>
	</div>
	<body>
	  <script>
		  const vscode = acquireVsCodeApi();
		  const copyButton = document.querySelector("#copy-button");
	
		  // Add click event listener to copy button
		  copyButton.addEventListener("click", () => {
		  vscode.postMessage({ command: "copy" });
		  });
		  
		  vscode.postMessage({ command: "init" });
	  </script>
	</body>`;

	const panel = vscode.window.createWebviewPanel(
	  "Completion",
	  "Completion result",
	  vscode.ViewColumn.Beside,
	  {
		enableScripts: true // Enable JavaScript in the webview
	  }
	);
  
	panel.webview.html = htmlResult;

	// Add click event listener to copy button
	panel.webview.onDidReceiveMessage((message) => {
		if (message.command === "copy") {
		  let textToCopy = plainTextResult;
		  if (textToCopy.startsWith("<pre><code>") && textToCopy.endsWith("</code></pre>")) {
			textToCopy = textToCopy.slice(11, -13);
		  }
		  vscode.env.clipboard.writeText(textToCopy).then(() => {
			vscode.window.showInformationMessage("Text copied to clipboard!");
		  });
		}
	});

	// Add script to webview to send message when button is clicked
	panel.webview.postMessage({ command: "init" });
}

// Checks if the installed extension is the latest version and displays a message if its not
async function getLatestReleaseInfo(owner: string, repo: string) {
	const url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
	const headers = {
		'User-Agent': 'axios'
	};

	try {
		const response = await axios.get(url, { headers });
		return {
			version: response.data.tag_name,
			url: response.data.html_url
		};
	} catch (error) {
		console.error(error);
		return null;
	}
}