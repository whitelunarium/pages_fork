---
layout: post
toc: True
breadcrumb: True
title: Change GitHub Pages Theme 
description:  
permalink: /github/pages/theme
---

## Theme Switching Guide

### Purpose

This guide explains how to switch between Jekyll themes (such as **Minima**, **TeXt**, **So Simple**, and others) in your site, while supporting custom layouts and behaviors. The approach allows students or contributors to select a theme and still benefit from local overrides and customizations.

## Theme Switching Logic

### Directory Structure

- _themes/
  - minima/
    - _config.yml
    - Gemfile
    - opencs.html
    - _layouts/
      - post.html
      - page.html
  - text/
    - _config.yml
    - Gemfile
    - opencs.html
    - _layouts/
      - post.html
      - page.html
  - ...

### Layout Overrides

- For **Minima**, custom behaviors are implemented by overriding `post.html` and `page.html` in your project’s `_layouts/` directory. These custom layouts **terminate with** `opencs.html`, a local layout that you control for further overrides.
- For other themes, the theme-specific `post.html` and `page.html` in `_themes/<theme>/_layouts/` use front matter to load the theme’s default or base layout as their terminating layout (e.g., `layout: default` or `layout: base`).

**This means:**  

- You can always override or extend layouts by editing your themes `opencs.html`.
- For themes other than Minima, the default theme layouts is being used unless you add overrides.  In minima, you can see we brought the base.html local as well as many _sass files.  

---

## How to Switch Themes

### Using the Makefile

The Makefile includes targets to copy the appropriate config, Gemfile, and layouts from `_themes/<theme>/` into the project root and `_layouts/` directory:

```bash
make use-minima
make use-text
make use-cayman
make use-so-simple
```

- All theme-specific configuration and override files are stored in the `_themes/` directory (not built by Jekyll).
- Each theme has its own set of files.  Read the Makefile to see the copy rules.

### How Layouts Are Resolved

- Jekyll will first look for layouts in your project’s _layouts/ directory.
- If not found, it will use the layout from the remote theme.
- This allows you to override any layout by placing a file of the same name locally.

### Summary

- Theme switching is managed via the Makefile and the _themes/ directory
- Layouts for posts and pages are overridden as needed, with a custom opencs.html as the local terminating layout.
- For most themes, layouts defer to the remote theme’s documentation. Remember: files are loaded locally first, then remotely.  Overrides work for _layouts,_includes, and _sass.  Try to minimze overrides to simply what is required for customizations.
- Most content uses post or page layouts for primary formatting. Exceptions include schedule.html, blogs.html, and search.html, which may use custom layouts.
