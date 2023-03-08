# TheAssistent

![logo](https://raw.githubusercontent.com/JeroenBL/TheAssistent/main/logo.png)

- [TheAssistent](#theassistent)
  - [Introduction](#introduction)
  - [GPT](#gpt)
  - [Requirements](#requirements)
    - [Create an OpenAI account and API key](#create-an-openai-account-and-api-key)
  - [Costs](#costs)
  - [How to use](#how-to-use)
    - [Installation](#installation)
    - [Version check](#version-check)
    - [Command palette](#command-palette)
  - [Settings](#settings)
  - [Commands](#commands)
  - [Examples](#examples)
    - [Explain code](#explain-code)
    - [Get a completion from the OpenAI API.](#get-a-completion-from-the-openai-api)
    - [Get a code review for the selected code](#get-a-code-review-for-the-selected-code)
  - [License](#license)
  - [Contributing](#contributing)

## Introduction

The `TheAssistent` extension is designed to interact with the OpenAI API through VSCode. While there are several PowerShell modules available that interact with the API, my personal workflow is centered around VSCode rather than a PowerShell console. For this reason, I developed the TheAssistent extension with most of its commands focused on PowerShell and creating Markdown documentation. 

> The name `TheAssistent` is temporary and subject to change in the future, as it is currently used as a development name.

> If you have suggestions or ideas, see: [Contributing](#contributing)

## GPT
GPT or Generative Pre-trained Transformer is a type of artificial intelligence developed by OpenAI. It is capable of generating human-like text by predicting the next word in a sequence based on the input it has been trained on. GPT-3, in particular, is one of the largest and most advanced language models to date, with the ability to perform a wide range of tasks, such as translation, summarization, question-answering, and more. 

## Requirements

- [ ] Account on: https://openai.com/api/
- [ ] Personal API key

### Create an OpenAI account and API key

1. Create an account on: https://openai.com/api/
2. Go to: https://platform.openai.com/
3. Click on: `Personal -> View API keys`
4. Click on: `Create new secret key`
5. Copy and paste your API key in the VSCode setting: `theassistent.APIKey`.

## Costs

OpenAI API's require payment. Upon creating an API key, new users receive a 18 dollar trial credit, which can be used to make API calls. The cost of API usage is calculated based on the number of tokens generated, with 1000 tokens equating to one cost unit. The number of tokens generated depends on the data sent to the API and the data received from it, and varies based on the model being used. More advanced models tend to be more expensive. You can use OpenAI's tokenizer to get an insight. Please refer to: https://platform.openai.com/tokenizer

## How to use

### Installation

To install this extension: 

1. Click on the extensions icon or press: `ctrl+shift+x` (`cmd+shift+x` on mac).
2. Click on the three dots `...` and select: `Install from VSIX`.
3. Browse to the folder where the VSIX file is downloaded.

### Version check

The first time the extension is used, a check will be performed to determine if a new version is available. If a new version is found, an informational message will be displayed indicating the version number and a download link.

> Note that this check will be performed each time you use the extension in a new VSCode instance.

### Command palette

All commands are available from the VSCode command palette by clicking on: `View -> Command palette` or press: `ctrl+shift+p` (`cmd+shift+p` on mac). 

To see all available commands, browse to: `The Assistent`.

### Context menu

Some commands are also available from the `context menu`. See the [Command Setion](#commands) for an overview.

> :exclamation: __The commands in the context menu are only available when text is selected.__

## Settings

The extension contributes to the following settings:

| Setting | Description |
| - | - |
| TheAssistent.APIKey | The ApiKey to authenticate to the OpenAI API |
| TheAssistent.MaxTokens | The maximum number of tokens to generate. The default value is set to: `500` |
| TheAssistent.Model | Name of the model to use. The default model is set to: `text-davinci-003` which is GPT's most advanced model |
| TheAssistent.Temperature | Controls the randomness of the generated text. `0` means more strict, `1` more creative. The default value is set to: `0` |
| TheAssistent.TopP | Controls how many different words or phrases the language model considers when it's trying to predict the next word. The default value is set to: `0` |

To modify the settings:

1. Click on: `File -> Preferences -> Settings` or press: `ctrl+,` (`cmd+,` on mac) and type: `The Assistent`.

For an overview of all available models, please refer to: https://platform.openai.com/docs/models/overview

## Commands 

The following commands are available:

| Command | Description | Settings | Where to find |
| - | - | - | - |
| theassistent.convertToAcademicEnglish | Converts the current line(s) to academic English | - Model: `text-davinci-003`<br> - Temperature: `1`<br> - MaxTokens: `700`<br> - TopP: `0.1` | - Command palette<br> - Context menu
| theassistent.convertToSpecificLanguage | Converts the current line(s) to the specified language | - Model: `text-davinci-003`<br> - Temperature: `0.3`<br> - MaxTokens: `undefined`<br> - TopP: `1` | - Command palette<br>
| theassistent.getCompletionBasedOnUserPrompt | Get a completion from the OpenAI API | As specified: in `theassistent.configuration` | - Command palette<br>
| theassistent.convertToPowerShell | Converts code to PowerShell | - Model: `text-davinci-003`<br> - Temperature: `0.3`<br> - MaxTokens: `undefined`<br> - TopP: `1` | - Command palette<br> - Context menu
| theassistent.explainCode | Explains the selected code | - Model: `text-davinci-003`<br> - Temperature: `1`<br> - MaxTokens: `undefined`<br> - TopP: `1` | - Command palette<br> - Context menu
| theassistent.createPowerShellRegex | Creates a new regex based on the provided details | - Model: `text-davinci-003`<br> - Temperature: `1`<br> - MaxTokens: `undefined`<br> - TopP: `1` | - Command palette<br>
| theassistent.addCodeComments | Add code comments to the selected PowerShell code | - Model: `text-davinci-003`<br> - Temperature: `1`<br> - MaxTokens: `undefined`<br> - TopP: `1` | - Command palette<br>
| theassistent.requestCodeReview | Request a code review for the selected PowerShell code | - Model: `text-davinci-003`<br> - Temperature: `0`<br> - MaxTokens: `undefined`<br> - TopP: `1` | - Command palette<br> - Context menu
| theassistent.getMeetingSummary | Converts your short descriptive notes to a first hand account | As specified in: `theassistent.configuration` | - Command palette<br>
| theassistent.explainError | Explains the error and provides solutions and ways to debug | As specified in: `theassistent.configuration` | - Command palette<br> - Context menu

> :exclamation: If a setting is set to `undefined` the default value will be used.

> For more information on the settings, please refer to: [Settings](#settings)

## Examples

### Explain code

TheAssistent can help you understand code. 

1. Select the code that you would like to have explained.
2. Open the command palette by clicking on: `View -> Command palette` or press: `ctrl+shift+p` (`cmd+shift+p` on mac). 
3. Browse to: `The Assistent`.
4. Look for: `Explains the selected code` and press: `enter`.
5. A new window will open with the results.

![explainCode](https://raw.githubusercontent.com/JeroenBL/TheAssistent/main/assets/explainCodeUpdated.gif)

### Get a completion from the OpenAI API.

Sometimes, you just want to ask a question. Whether that's about code or something random like: `Create person data for 2 persons. I need the following fields: userId, employeeId, firstName, lastName, eMailAddress, Title, phoneNumber. Return the data as JSON.`

1. Open the command palette by clicking on: `View -> Command palette` or press: `ctrl+shift+p` (`cmd+shift+p` on mac). 
2. Browse to: `The Assistent`.
3. Look for: `Get a completion from the OpenAI API` and press: `enter`.
4. Specify the prompt and press: `enter`.

![prompt](https://raw.githubusercontent.com/JeroenBL/TheAssistent/main/assets/getCompletionPersons.gif)

> :bulb: The request to the OpenAI API is made using the settings in the `The Assistent` configuration section.

### Get a code review for the selected code

Code reviews are always helpful to make sure your code is correct and does not contain bugs. But, in some cases, a colleague might not be available. `The Assistent` can assist you and provide an in-depth review.

1. Select the code that you would like to have reviewed.
2. Open the command palette by clicking on: `View -> Command palette` or press: `ctrl+shift+p` (`cmd+shift+p` on mac). 
3. Browse to: `The Assistent`.
4. Look for: `Request a code review for the selected PowerShell code` and press: `enter`.

The review is always split into four sections:

- Pros
- Cons
- Bugs
- Improvements

![prompt](https://raw.githubusercontent.com/JeroenBL/TheAssistent/main/assets/codeReview.gif)

## License

This extension is released under the [MIT License](https://github.com/JeroenBL/TheAssistent/blob/main/LICENSE).

## Contributing

Find a bug or have an idea! Open an issue or submit a pull request!

**Enjoy!**