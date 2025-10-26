---
layout: post
title: Microblog AI Playground
description: Interactive tool to explore different Microbg prompts and response formats
author: John Mortensen
permalink: /hacks/microblog
---

This page demonstrates fetching and displaying microblog posts using the `microblog.js` API module.

## Fetch all microblogs

<div id="microblog-playground">
  <em>Loading microblog posts...</em>
</div>

<!-- jQuery and DataTables CDN -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>

<script type="module">
import { fetchPosts } from '/assets/js/api/microblog.js';

async function renderMicroblogTable() {
    const container = document.getElementById('microblog-playground');
    try {
        const data = await fetchPosts();
        // Topic-level info
        const topicInfo = `
            <div><strong>Post Count:</strong> ${data.count || 0}</div>
        `;
        // Table columns
        const attributes = [
            'id', 'userName', 'userUid', 'topicPath', 'content', 'timestamp', 'characterCount'
        ];
        // Table: starts with headers, microblog-table 'id" definition is for jquery feattures.
        let table = `
        <table id="microblog-table" border="1" style="border-collapse:collapse; margin-top:1em;">
        <thead>
            <tr>
            ${attributes.map(header => `<th>${header}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
        `;
        // Table: display data
        (data.microblogs || []).forEach(post => {
            table += '<tr>' + attributes.map(data => `<td>${post[data] ?? ''}</td>`).join('') + '</tr>';
        });
        // Table: closing tags
        table += '</tbody></table>';
        // Table: set DOM element container with HTML, which displays content
        container.innerHTML = topicInfo + table;
        // Wait for DOM update, then initialize DataTables
        setTimeout(() => {
            if (window.jQuery && $('#microblog-table').length) {
                $('#microblog-table').DataTable();
            }
        }, 0);
    } catch (error) {
        container.innerHTML = `<div style="color:red;">Failed to load microblog posts: ${error.message}</div>`;
    }
}
renderMicroblogTable();
</script>
