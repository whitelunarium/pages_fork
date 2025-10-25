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

<script type="module">
import { fetchPosts } from '/assets/js/api/microblog.js';

async function renderMicroblogTable() {
    const container = document.getElementById('microblog-playground');
    try {
        const data = await fetchPosts();
        // Topic-level info
        const topicInfo = `
            <div><strong>Topic:</strong> ${data.topic || ''}</div>
            <div><strong>Post Count:</strong> ${data.count || 0}</div>
            <div><strong>Can Post:</strong> ${data.canPost ? 'Yes' : 'No'}</div>
            <div><strong>Your Post Count:</strong> ${data.userPostCount || 0}</div>
        `;
        // Table header
        const headers = [
            'id', 'userId', 'userName', 'userUid', 'content', 'topicId', 'timestamp', 'updatedAt', 'characterCount'
        ];
        let table = `<table border="1" style="border-collapse:collapse; margin-top:1em;">
            <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>`;
        (data.microblogs || []).forEach(post => {
            table += '<tr>' + headers.map(h => `<td>${post[h] ?? ''}</td>`).join('') + '</tr>';
        });
        table += '</tbody></table>';
        container.innerHTML = topicInfo + table;
    } catch (error) {
        container.innerHTML = `<div style="color:red;">Failed to load microblog posts: ${error.message}</div>`;
    }
}
renderMicroblogTable();
</script>


