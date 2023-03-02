# Change Log

## 1.0.1 - 02-03-2023

### Fixed

- Fixed issue that, when using a regex, the prompt send to GPT was not vissible in the webview panel.
- Fixed bug that the `selectedText` was given to the `getCompletionResult` function, but never used.
- Removed timeout that extension did not load until VSCode was fully loaded.

### Changes

- Added a `Copy` button to the webview panel.
- Render the original prompt as a `blockquote`.
- Added the option to cancel the API request to OpenAI with a `cancel` button on the progress bar.

## 1.0.0 - 26-02-2023

1.0.0 release of: `The Assistent`.

### Fixed

### Changes

### Added commands

## 0.0.8 - 26-02-2023

### Fixed

- Using the function without a completion, but click somewhere in the editor, results in an error.
- Extension fails when VSCode is not fully loaded

### Changes

- Updated documentation.
- Fixed typo's.

### Added commands

## 0.0.7 - 25-02-2023

### Fixed

### Changes

- Updated name of the configuration settings from: `theassistent configuration` to: `TheAssistent`.
- Refactored code and removed duplicates.
- Updated readme.

### Added commands

- `theassistent.requestCodeReview`
- `theassistent.getMeetingSummary`

## 0.0.6 - 24-02-2023

### Fixed

### Changes

- Updated check to see if a new version is available. If so, a `window.showInformationMessage` will be displayed.
- Removed package `request-promise-native`. 
- Refactored `getLatestReleaseInfo` function to use axios instead of `request-promise-native`.
- Added progress bar to the `getAICompletion` function to, visually show that an API call is being made.
- Changed `theassistent.askGPT` to always use the settings from the `theassistent` configuration.
- Changed name of: `theassistent.askGPT` to: `theassistent.getCompletionBasedOnUserPrompt`.
- Removed `theassistent.anonymizeCode`.
- Updated readme.

### Added commands

## 0.0.5 - 23-02-2023

### Fixed

### Changes

- Renamed all commands in documentation to the actual name used in the extension.

### Added commands

- theassistent.anonymizeCode

## 0.0.4 - 23-02-2023

### Fixed

- Fixed configuration settings that `topP` was written in PascalCase.
- Fixed `@` character in HTML view for the `Original text`.

### Changes

- Added `markdown-it` to render all code blocks in PowerShell Markdown in the HTML view.
- Updated prompts for commands: `theassistent.convertToPowerShell` and `theassistent.createRegex`
- Changed command name: `theassistent.createRegex` to `theassistent.createPowerShellRegex`
- Added categories: `Productivity` and `Text editing` in the `contributes` section.

### Added commands

- theassistent.addCodeComments

## 0.0.3 - 23-02-2023

### Fixed

### Changes

- Updated title to `TheAssistent` for easy seaching in the command window.

### Added commands

## 0.0.2 - 23-02-2023

### Fixed

- Solved bug that no all selected lines got translated correctly.

### Changes

The following command has been renamed:

- ConvertTo-SpecificLanguage (previously: ConvertToAnyLangauge)

### Added commands

- theassistent.convertToPowerShell
- theassistent.explainCode 
- theassistent.createPowerShellRegex 

## 0.0.1 - 22-02-2023

Initial release of TheAssistent

### Added commands

- theassistent.convertToAcademicEnglish
- theassistent.convertToSpecificLanguage
- theassistent.askGPT