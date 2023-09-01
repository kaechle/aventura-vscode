# Aventura

Aventura is an experimental theme for Visual Studio Code inspired by the macOS aesthetics. The theme attempts to make VS Code feel like a native macOS application, mimicking the appearance and behavior of apps such as Xcode.

![Aventura](image.png)

## Features

> ⚠️ **Aventura is highly experimental.** It's primarily a personal project and might have several bugs or quirks. It's advisable to use it in non-critical environments. Proceed with caution, and always back up your settings before trying out new themes or modifications.

- A native macOS look and feel
- Custom icons for a seamless macOS experience
- Integration with [Custom CSS and JS Loader](https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-custom-css) and [Vibrancy Continued](https://marketplace.visualstudio.com/items?itemName=illixion.vscode-vibrancy-continued) for enhanced visual modifications

## Installation

Before installing Aventura, ensure you have the Custom CSS and JS Loader and Vibrancy Continued extensions installed.

1. Clone or download this repository
2. Navigate to your VS Code extensions folder and move the aventura-vscode directory there
3. Install the theme with the "Install from location" command in the command palette
4. Modify your VS Code settings.json to include the following:

``` json
"vscode_custom_css.staging_dir": "file:///path-to-your-extensions/aventura-vscode/custom",
"vscode_custom_css.imports": [
    "file:///path-to-your-extensions/aventura-vscode/custom/custom.js",
    "file:///path-to-your-extensions/aventura-vscode/custom/custom.css",
    "file:///path-to-your-extensions/aventura-vscode/custom/tabs.css",
    // ... paths to the other custom css files
],
"vscode_vibrancy.type": "sidebar",
"vscode_vibrancy.theme": "Dark (Only Subbar)",
"vscode_vibrancy.opacity": 0.0,
"workbench.activityBar.visible": false

```

Note: Replace path-to-your-extensions with the actual path where your VS Code extensions are located.

## Contributing

As this is a personal project, I'm not actively seeking contributions, but feel free to fork it and hack away.