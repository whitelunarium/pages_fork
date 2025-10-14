#!/usr/bin/env python3
"""
DOCX to Markdown Converter for Jekyll
Converts Word documents to Jekyll-compatible markdown with image extraction
"""

import os
import sys
import shutil
import zipfile
import datetime
from pathlib import Path
import xml.etree.ElementTree as ET
from urllib.parse import unquote
import re

try:
    import mammoth
    from PIL import Image
except ImportError:
    print("❌ Required packages not found.")
    print("📦 Please install dependencies:")
    print("   pip install mammoth pillow python-docx")
    print("   or run: pip install -r requirements.txt")
    sys.exit(1)

class DocxConverter:
    def __init__(self):
        self.base_dir = Path.cwd()
        self.docx_dir = self.base_dir / "_docx"
        self.posts_dir = self.base_dir / "_posts"
        self.images_dir = self.base_dir / "images" / "docx"
        
        # Create directories if they don't exist
        self.posts_dir.mkdir(exist_ok=True)
        self.images_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"📁 DOCX Source: {self.docx_dir}")
        print(f"📝 Posts Output: {self.posts_dir}")
        print(f"🖼️ Images Output: {self.images_dir}")

    def extract_images_from_docx(self, docx_path, doc_name):
        """Extract images from DOCX file"""
        images_found = []
        
        try:
            with zipfile.ZipFile(docx_path, 'r') as zip_ref:
                # List all files in the DOCX
                for file_info in zip_ref.filelist:
                    # Check for images in media directory (both word/media/ and media/)
                    if (file_info.filename.startswith('word/media/') or 
                        file_info.filename.startswith('media/')):
                        
                        # Skip directories
                        if file_info.filename.endswith('/'):
                            continue
                            
                        # Extract image
                        image_data = zip_ref.read(file_info.filename)
                        
                        # Get file extension
                        original_name = Path(file_info.filename).name
                        ext = Path(original_name).suffix.lower()
                        
                        # Verify it's actually an image file
                        image_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.tif', '.webp'}
                        if ext not in image_extensions:
                            print(f"  ⏭️ Skipping non-image file: {original_name}")
                            continue
                        
                        # Create new filename with document prefix
                        image_name = f"{doc_name}_{original_name}"
                        image_path = self.images_dir / image_name
                        
                        # Write image file
                        with open(image_path, 'wb') as img_file:
                            img_file.write(image_data)
                        
                        # Verify the image was written correctly
                        if image_path.exists() and image_path.stat().st_size > 0:
                            images_found.append({
                                'original': original_name,
                                'new_name': image_name,
                                'path': image_path,
                                'relative_path': f"/images/docx/{image_name}",
                                'size': len(image_data)
                            })
                            
                            print(f"  📷 Extracted: {image_name} ({len(image_data):,} bytes)")
                        else:
                            print(f"  ❌ Failed to write: {image_name}")
                        
        except Exception as e:
            print(f"  ⚠️ Warning: Could not extract images from {docx_path}: {e}")
            
        return images_found

    def clean_markdown(self, markdown_text):
        """Clean and format markdown text"""
        # Remove extra whitespace
        markdown_text = re.sub(r'\n\s*\n\s*\n', '\n\n', markdown_text)
        
        # Fix heading spacing
        markdown_text = re.sub(r'\n(#{1,6})', r'\n\n\1', markdown_text)
        markdown_text = re.sub(r'(#{1,6}.*?)\n([^\n#])', r'\1\n\n\2', markdown_text)
        
        # Clean up list formatting
        markdown_text = re.sub(r'\n(\*|\d+\.)', r'\n\n\1', markdown_text)
        
        # Remove excessive newlines at start and end
        markdown_text = markdown_text.strip()
        
        return markdown_text

    def extract_tables_from_docx(self, docx_path):
        """Extract table data from DOCX using python-docx"""
        try:
            from docx import Document
            doc = Document(docx_path)
            tables_data = []
            
            for table in doc.tables:
                table_rows = []
                for row in table.rows:
                    row_data = []
                    for cell in row.cells:
                        # Clean cell text
                        cell_text = cell.text.strip().replace('\n', ' ')
                        row_data.append(cell_text)
                    table_rows.append(row_data)
                
                if table_rows:  # Only add non-empty tables
                    tables_data.append(table_rows)
            
            return tables_data
        except Exception as e:
            print(f"  ⚠️ Warning: Could not extract tables: {e}")
            return []

    def fix_table_formatting(self, markdown_text, tables_data):
        """Enhanced table formatting with multiple detection strategies"""
        if not tables_data:
            return markdown_text
            
        lines = markdown_text.split('\n')
        result_lines = []
        table_index = 0
        
        i = 0
        while i < len(lines) and table_index < len(tables_data):
            line = lines[i].strip()
            
            # Strategy 1: Look for academic matrix patterns (like "Framing questions")
            if self.is_academic_matrix_start(line, lines, i):
                matrix_lines, end_index = self.extract_academic_matrix(lines, i)
                if matrix_lines and table_index < len(tables_data):
                    table_md = self.create_academic_matrix_table(matrix_lines, tables_data[table_index])
                    result_lines.extend(table_md)
                    result_lines.append("")
                    table_index += 1
                    i = end_index
                    continue
            
            # Strategy 2: Look for sticky note/brainstorming patterns  
            elif self.is_sticky_notes_pattern(line, lines, i):
                notes_lines, end_index = self.extract_sticky_notes(lines, i)
                if notes_lines:
                    formatted_notes = self.format_sticky_notes(notes_lines)
                    result_lines.extend(formatted_notes)
                    result_lines.append("")
                    i = end_index
                    continue
            
            # Strategy 3: Original table detection for structured data
            elif (table_index < len(tables_data) and 
                  self.is_table_candidate_line(line) and
                  self.has_table_sequence(lines, i)):
                
                table_candidate_lines, end_index = self.extract_table_sequence(lines, i)
                if len(table_candidate_lines) >= 3:
                    table_md = self.create_markdown_table_from_data(tables_data[table_index])
                    result_lines.extend(table_md)
                    result_lines.append("")
                    table_index += 1
                    i = end_index
                    continue
            
            result_lines.append(lines[i])
            i += 1
            
        return '\n'.join(result_lines)
    
    def is_academic_matrix_start(self, line, lines, index):
        """Detect start of academic matrix like 'Framing questions using lower Bloom's...'"""
        keywords = ['framing questions', 'bloom', 'cognitive approach', 'how might we']
        return any(keyword in line.lower() for keyword in keywords)
    
    def extract_academic_matrix(self, lines, start_index):
        """Extract academic matrix pattern"""
        matrix_lines = []
        i = start_index
        
        # Skip the header line
        if i < len(lines):
            matrix_lines.append(lines[i].strip())
            i += 1
        
        # Look for the matrix pattern: header row then data rows
        collecting = False
        while i < len(lines) and i < start_index + 20:  # Reasonable limit
            line = lines[i].strip()
            
            if not line:
                i += 1
                continue
                
            # Look for patterns like "How Might We?" or "Idea #1", "Idea #2"
            if any(pattern in line.lower() for pattern in ['how might', 'idea #', 'understand', 'apply', 'evaluate']):
                collecting = True
                matrix_lines.append(line)
            elif collecting and self.is_table_candidate_line(line):
                matrix_lines.append(line)
            elif collecting and (line.startswith('#') or len(line.split()) > 15):
                break
            elif not collecting and line:
                matrix_lines.append(line)
                
            i += 1
        
        return matrix_lines, i
    
    def create_academic_matrix_table(self, matrix_lines, table_data):
        """Create table from academic matrix pattern using extracted data"""
        if not table_data or len(table_data) < 2:
            return self.format_as_structured_list(matrix_lines)
            
        # Use the actual table data structure
        return self.create_markdown_table_from_data(table_data)
    
    def is_sticky_notes_pattern(self, line, lines, index):
        """Detect sticky notes brainstorming pattern"""
        return ('sticky' in line.lower() and 'note' in line.lower()) or 'brainstorming' in line.lower()
    
    def extract_sticky_notes(self, lines, start_index):
        """Extract sticky notes content"""
        notes_lines = [lines[start_index].strip()]  # Include header
        i = start_index + 1
        
        while i < len(lines) and i < start_index + 15:
            line = lines[i].strip()
            
            if not line:
                i += 1
                continue
            elif line.startswith('#') or 'framing questions' in line.lower():
                break
            elif len(line.split()) > 2 and len(line) < 150:  # Reasonable sticky note length
                notes_lines.append(line)
            
            i += 1
            
        return notes_lines, i
    
    def format_sticky_notes(self, notes_lines):
        """Format sticky notes as a clean list or grid"""
        if len(notes_lines) <= 1:
            return notes_lines
            
        formatted = [notes_lines[0]]  # Keep header
        formatted.append("")
        
        # Group notes into a grid-like structure
        notes_content = notes_lines[1:]
        for i, note in enumerate(notes_content):
            if i % 3 == 0 and i > 0:
                formatted.append("")  # Add spacing every 3 items
            formatted.append(f"- {note}")
            
        return formatted
    
    def is_table_candidate_line(self, line):
        """Check if line looks like table content"""
        return (line and 
                not line.startswith('#') and 
                not line.startswith('![') and
                len(line.split()) <= 8 and
                len(line) < 120)
    
    def has_table_sequence(self, lines, start_index):
        """Check if there's a sequence of table-like lines"""
        count = 0
        for i in range(start_index, min(len(lines), start_index + 8)):
            if self.is_table_candidate_line(lines[i].strip()):
                count += 1
        return count >= 3
    
    def extract_table_sequence(self, lines, start_index):
        """Extract sequence of table-like lines"""
        table_lines = []
        i = start_index
        
        while i < len(lines) and self.is_table_candidate_line(lines[i].strip()):
            table_lines.append(lines[i].strip())
            i += 1
            
        return table_lines, i
    
    def format_as_structured_list(self, lines):
        """Fallback formatting as structured list"""
        if not lines:
            return []
            
        formatted = [lines[0]]  # Header
        formatted.append("")
        
        for line in lines[1:]:
            if line:
                formatted.append(f"- {line}")
                
        return formatted
    
    def create_markdown_table_from_data(self, table_data):
        """Create markdown table from extracted table data"""
        if not table_data or len(table_data) < 1:
            return []
            
        markdown_table = []
        
        # Header row
        if table_data[0]:
            header = "| " + " | ".join(str(cell) for cell in table_data[0]) + " |"
            markdown_table.append(header)
            
            # Separator row
            separator = "|" + "|".join("---" for _ in table_data[0]) + "|"
            markdown_table.append(separator)
        
        # Data rows
        for row in table_data[1:]:
            if row:  # Skip empty rows
                row_md = "| " + " | ".join(str(cell) for cell in row) + " |"
                markdown_table.append(row_md)
        
        return markdown_table

    def convert_docx_to_markdown(self, docx_path):
        """Convert a single DOCX file to markdown"""
        doc_name = docx_path.stem
        print(f"\n🔄 Converting: {docx_path.name}")
        
        # Extract images first
        images = self.extract_images_from_docx(docx_path, doc_name)
        
        # Extract tables
        tables = self.extract_tables_from_docx(docx_path)
        if tables:
            print(f"  📊 Found {len(tables)} tables")
        
        try:
            # Convert DOCX to markdown using mammoth
            with open(docx_path, "rb") as docx_file:
                # Create a counter for sequential image mapping
                image_counter = 0
                
                # Custom image converter to use our extracted images
                def convert_image(image):
                    nonlocal image_counter
                    
                    # Use sequential mapping if we have extracted images
                    if images and image_counter < len(images):
                        current_image = images[image_counter]
                        print(f"    🔗 Image {image_counter + 1}: {current_image['original']} → {current_image['relative_path']}")
                        
                        image_counter += 1
                        return {
                            "src": current_image['relative_path'],
                            "alt": image.alt_text or current_image['original'].replace('.png', '').replace('.jpg', '').replace('image', 'Image ')
                        }
                    
                    # Try filename matching as backup
                    if hasattr(image, 'src') and image.src:
                        src_filename = Path(image.src).name
                        for img_info in images:
                            if img_info['original'] == src_filename:
                                print(f"    ✅ Filename match: {src_filename} → {img_info['relative_path']}")
                                return {
                                    "src": img_info['relative_path'],
                                    "alt": image.alt_text or img_info['original']
                                }
                    
                    # If we still have images available, cycle through them
                    if images:
                        cycle_index = image_counter % len(images)
                        current_image = images[cycle_index]
                        image_counter += 1
                        print(f"    🔄 Cycling to image {cycle_index + 1}: {current_image['relative_path']}")
                        return {
                            "src": current_image['relative_path'],
                            "alt": image.alt_text or f"Document Image {cycle_index + 1}"
                        }
                    
                    # No images available - create placeholder
                    print(f"    ⚠️ No images available, using placeholder")
                    return {
                        "src": f"/images/docx/{doc_name}_placeholder.png",
                        "alt": image.alt_text or "Image not found"
                    }
                
                # Configure mammoth with custom image handling and table support
                result = mammoth.convert_to_markdown(
                    docx_file,
                    convert_image=mammoth.images.img_element(convert_image)
                )
                
                markdown_content = result.value
                
                # Post-process to fix table formatting
                markdown_content = self.fix_table_formatting(markdown_content, tables)
                
                if result.messages:
                    print(f"  ℹ️ Conversion messages: {len(result.messages)} items")
                    for msg in result.messages:
                        print(f"    📝 {msg.message}")
                        
                # Count images in the converted content
                import re
                image_count = len(re.findall(r'!\[.*?\]\(.*?\)', markdown_content))
                print(f"  🖼️ Images in markdown: {image_count}")
                
        except Exception as e:
            print(f"  ❌ Error converting {docx_path}: {e}")
            return None
        
        # Clean up the markdown
        markdown_content = self.clean_markdown(markdown_content)
        
        # Create Jekyll front matter with DOCX suffix for safe cleanup
        date_str = datetime.datetime.now().strftime("%Y-%m-%d")
        filename = f"{date_str}-{doc_name}_DOCX_.md"
        
        # Generate Jekyll-compatible front matter
        front_matter = f"""---
layout: post
title: "{doc_name.replace('-', ' ').replace('_', ' ').title()}"
date: {datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")} +0000
categories: [DOCX, Documents]
tags: [docx, converted]
author: Generated from DOCX
description: "Converted from {docx_path.name}"
permalink: /docx/{doc_name}/
image:
  path: /images/docx/
  alt: "{doc_name} document images"
---

<!-- Converted from: {docx_path.name} -->
<!-- Conversion date: {datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")} -->
<!-- Images extracted: {len(images)} -->

"""
        
        # Combine front matter with content
        full_content = front_matter + markdown_content
        
        # Write markdown file
        output_path = self.posts_dir / filename
        with open(output_path, 'w', encoding='utf-8') as md_file:
            md_file.write(full_content)
        
        print(f"  ✅ Created: {filename}")
        print(f"  📊 Images: {len(images)} extracted")
        
        return {
            'docx_path': docx_path,
            'markdown_path': output_path,
            'images': images,
            'filename': filename
        }

    def convert_all_docx(self):
        """Convert all DOCX files in the _docx directory"""
        if not self.docx_dir.exists():
            print(f"❌ DOCX directory not found: {self.docx_dir}")
            return []
        
        docx_files = list(self.docx_dir.glob("*.docx"))
        
        if not docx_files:
            print(f"📂 No DOCX files found in {self.docx_dir}")
            return []
        
        print(f"🎯 Found {len(docx_files)} DOCX files to convert")
        
        results = []
        for docx_file in docx_files:
            # Skip temporary files (start with ~$)
            if docx_file.name.startswith('~$'):
                print(f"⏭️ Skipping temporary file: {docx_file.name}")
                continue
                
            result = self.convert_docx_to_markdown(docx_file)
            if result:
                results.append(result)
        
        return results

    def create_index_page(self, results):
        """Create an index page for all converted documents"""
        if not results:
            return
        
        index_content = f"""---
layout: page
title: "DOCX Documents"
permalink: /docx/
description: "Converted documents from DOCX files"
---

# DOCX Documents

This page contains documents converted from DOCX files.

*Last updated: {datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}*

## Available Documents

"""
        
        for result in results:
            doc_title = result['docx_path'].stem.replace('-', ' ').replace('_', ' ').title()
            doc_name = result['docx_path'].stem
            post_url = f"/docx/{doc_name}/"
            
            index_content += f"""
### [{doc_title}]({post_url})

- **Source**: `{result['docx_path'].name}`
- **Images**: {len(result['images'])} extracted
- **Generated**: {datetime.datetime.now().strftime("%Y-%m-%d")}

"""
        
        index_content += f"""
## Image Gallery

All extracted images are available in the [images/docx](/images/docx/) directory.

## Conversion Process

These documents were automatically converted from DOCX format using:
- **mammoth** for DOCX to Markdown conversion
- **PIL** for image processing  
- Custom scripts for Jekyll integration

---

*Note: Original DOCX files are maintained in the `_docx` directory and excluded from the published site.*
"""
        
        # Write index page
        index_path = self.base_dir / "docx-index.md"
        with open(index_path, 'w', encoding='utf-8') as index_file:
            index_file.write(index_content)
        
        print(f"📋 Created index page: docx-index.md")

def main():
    print("🚀 DOCX to Markdown Converter for Jekyll")
    print("=" * 50)
    
    converter = DocxConverter()
    results = converter.convert_all_docx()
    
    if results:
        converter.create_index_page(results)
        print(f"\n✨ Conversion complete!")
        print(f"📈 Converted: {len(results)} documents")
        print(f"🖼️ Images: {sum(len(r['images']) for r in results)} extracted")
        print("\n🔍 Next steps:")
        print("  1. Review generated markdown files in _posts/")
        print("  2. Check extracted images in images/docx/")
        print("  3. Run 'make serve' to preview locally")
        print("  4. Commit and push to deploy via GitHub Actions")
    else:
        print("\n⚠️ No documents were converted")
        print("Make sure you have DOCX files in the _docx directory")

if __name__ == "__main__":
    main()