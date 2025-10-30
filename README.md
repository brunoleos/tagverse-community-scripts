# Tagverse Community Scripts

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Scripts](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbrunoleos%2Ftagverse-community-scripts%2Fmain%2Fregistry.json&query=%24.totalScripts&label=scripts)](https://github.com/brunoleos/tagverse-community-scripts)

A curated collection of community-created scripts for the [Tagverse](https://github.com/brunoleos/obsidian-tagverse) Obsidian plugin.

## 🌟 What is This?

This repository contains scripts that transform simple hashtags into interactive, dynamic content in Obsidian. Each script can render:

- 📊 Data visualizations and charts
- 🎯 Task trackers and progress bars
- 🔘 Interactive buttons and forms
- 📈 Analytics and statistics
- 🎨 Visual elements and animations
- ...and much more!

## 🚀 Quick Start

### For Users

1. Install [Tagverse plugin](https://github.com/brunoleos/obsidian-tagverse) in Obsidian
2. Open **Settings → Tagverse → Community Scripts**
3. Browse scripts and click **Install**
4. Start using scripts with your custom tags!

### For Contributors

Want to share your script with the community?

1. **Via Obsidian** (Recommended):
   - Open **Settings → Tagverse → Submit Script**
   - Fill in the form and click **Generate Submission**
   - Follow the automated instructions

2. **Manual PR**:
   - Fork this repository
   - Add your script following the [structure below](#script-structure)
   - Submit a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📁 Script Structure

Each script must follow this structure:

```
scripts/
└── your-script-id/
    ├── script.js       # Required: Your render function
    ├── manifest.json   # Required: Script metadata
    ├── README.md       # Required: Usage documentation
    ├── preview.png     # Recommended: Screenshot (800x600)
    └── CHANGELOG.md    # Optional: Version history
```

### Example manifest.json

```json
{
  "id": "task-counter",
  "name": "Task Counter",
  "description": "Shows task completion progress across all notes with this tag",
  "version": "1.0.0",
  "author": {
    "name": "Your Name",
    "github": "yourusername"
  },
  "minTagverseVersion": "1.0.0",
  "labels": ["productivity", "tasks", "analytics"],
  "suggestedTag": "tasks",
  "arguments": []
}
```

### Example script.js

```javascript
async function render(context) {
    // Your magic here!
    const button = context.element.createEl('button', {
        text: `Hello from #${context.tag}!`
    });

    button.addEventListener('click', () => {
        new context.Notice('🎉 Script working!');
    });

    return button;
}
```

## 🏷️ Label System

Scripts use labels for categorization. Popular labels:

**By Function:**
- `productivity` - Task management, workflows
- `analytics` - Statistics, metrics, dashboards
- `utilities` - Tools, helpers, formatting
- `visual` - Animations, decorations, styles
- `navigation` - Links, search, discovery

**By Content:**
- `tasks` - Task-related features
- `notes` - Note management
- `tags` - Tag operations
- `links` - Link handling

**By UI:**
- `button` - Interactive buttons
- `chart` - Data visualizations
- `form` - Input elements
- `badge` - Status indicators
- `counter` - Numeric displays

Scripts can have multiple labels!

## 📊 Featured Scripts

<!-- This section will be auto-updated by GitHub Actions -->

Currently available: **0 scripts**

Check the [scripts directory](./scripts) for all available scripts!

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Submission guidelines
- Code standards
- Review process
- Versioning rules

### Quick Guidelines

✅ **Do:**
- Write clean, commented code
- Test in both light and dark themes
- Handle errors gracefully
- Use Obsidian CSS variables
- Document all arguments

❌ **Don't:**
- Use `eval()` or unsafe code
- Make network requests without consent
- Block the UI thread
- Use external dependencies

## 📜 License

This repository is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Individual scripts may have their own licenses specified in their README.

## 🙏 Acknowledgments

- Thanks to all [contributors](https://github.com/brunoleos/tagverse-community-scripts/graphs/contributors)!
- Built for the amazing [Obsidian](https://obsidian.md) community
- Powered by [Tagverse](https://github.com/brunoleos/obsidian-tagverse)

## 📞 Support

- 🐛 [Report bugs](https://github.com/brunoleos/tagverse-community-scripts/issues)
- 💡 [Request features](https://github.com/brunoleos/tagverse-community-scripts/discussions)
- 💬 [Community Discord](https://discord.gg/obsidianmd)

---

Made with ❤️ by the Tagverse community