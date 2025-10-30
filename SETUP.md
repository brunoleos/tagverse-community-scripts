# Repository Setup Guide

This guide will help you initialize and configure the `tagverse-community-scripts` repository.

## 📋 Prerequisites

- Git installed
- GitHub account
- Node.js 18+ (for testing registry generation)
- GitHub CLI (optional, for easier setup)

## 🚀 Quick Setup

### Step 1: Create GitHub Repository

**Option A: Via GitHub Web Interface**

1. Go to https://github.com/new
2. Repository name: `tagverse-community-scripts`
3. Description: `Community-created scripts for the Tagverse Obsidian plugin`
4. Visibility: **Public**
5. Do NOT initialize with README (we already have one)
6. Click **Create repository**

**Option B: Via GitHub CLI**

```bash
gh repo create tagverse-community-scripts --public --description "Community-created scripts for the Tagverse Obsidian plugin"
```

### Step 2: Initialize Local Repository

```bash
cd tagverse-community-scripts

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Community scripts repository setup

- Add README, CONTRIBUTING, and LICENSE
- Set up GitHub Actions workflows
- Add PR and issue templates
- Include registry generation tool
- Add example script: task-counter"

# Set main as default branch
git branch -M main

# Add remote (replace with your username if forking)
git remote add origin https://github.com/brunoleos/tagverse-community-scripts.git

# Push to GitHub
git push -u origin main
```

### Step 3: Configure GitHub Repository Settings

1. Go to **Settings** → **Actions** → **General**
   - Enable **Read and write permissions** for workflows
   - Check **Allow GitHub Actions to create and approve pull requests**

2. Go to **Settings** → **Branches**
   - Add branch protection rule for `main`:
     - ✅ Require a pull request before merging
     - ✅ Require status checks to pass: `validate`
     - ✅ Require branches to be up to date
     - Optional: Require approvals (1)

3. Go to **Settings** → **General**
   - Enable **Issues**
   - Enable **Discussions** (optional but recommended)
   - Disable **Wikis** (documentation is in repo)
   - Disable **Projects** (unless you want to use them)

### Step 4: Test Registry Generation

```bash
# Install Node.js if not already installed
# Then test the registry generator:

node tools/generate-registry.js
```

Expected output:
```
Generating registry.json...

✅ Added task-counter to registry

✅ Registry generated successfully!
   Total scripts: 1
   Featured: 1
   Output: /path/to/registry.json

📊 Scripts by label:
   productivity: 1
   tasks: 1
   analytics: 1
   progress: 1
```

### Step 5: Verify GitHub Actions

1. Go to **Actions** tab in your repository
2. You should see two workflows:
   - **Validate Script Submission**
   - **Update Registry**

3. The registry should auto-update when you pushed (check for a commit from `github-actions[bot]`)

## 🧪 Testing the Workflow

### Test PR Validation

1. Create a test branch:
   ```bash
   git checkout -b test-validation
   ```

2. Create a dummy script:
   ```bash
   mkdir -p scripts/test-script
   echo 'async function render(context) { return "test"; }' > scripts/test-script/script.js
   echo '{"id":"test-script","name":"Test","description":"Test script","version":"1.0.0","author":{"name":"Test","github":"test"},"minTagverseVersion":"1.0.0","labels":["utilities"],"suggestedTag":"test"}' > scripts/test-script/manifest.json
   echo '# Test Script' > scripts/test-script/README.md
   ```

3. Commit and push:
   ```bash
   git add scripts/test-script
   git commit -m "test: Add test script for validation"
   git push origin test-validation
   ```

4. Create a PR on GitHub
5. Watch the validation workflow run
6. If successful, you'll see a ✅ comment from GitHub Actions

7. Clean up:
   ```bash
   git checkout main
   git branch -D test-validation
   ```

## 📝 Adding Your First Real Script

### From the Main Plugin Repository

If you want to port more scripts from the main repo:

1. Copy the script file:
   ```bash
   mkdir -p scripts/your-script-id
   cp ../obsidian-tagverse/examples/basic/example.js scripts/your-script-id/script.js
   ```

2. Create manifest.json:
   ```json
   {
     "id": "your-script-id",
     "name": "Your Script Name",
     "description": "Brief description",
     "version": "1.0.0",
     "author": {
       "name": "Your Name",
       "github": "yourusername"
     },
     "minTagverseVersion": "1.0.0",
     "labels": ["productivity", "utilities"],
     "suggestedTag": "yourscript",
     "arguments": []
   }
   ```

3. Create README.md following the template in task-counter

4. Commit and push:
   ```bash
   git add scripts/your-script-id
   git commit -m "Add: Your Script Name"
   git push
   ```

5. Registry will auto-update via GitHub Action

## 🎨 Customization

### Update Repository URLs

If you've forked or want to use a different organization:

1. Update URLs in `tools/generate-registry.js`:
   ```javascript
   const BASE_URL = 'https://raw.githubusercontent.com/YOUR-USERNAME/tagverse-community-scripts/main';
   ```

2. Update URLs in `README.md` and `CONTRIBUTING.md`

3. Update the registry URL in the main plugin's code:
   - File: `obsidian-tagverse/src/types/interfaces.ts`
   - Line: `communityRegistryUrl` default value

### Add More Scripts

You can batch-add scripts from the examples folder:

```bash
# From the main plugin directory
for script in examples/basic/*.js; do
  name=$(basename "$script" .js | sed 's/tagverse-ex-//')
  mkdir -p "../tagverse-community-scripts/scripts/$name"
  cp "$script" "../tagverse-community-scripts/scripts/$name/script.js"
  # Then manually create manifest.json and README.md for each
done
```

## 🔧 Troubleshooting

### Registry Not Updating

1. Check GitHub Actions logs
2. Ensure workflow has write permissions
3. Manually trigger: Go to Actions → Update Registry → Run workflow

### Validation Failing

1. Check the validation logs in the PR
2. Common issues:
   - Missing required files
   - Invalid JSON in manifest
   - Script ID doesn't match folder name
   - Missing `render()` function

### Permission Errors

1. Check repository settings → Actions → Permissions
2. Ensure "Read and write" is enabled
3. Check branch protection rules aren't blocking bot commits

## 📚 Next Steps

After setup:

1. **Announce the Repository**
   - Create a discussion post
   - Share on Obsidian Discord
   - Update main plugin README

2. **Seed with Scripts**
   - Port 10-15 quality scripts from examples
   - Ensure variety across categories
   - Add good READMEs with screenshots

3. **Promote Community Contributions**
   - Pin an issue inviting contributions
   - Feature "good first issue" scripts
   - Highlight top contributors

4. **Monitor and Maintain**
   - Review PRs within 1-3 days
   - Respond to issues promptly
   - Keep documentation updated

## 🆘 Getting Help

- **Repository Issues**: For bugs in scripts
- **Main Plugin Issues**: For Tagverse plugin bugs
- **Discussions**: For questions and ideas

## 🎉 You're All Set!

Your community scripts repository is ready to accept contributions!

Happy scripting! 🚀