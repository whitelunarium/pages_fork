# Theme Switching Guide

## Problem Solved

This guide explains how to switch between Minima and TeXt themes in your Jekyll site. The issue you were experiencing was that the TeXt theme was looking for local SASS files (specifically in the `skins/` directory) that weren't present in your local `_sass` folder.

## Solution Implemented

1. **Created Missing SASS Structure**: Added the required `skins/` directory structure that TeXt theme expects:
   ```
   _sass/
   ├── skins/
   │   ├── _dark.scss          # Dark theme variables
   │   ├── _default.scss       # Default theme variables
   │   └── highlight/
   │       └── _tomorrow-night.scss  # Code highlighting theme
   ├── skins.scss              # Main skins import file
   └── skins/
       └── highlight.scss      # Highlight theme import file
   ```

2. **Added Theme Variables**: Created all the necessary SASS variables that the TeXt theme requires.

3. **Simplified Configuration Management**: 
   - Maintained separate configuration files: `_config.minima.yml` and `_config.text.yml`
   - Updated the theme switching script to simply copy the appropriate config file to `_config.yml`
   - This eliminates duplication and complex `sed` operations

4. **Updated Makefile**: Modified the main Makefile to include theme switching functionality.

## How to Use

### Interactive Theme Switching
```bash
make switch-theme
```
This will show you a menu to select between themes.

### Direct Theme Switching
```bash
# Switch to Minima theme
./scripts/switch-theme.sh minima
make clean && make

# Switch to TeXt theme  
./scripts/switch-theme.sh text
make clean && make
```

### Using Makefile Commands
```bash
# Serve with Minima theme
make serve-minima

# Serve with TeXt theme
make serve-text

# Build with specific theme
make build-minima
make build-text
```

## Theme Features

### Minima Theme
- Clean, minimal design
- Dark mode support  
- Fast loading
- Multiple sub-themes (dracula, leaf, hacker)
- Mobile responsive

### TeXt Theme
- Modern iOS 11-inspired design
- 6 built-in skins
- Advanced search functionality
- MathJax & Mermaid diagram support
- Table of contents
- Internationalization

## Files Modified/Created

- `_sass/skins/` - Directory containing theme skin files
- `_sass/skins/_dark.scss` - Dark theme variables for TeXt
- `_sass/skins/_default.scss` - Default theme variables for TeXt
- `_sass/skins/highlight/_tomorrow-night.scss` - Code highlighting theme
- `_sass/skins.scss` - Main skins import file
- `_sass/skins/highlight.scss` - Highlight import file
- `Makefile` - Updated to include theme switching
- `scripts/switch-theme.sh` - Simplified theme switching script (now uses file copying)
- `Makefile.themes` - Theme-specific make targets
- `_config.minima.yml` - Minima theme configuration
- `_config.text.yml` - TeXt theme configuration

## Troubleshooting

If you encounter issues:

1. **Missing SASS variables**: Add them to the appropriate skin file in `_sass/skins/`
2. **Build errors**: Run `make clean && make` to rebuild from scratch
3. **Theme not switching**: Check that `_config.yml` has been updated by the script

## Configuration

Your `_config.yml` will be automatically updated when switching themes:

**Minima Theme:**
```yaml
remote_theme: jekyll/minima
minima:
  skin: dark
  social_links: [...]
```

**TeXt Theme:**
```yaml
remote_theme: kitian616/jekyll-TeXt-theme
text_theme:
  type: website
  skin: dark
  highlight_theme: tomorrow-night
  lang: en
```

## Backup

The theme switching script automatically creates backups:
- `_config.backup.yml` - Backup of your previous configuration

This ensures you can always revert changes if needed.
