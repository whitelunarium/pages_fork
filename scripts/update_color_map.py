#!/usr/bin/env python3
"""
Update root-color-map.scss based on active theme
Usage: python3 scripts/update_color_map.py <theme-name>
Example: python3 scripts/update_color_map.py minima
"""

import sys
import json
import re
import requests
from pathlib import Path

class ColorMapUpdater:
    def __init__(self, config_path='scripts/theme_colors.json'):
        with open(config_path) as f:
            self.themes = json.load(f)
        
        self.map_file = Path('_sass/root-color-map.scss')
        self.fallback_colors = {
            'std-primary': '#2a7ae2',
            'std-secondary': '#828282',
            'std-bg-primary': '#fdfdfd',
            'std-bg-secondary': '#f0f0f0',
            'std-text-primary': '#111',
            'std-text-secondary': '#828282',
            'std-text-muted': '#999',
            'std-border': '#e8e8e8',
            'std-link': '#2a7ae2',
            'std-link-hover': '#1756a9',
            'std-success': '#2a7ae2',
            'std-warning': '#828282',
            'std-error': '#d33682'
        }
    
    def fetch_scss_content(self, repo, branch, file_path, commit=None):
        """Fetch SCSS file from GitHub"""
        # Use commit if specified, otherwise use branch
        ref = commit if commit else branch
        url = f"https://raw.githubusercontent.com/{repo}/{ref}/{file_path}"
        print(f"  Fetching: {file_path}")
        
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                return response.text
            else:
                print(f"  ⚠ Warning: Could not fetch {file_path} (HTTP {response.status_code})")
                return ""
        except Exception as e:
            print(f"  ⚠ Warning: Error fetching {file_path}: {e}")
            return ""
    
    def extract_variable_value(self, scss_content, variable_name):
        """
        Extract the value of an SCSS variable
        Handles: $var: value; and $var: value !default;
        """
        # Remove comments first
        scss_content = re.sub(r'//.*$', '', scss_content, flags=re.MULTILINE)
        scss_content = re.sub(r'/\*.*?\*/', '', scss_content, flags=re.DOTALL)
        
        # Match variable definition (handle both : and :=)
        pattern = rf'{re.escape(variable_name)}\s*:=?\s*([^;]+);'
        matches = re.findall(pattern, scss_content)
        
        if matches:
            # Return the last definition (in case of multiple)
            value = matches[-1].strip()
            # Remove !default if present
            value = re.sub(r'\s*!default\s*$', '', value)
            return value
        
        return None
    
    def resolve_variable_references(self, value, scss_content, depth=0):
        """
        If value contains a variable reference (e.g., $other-var),
        recursively resolve it (with depth limit to prevent infinite loops)
        """
        if depth > 10:  # Prevent infinite recursion
            return value
            
        if not value or not '$' in value:
            return value
        
        # Extract all variable references
        var_refs = re.findall(r'\$[\w-]+', value)
        
        for var_ref in var_refs:
            resolved = self.extract_variable_value(scss_content, var_ref)
            if resolved and resolved != var_ref:
                # Recursively resolve
                resolved = self.resolve_variable_references(resolved, scss_content, depth + 1)
                value = value.replace(var_ref, resolved)
        
        return value
    
    def update_map(self, theme_name):
        """Update the root color map for the specified theme"""
        if theme_name not in self.themes:
            print(f"❌ Error: Theme '{theme_name}' not found in configuration")
            print(f"Available themes: {', '.join(self.themes.keys())}")
            sys.exit(1)
        
        theme = self.themes[theme_name]
        print(f"\n🎨 Updating color map for theme: {theme_name}")
        print(f"Repository: {theme['repo']}")
        
        # Fetch all SCSS content
        all_scss = ""
        for file_path in theme['files']:
            content = self.fetch_scss_content(
                theme['repo'], 
                theme['branch'], 
                file_path,
                theme.get('commit')
            )
            all_scss += content + "\n"
        
        if not all_scss.strip():
            print(f"⚠ Warning: No SCSS content fetched. Using fallback colors.")
        
        # Extract color values
        extracted_colors = {}
        print(f"\n📝 Extracting colors:")
        
        for std_name, theme_var in theme['mappings'].items():
            value = self.extract_variable_value(all_scss, theme_var)
            
            if value:
                # Resolve variable references
                resolved_value = self.resolve_variable_references(value, all_scss)
                extracted_colors[std_name] = resolved_value
                print(f"  ✓ {std_name}: {resolved_value} (from {theme_var})")
            else:
                # Use fallback
                fallback = self.fallback_colors.get(std_name, '#000000')
                extracted_colors[std_name] = fallback
                print(f"  ⚠ {std_name}: using fallback {fallback} (couldn't find {theme_var})")
        
        # Fill in any missing standard colors with fallbacks
        for std_name in self.fallback_colors:
            if std_name not in extracted_colors:
                extracted_colors[std_name] = self.fallback_colors[std_name]
                print(f"  + {std_name}: {self.fallback_colors[std_name]} (fallback)")
        
        # Generate the new SCSS file
        self.write_map_file(theme_name, extracted_colors)
    
    def write_map_file(self, theme_name, colors):
        """Write the updated root-color-map.scss file"""
        output = f"""// AUTO-GENERATED - Do not edit manually
// Theme: {theme_name}
// Updated by scripts/update_color_map.py

// Standard color variables
"""
        
        # Write variable definitions
        for var_name in sorted(colors.keys()):
            output += f"${var_name}: {colors[var_name]};\n"
        
        output += """
// Convert to CSS custom properties
:root {
"""
        
        # Write CSS custom properties
        for var_name in sorted(colors.keys()):
            css_var = var_name.replace('std-', 'color-')
            output += f"  --{css_var}: #{{{colors[var_name]}}};\n"
        
        output += "}\n"
        
        # Write the file
        self.map_file.parent.mkdir(parents=True, exist_ok=True)
        self.map_file.write_text(output)
        print(f"\n✅ Successfully updated: {self.map_file}")
        print(f"   Theme colors from {theme_name} are now active!")

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 scripts/update_color_map.py <theme-name>")
        print("Example: python3 scripts/update_color_map.py minima")
        sys.exit(1)
    
    theme_name = sys.argv[1]
    updater = ColorMapUpdater()
    updater.update_map(theme_name)

if __name__ == "__main__":
    main()