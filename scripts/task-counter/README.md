# Task Counter

Track task completion progress across all notes tagged with a specific tag. Shows a visual progress bar and completion statistics.

## Usage

```markdown
#tasks
```

This will display a progress bar showing how many tasks are completed across all notes with the `#tasks` tag.

## Features

- 📊 Visual progress bar with percentage
- ✅ Completed/Total task count
- 🎯 Remaining tasks indicator
- 🎨 Color changes when 100% complete (green)
- ⚡ Works with any tag name
- 🌓 Supports light and dark themes

## How It Works

1. Finds all notes with the specified tag
2. Scans each note for tasks (`- [ ]` and `- [x]`)
3. Calculates completion percentage
4. Displays an inline progress indicator

## Task Format

The script recognizes standard Markdown tasks:

```markdown
- [ ] Incomplete task
- [x] Completed task
- [X] Completed task (uppercase also works)
```

## Example Output

For a vault with 45 tasks across multiple notes, where 30 are complete:

```
#tasks ████████████░░░░░░░░ 30/45 15 left
```

When all tasks are complete:

```
#tasks ████████████████████ 45/45 ✓ Complete
```

## Requirements

- Tagverse v1.0.0 or later
- Works in Reading and Live Preview modes

## Tips

- Use different tags for different projects: `#work-tasks`, `#personal-tasks`
- Great for project dashboards
- Combine with frontmatter for more detailed tracking

## Performance

- Efficient for vaults with hundreds of notes
- Caches metadata for fast lookups
- No external dependencies

## Author

Created by [brunoleos](https://github.com/brunoleos)

## License

MIT License

## Changelog

### 1.0.0 (2025-10-30)
- Initial release
- Basic task counting and progress display
- Theme-aware styling