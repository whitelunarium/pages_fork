#!/usr/bin/env python3
"""
Update root-color-map.scss based on local SCSS files
Usage: python3 scripts/update_color_map.py
Scans all local SCSS and consolidates colors
"""

import json
import re
from pathlib import Path
from collections import OrderedDict

class ColorMapUpdater:
    def __init__(self):
        self.scss_dir = Path('_sass')
        self.open_coding_dir = Path('open-coding')
        self.map_file = Path('_sass/root-color-map.scss')
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
    
    def extract_all_color_variables(self, scss_content, file_path):
        """Extract all SCSS color variables from content"""
        colors = {}
        
        # Remove comments
        scss_content = re.sub(r'//.*$', '', scss_content, flags=re.MULTILINE)
        scss_content = re.sub(r'/\*.*?\*/', '', scss_content, flags=re.DOTALL)
        
        # Find all variable definitions: $var: value;
        pattern = r'\$([a-zA-Z_][a-zA-Z0-9_-]*)\s*:=?\s*([^;]+);'
        matches = re.findall(pattern, scss_content)
        
        # Get relative path safely
        try:
            rel_path = str(file_path.relative_to(Path.cwd()))
        except ValueError:
            rel_path = str(file_path)
        
        for var_name, value in matches:
            value = value.strip()
            # Remove !default if present
            value = re.sub(r'\s*!default\s*$', '', value)
            
            # Only keep color-like values
            if self.is_color_value(value):
                if var_name not in colors:
                    colors[var_name] = {
                        'value': value,
                        'files': [rel_path]
                    }
                else:
                    colors[var_name]['value'] = value
                    colors[var_name]['files'].append(rel_path)
        
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
    
    def resolve_variable_references(self, value, scss_content, depth=0):
        """
        If value contains a variable reference (e.g., $other-var),
        recursively resolve it (with depth limit to prevent infinite loops)
        """
        if depth > 10:  # Prevent infinite recursion
            return value
            
        if not value or '$' not in value:
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
    
    def sanitize_variable_name(self, name):
        """
        Convert a variable name to a valid SCSS identifier.
        Removes or replaces invalid characters.
        """
        # Replace spaces and special characters with hyphens
        name = re.sub(r'[\s/\\()]+', '-', name)
        # Remove any remaining invalid characters (keep only alphanumeric, hyphens, underscores)
        name = re.sub(r'[^a-zA-Z0-9_-]', '', name)
        # Remove leading numbers and hyphens
        name = re.sub(r'^[0-9-]+', '', name)
        return name if name else 'color'
    
    def update_map(self):
        """Scan local SCSS and update the root color map"""
        print(f"\nUpdating color map from local SCSS files\n")
        
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
                print(f"   ⚠️  Error reading {scss_file}: {e}")
        
        print(f"   ✓ Found {len(self.all_colors)} unique color variable(s)\n")
        
        # Generate files
        self.write_map_file()
        self.write_json_manifest()
    
    def write_map_file(self):
        """Write the updated root-color-map.scss file"""
        output = """// AUTO-GENERATED ROOT COLOR MAP FOR LOCAL STYLING
// This file contains all color variables used across the local repository
// Generated by scripts/update_color_map.py
//
// DO NOT EDIT MANUALLY - Run the script to regenerate

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
                sanitized = self.sanitize_variable_name(var_name)
                output += f"${sanitized}: {info['value']};\n"
        
        output += """
// =============================================================================
// CSS CUSTOM PROPERTIES
// =============================================================================

:root {
"""
        
        for var_name in sorted(self.all_colors.keys()):
            sanitized = self.sanitize_variable_name(var_name)
            css_var = sanitized.replace('_', '-')
            value = self.all_colors[var_name]['value']
            output += f"  --{css_var}: {value};\n"
        
        output += "}\n"
        
        self.map_file.parent.mkdir(parents=True, exist_ok=True)
        self.map_file.write_text(output)
        print(f"Successfully updated: {self.map_file}")
    
    def write_json_manifest(self):
        """Write JSON manifest of all colors"""
        manifest = {
            'generated_by': 'scripts/update_color_map.py',
            'total_colors': len(self.all_colors),
            'colors': {}
        }
        
        for var_name, info in self.all_colors.items():
            manifest['colors'][var_name] = {
                'value': info['value'],
                'source_files': info['files']
            }
        
        self.json_manifest.write_text(json.dumps(manifest, indent=2))
        print(f"Successfully updated: {self.json_manifest}")

def main():
    updater = ColorMapUpdater()
    updater.update_map()
    print(f"\n🎉 Color map updated!")

if __name__ == "__main__":
    main()