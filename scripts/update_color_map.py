#!/usr/bin/env python3
"""
Consolidate all local SCSS colors into a root color map
Usage: python3 scripts/consolidate_colors.py
Generates: _sass/root-color-map.scss and colors.json
"""

import json
import re
from pathlib import Path
from collections import OrderedDict

class LocalColorConsolidator:
    def __init__(self):
        self.scss_dir = Path('_sass')
        self.open_coding_dir = Path('open-coding')
        self.root_color_map = Path('_sass/root-color-map.scss')
        self.json_manifest = Path('colors.json')
        self.all_colors = OrderedDict()
        
    def find_all_scss_files(self):
        """Find all .scss files in project (excluding root-color-map)"""
        scss_files = []
        
        # Search _sass directory
        if self.scss_dir.exists():
            scss_files.extend([f for f in self.scss_dir.rglob('*.scss') 
                              if f.name != 'root-color-map.scss'])
        
        # Search open-coding directory
        if self.open_coding_dir.exists():
            scss_files.extend([f for f in self.open_coding_dir.rglob('*.scss')])
        
        return sorted(scss_files)
    
    def extract_all_color_variables(self, scss_content, file_path):
        """
        Extract all SCSS color variables from content
        Returns dict of {variable_name: value}
        """
        colors = {}
        
        # Remove comments
        scss_content = re.sub(r'//.*$', '', scss_content, flags=re.MULTILINE)
        scss_content = re.sub(r'/\*.*?\*/', '', scss_content, flags=re.DOTALL)
        
        # Find all variable definitions: $var: value;
        pattern = r'\$([a-zA-Z_][a-zA-Z0-9_-]*)\s*:=?\s*([^;]+);'
        matches = re.findall(pattern, scss_content)
        
        for var_name, value in matches:
            value = value.strip()
            # Remove !default if present
            value = re.sub(r'\s*!default\s*$', '', value)
            
            # Only keep color-like values (hex, rgb, color names, hsl)
            if self.is_color_value(value):
                # Track all occurrences
                if var_name not in colors:
                    colors[var_name] = {
                        'value': value,
                        'files': [str(file_path.relative_to(Path.cwd()))]
                    }
                else:
                    # Variable defined in multiple files - keep last definition
                    colors[var_name]['value'] = value
                    colors[var_name]['files'].append(str(file_path.relative_to(Path.cwd())))
        
        return colors
    
    def is_color_value(self, value):
        """Check if value looks like a color"""
        # Hex colors
        if re.match(r'^#[0-9a-fA-F]{3,8}$', value):
            return True
        # RGB/RGBA
        if re.match(r'^rgba?\(', value):
            return True
        # HSL/HSLA
        if re.match(r'^hsla?\(', value):
            return True
        # Linear gradients
        if 'linear-gradient' in value or 'radial-gradient' in value:
            return True
        # Variable references
        if re.match(r'^\$[a-zA-Z_]', value):
            return True
        # Named colors
        color_names = ['white', 'black', 'red', 'green', 'blue', 'transparent']
        if any(name in value.lower() for name in color_names):
            return True
        return False
    
    def resolve_variable_references(self, value, all_vars, depth=0):
        """Recursively resolve variable references"""
        if depth > 10:
            return value
        
        if not '$' in value:
            return value
        
        var_refs = re.findall(r'\$([a-zA-Z_][a-zA-Z0-9_-]*)', value)
        
        for var_ref in var_refs:
            if var_ref in all_vars:
                resolved = all_vars[var_ref]['value']
                resolved = self.resolve_variable_references(resolved, all_vars, depth + 1)
                value = value.replace(f'${var_ref}', resolved)
        
        return value
    
    def consolidate_colors(self):
        """Scan all SCSS files and consolidate colors"""
        print("\nConsolidating local SCSS colors...\n")
        
        scss_files = self.find_all_scss_files()
        print(f"Found {len(scss_files)} SCSS file(s)")
        
        print(f"\nExtracting color variables:")
        
        # Extract all variables
        for scss_file in scss_files:
            try:
                content = scss_file.read_text(encoding='utf-8', errors='ignore')
                colors = self.extract_all_color_variables(content, scss_file)
                for var_name, info in colors.items():
                    if var_name not in self.all_colors:
                        self.all_colors[var_name] = info
                    else:
                        # Merge file lists
                        self.all_colors[var_name]['value'] = info['value']
                        self.all_colors[var_name]['files'].extend(info['files'])
            except Exception as e:
                print(f" Error reading {scss_file}: {e}")
        
        # Resolve variable references
        for var_name in self.all_colors:
            original_value = self.all_colors[var_name]['value']
            resolved = self.resolve_variable_references(original_value, self.all_colors)
            self.all_colors[var_name]['resolved_value'] = resolved
        
        print(f"   ✓ Found {len(self.all_colors)} unique color variable(s)\n")
        
        # Generate files
        self.write_root_color_map()
        self.write_json_manifest()
    
    def write_root_color_map(self):
        """Write the root color map SCSS"""
        output = """// AUTO-GENERATED ROOT COLOR MAP FOR LOCAL STYLING
// This file contains all color variables used across the local repository
// Generated by scripts/consolidate_colors.py
//
// EDIT THIS FILE to change colors, then run:
// python3 scripts/consolidate_colors.py (to regenerate)
// OR just edit colors here and rebuild your project

"""
        
        # Group by file for organization
        files_dict = {}
        for var_name, info in self.all_colors.items():
            for file in info['files']:
                if file not in files_dict:
                    files_dict[file] = []
                files_dict[file].append((var_name, info))
        
        # Write variables grouped by source file
        for file in sorted(files_dict.keys()):
            file_name = Path(file).name.upper()
            output += f"\n// {file_name}\n"
            output += "// " + "-" * 77 + "\n\n"
            
            for var_name, info in sorted(files_dict[file], key=lambda x: x[0]):
                output += f"${var_name}: {info['value']};\n"
        
        output += """
// =============================================================================
// CSS CUSTOM PROPERTIES
// =============================================================================

:root {
"""
        
        for var_name in sorted(self.all_colors.keys()):
            css_var = var_name.replace('_', '-')
            value = self.all_colors[var_name]['resolved_value']
            output += f"  --{css_var}: {value};\n"
        
        output += "}\n"
        
        self.root_color_map.write_text(output)
        print(f"Generated: {self.root_color_map}")
        print(f"   → Edit this file directly to change colors")
    
    def write_json_manifest(self):
        """Write JSON manifest of all colors"""
        manifest = {
            'generated_by': 'scripts/consolidate_colors.py',
            'total_colors': len(self.all_colors),
            'colors': {}
        }
        
        for var_name, info in self.all_colors.items():
            manifest['colors'][var_name] = {
                'value': info['value'],
                'resolved_value': info['resolved_value'],
                'source_files': info['files']
            }
        
        self.json_manifest.write_text(json.dumps(manifest, indent=2))
        print(f"Generated: {self.json_manifest}")

def main():
    consolidator = LocalColorConsolidator()
    consolidator.consolidate_colors()
    print(f"\nColor consolidation complete!")
    print(f"\nNext steps:")
    print(f"   1. Edit _sass/root-color-map.scss to customize colors")
    print(f"   2. Import it in your main SCSS: @import 'root-color-map';")
    print(f"   3. Rebuild your project")

if __name__ == "__main__":
    main()