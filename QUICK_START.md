# Quick Start - 5 Minutes to Launch

## 🚀 Deploy in 5 Commands

```bash
cd tagverse-community-scripts
git init
git add .
git commit -m "Initial commit: Community scripts repository"
git branch -M main
git remote add origin https://github.com/brunoleos/tagverse-community-scripts.git
git push -u origin main
```

## ⚙️ Configure GitHub (2 minutes)

1. **Settings → Actions → General**
   - Enable: "Read and write permissions"
   - Enable: "Allow GitHub Actions to create PRs"

2. **Settings → Branches**
   - Add rule for `main`
   - Require PR + status checks

## ✅ Verify (1 minute)

```bash
# Check Actions tab - should see registry update
# registry.json should have github-actions[bot] commit
```

## 📝 Test Installation (in main plugin)

1. Build main plugin:
   ```bash
   cd ../obsidian-tagverse
   npm run build
   ```

2. Open Obsidian with plugin loaded

3. Go to Settings → Tagverse → Community Scripts

4. Should see "Task Counter" script available!

## 🎯 Next Actions

**Add More Scripts:**
```bash
# Copy from examples folder
mkdir scripts/script-name
# Create manifest.json, script.js, README.md
git add scripts/script-name
git commit -m "Add: Script Name"
git push
```

**Registry auto-updates via GitHub Action!**

---

That's it! 🎉