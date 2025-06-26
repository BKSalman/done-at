# Done at

Automatically adds completion timestamps to tasks when checked off, and removes them when unchecked. Perfect for tracking when you completed daily habits, work tasks, or any activities.

## Features

- **Automatic timestamp tracking** - No manual intervention required
- **Tag-based filtering** - Only tracks tasks with your specified tag (default: `#task`)
- **Dynamic timestamps** - Adds timestamp when checked, removes when unchecked
- **Customizable formatting** - Configure time format, date format, and whether to include dates

## How it works

Add your configured tag (default `#task`) to any checkbox:

**When you check a task:**
```markdown
- [ ] Brush teeth #task
```
Becomes:
```markdown
- [x] Brush teeth #task ✅ 2024-06-26 08:15
```

**When you uncheck a task:**
```markdown
- [x] Exercise #task ✅ 2024-06-26 18:30
```
Becomes:
```markdown
- [ ] Exercise #task
```

## Settings

Configure in Settings > Plugin Options > Done at:

- **Task tag**: Which tag identifies trackable tasks (default: `#task`)
- **Include date**: Show date + time or just time (default: enabled)
- **Time format**: `HH:mm` (24-hour) or `hh:mm A` (12-hour)
- **Date format**: `YYYY-MM-DD`, `MM/DD/YYYY`, `DD/MM/YYYY`, etc.

## Examples

### Daily Habits
```markdown
- [x] Brush teeth #task ✅ 08:15
- [x] Exercise #task ✅ 08:45
- [ ] Meditate #task
```

### Work Tasks
```markdown
- [x] Review PR #task ✅ 2024-06-26 10:30
- [x] Update docs #task ✅ 2024-06-26 14:15
- [ ] Deploy to staging #task
```

## Installation

1. Open Obsidian Settings > Community Plugins
2. Disable Safe Mode
3. Browse and search for "Done at"
4. Install and enable
