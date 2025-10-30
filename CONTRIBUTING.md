# Contributing to Tagverse Community Scripts

Thank you for your interest in contributing! This guide will help you submit high-quality scripts to the community.

## 📋 Table of Contents

- [Submission Methods](#submission-methods)
- [Script Requirements](#script-requirements)
- [Coding Standards](#coding-standards)
- [Review Process](#review-process)
- [Versioning](#versioning)
- [Getting Help](#getting-help)

## 🚀 Submission Methods

### Method 1: Via Obsidian Plugin (Recommended)

The easiest way to submit your script:

1. Open Obsidian with Tagverse installed
2. Go to **Settings → Tagverse → Submit Script**
3. Select your `.js` file from your vault
4. Fill in the metadata form:
   - Script name
   - Description
   - Labels (comma-separated)
   - Suggested tag name
   - Your name and GitHub username
5. Click **Generate Submission**
6. Files and instructions are copied to clipboard
7. GitHub PR page opens automatically
8. Fork the repository, add your files, and submit PR

### Method 2: Manual GitHub PR

For more control or if you prefer manual workflow:

1. **Fork** this repository
2. **Clone** your fork locally
3. **Create a branch**: `git checkout -b add-my-script`
4. **Add your script** following the [structure below](#script-structure)
5. **Commit**: `git commit -m "Add: My Amazing Script"`
6. **Push**: `git push origin add-my-script`
7. **Create Pull Request** from your fork

## 📁 Script Requirements

### Required Files

Every script submission must include:

```
scripts/your-script-id/
├── script.js       # Your render function
├── manifest.json   # Metadata
└── README.md       # Documentation
```

### Optional But Recommended

```
├── preview.png     # Screenshot (800x600px)
├── CHANGELOG.md    # Version history
└── examples/       # Usage examples
```

### Script Structure

#### 1. script.js

Must contain a `render()` function:

```javascript
/**
 * @param {Object} context - Rendering context
 * @param {App} context.app - Obsidian App instance
 * @param {string} context.tag - Tag name (without #)
 * @param {Object} context.args - Arguments from {key: value}
 * @param {HTMLElement} context.element - Container element
 * @param {string} context.sourcePath - Current note path
 * @param {Object} context.frontmatter - Note's frontmatter
 * @param {Notice} context.Notice - Notice constructor
 * @returns {HTMLElement|string|null} - Rendered content
 */
async function render(context) {
    // Your implementation here
}
```

#### 2. manifest.json

```json
{
  "id": "my-script",
  "name": "My Script",
  "description": "Brief description (max 150 chars)",
  "version": "1.0.0",
  "author": {
    "name": "Your Name",
    "github": "yourusername",
    "url": "https://yoursite.com"
  },
  "minTagverseVersion": "1.0.0",
  "labels": ["productivity", "utilities"],
  "suggestedTag": "myscript",
  "arguments": [
    {
      "name": "style",
      "type": "string",
      "description": "Display style: 'compact' or 'detailed'",
      "default": "detailed",
      "required": false
    }
  ]
}
```

**Field Requirements:**
- `id`: Lowercase, alphanumeric, hyphens only (must match folder name)
- `name`: Display name (max 50 chars)
- `description`: Brief description (max 150 chars)
- `version`: Semantic versioning (e.g., "1.0.0")
- `author.github`: Your GitHub username (required)
- `labels`: Array of 1-5 relevant labels
- `suggestedTag`: Recommended tag name (no #, lowercase)

#### 3. README.md

```markdown
# Script Name

Brief description of what your script does.

## Usage

\`\`\`markdown
#yourtag
\`\`\`

Or with arguments:

\`\`\`markdown
#yourtag{style: "compact", color: "blue"}
\`\`\`

## Arguments

- **style** (string): Display style - "compact" or "detailed"
  - Default: "detailed"
  - Required: No

## Examples

### Basic Usage

\`\`\`markdown
#yourtag
\`\`\`

Shows default view...

### With Arguments

\`\`\`markdown
#yourtag{style: "compact"}
\`\`\`

Shows compact view...

## Requirements

- Tagverse v1.0.0 or later
- Works in Reading and Live Preview modes

## Author

Created by [Your Name](https://github.com/yourusername)

## License

MIT License
```

## 💻 Coding Standards

### ✅ Do's

1. **Clean Code**
   ```javascript
   // Good: Clear variable names
   const completedTasks = tasks.filter(t => t.completed);

   // Bad: Cryptic names
   const ct = tasks.filter(t => t.c);
   ```

2. **Error Handling**
   ```javascript
   try {
       const file = context.app.vault.getAbstractFileByPath(path);
       if (!file) {
           return context.element.createDiv({ text: 'File not found' });
       }
       // ... process file
   } catch (error) {
       console.error('Script error:', error);
       return context.element.createDiv({
           text: 'Error: ' + error.message,
           cls: 'tagverse-error'
       });
   }
   ```

3. **Async Operations**
   ```javascript
   async function render(context) {
       // Use async/await for vault operations
       const content = await context.app.vault.read(file);
       return processContent(content);
   }
   ```

4. **Themeing**
   ```javascript
   // Use CSS variables for colors
   const element = context.element.createDiv();
   element.style.cssText = `
       background: var(--background-secondary);
       color: var(--text-normal);
       border: 1px solid var(--background-modifier-border);
   `;
   ```

5. **Comments**
   ```javascript
   // Document complex logic
   // Calculate completion percentage across all tagged notes
   const percentage = Math.round((completed / total) * 100);
   ```

### ❌ Don'ts

1. **No `eval()` or `Function()` constructor**
   ```javascript
   // Bad - NEVER DO THIS
   eval(userInput);
   new Function(userCode)();
   ```

2. **No Blocking Operations**
   ```javascript
   // Bad: Blocks UI
   for (let i = 0; i < 1000000; i++) { /* heavy work */ }

   // Good: Use async or chunk work
   async function processLargeDataset() {
       // Process in batches
   }
   ```

3. **No Unsafe Network Requests**
   ```javascript
   // Bad: Without user consent
   fetch('https://api.example.com/track');

   // Good: If needed, ask user permission first
   // and document in manifest/README
   ```

4. **No External Dependencies**
   ```javascript
   // Bad: Can't use npm packages
   import lodash from 'lodash';

   // Good: Use vanilla JavaScript
   const uniqueItems = [...new Set(items)];
   ```

5. **No Hardcoded Colors**
   ```javascript
   // Bad
   element.style.background = '#ffffff';

   // Good
   element.style.background = 'var(--background-primary)';
   ```

### Testing Checklist

Before submitting, test your script:

- [ ] Works in Reading mode
- [ ] Works in Live Preview mode
- [ ] Works in Light theme
- [ ] Works in Dark theme
- [ ] Handles missing data gracefully
- [ ] No console errors
- [ ] Works with arguments (if applicable)
- [ ] Works without arguments (if applicable)
- [ ] Performance: Renders in < 100ms for typical cases
- [ ] Mobile-friendly (if applicable)

## 🔍 Review Process

### 1. Automated Checks

When you submit a PR, GitHub Actions will automatically:

- ✅ Validate `manifest.json` format
- ✅ Check required files exist
- ✅ Lint JavaScript code
- ✅ Verify no obvious security issues
- ✅ Check script ID uniqueness

### 2. Manual Review

A maintainer will review:

- Code quality and readability
- Security (no malicious code)
- Functionality (does it work as described?)
- User experience
- Documentation completeness

### 3. Approval & Merge

- **Typical review time**: 1-3 days
- You may be asked for changes
- Once approved, script is merged to `main`
- Registry is auto-updated within 24 hours
- Your script becomes available to all users!

### 4. After Merge

- Your script appears in Community Scripts tab
- Users can install with one click
- You get contributor credit
- Can submit updates anytime

## 📈 Versioning

Follow [Semantic Versioning](https://semver.org/):

- `MAJOR.MINOR.PATCH` (e.g., `1.0.0`)

**When to bump:**

- **MAJOR** (`2.0.0`): Breaking changes
  - Changed arguments that break existing usage
  - Removed features
  - Incompatible behavior changes

- **MINOR** (`1.1.0`): New features (backwards-compatible)
  - Added new optional arguments
  - New rendering modes
  - Performance improvements

- **PATCH** (`1.0.1`): Bug fixes
  - Fixed errors
  - Corrected behavior
  - Documentation updates

### Updating Your Script

1. Increment version in `manifest.json`
2. Add entry to `CHANGELOG.md`
3. Update `README.md` if needed
4. Submit PR with clear description of changes

## 🏷️ Label Guidelines

Choose 1-5 relevant labels from these categories:

**By Function:**
- `productivity` - Task management, workflows, GTD
- `analytics` - Statistics, metrics, dashboards
- `utilities` - Tools, helpers, formatting
- `visual` - Animations, decorations, styles
- `navigation` - Links, search, discovery
- `data` - Queries, filters, transformations

**By Content:**
- `tasks` - Task-related features
- `notes` - Note management
- `tags` - Tag operations
- `links` - Link handling
- `frontmatter` - Metadata operations
- `calendar` - Date/time features

**By UI:**
- `button` - Interactive buttons
- `chart` - Data visualizations
- `form` - Input elements
- `badge` - Status indicators
- `counter` - Numeric displays
- `progress` - Progress bars/rings

**Special:**
- `featured` - (Assigned by maintainers only)
- `beginner` - Great for learning
- `advanced` - Complex implementations

## 🆘 Getting Help

### Before Submitting

- Read this guide thoroughly
- Check [existing scripts](./scripts) for examples
- Review [closed PRs](https://github.com/brunoleos/tagverse-community-scripts/pulls?q=is%3Apr+is%3Aclosed) for patterns

### Questions?

- 💬 [Discussions](https://github.com/brunoleos/tagverse-community-scripts/discussions) - Ask questions
- 🐛 [Issues](https://github.com/brunoleos/tagverse-community-scripts/issues) - Report problems
- 📧 Contact: [Plugin Repository](https://github.com/brunoleos/obsidian-tagverse/issues)

## 🎉 Recognition

Contributors get:
- Credit in script metadata
- Mention in repository README
- Contributor badge on GitHub
- Eternal gratitude from the community! 🙏

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers learn
- Report abusive behavior

## 🙏 Thank You!

Your contributions make Tagverse better for everyone. We appreciate your time and creativity!

---

Happy coding! 🚀