---
layout: post
title: Microblog AI Playground
description: Interactive tool to explore different Microblog prompts and response formats
author: John Mortensen
permalink: /hacks/microblog
---

<div id="microblog-playground">
  <em>Loading microblog posts...</em>
</div>

<!-- jQuery and DataTables CDN -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>

<!-- Tailwind CDN for responsive modals -->
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

<!-- Create/Edit Modal Overlay -->
<div id="microblog-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
  <div class="bg-blue-500 rounded-lg shadow-lg w-full max-w-lg mx-2 p-6 relative">
    <button id="modal-close" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
    <h2 id="modal-title" class="text-xl font-bold mb-4">Create Microblog Post</h2>
    <form id="microblog-form" class="space-y-4">
      <input type="hidden" id="post-id" name="id">
      <div>
        <label class="block text-sm font-medium text-gray-700">Topic</label>
        <input id="topic-id" name="topicId" type="text" class="mt-1 block w-full border border-gray-300 rounded-md p-2" readonly>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Content <span class="text-red-500">*</span></label>
        <textarea id="content" name="content" rows="3" required class="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
      </div>
      <div class="flex justify-end space-x-2">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
      </div>
    </form>
  </div>
</div>

<script type="module">
import { fetchPosts, createPost, updatePost } from '/assets/js/api/microblog.js';

const pagePermalink = '{{page.permalink}}';

function openModal({ mode, post = {} }) {
  document.getElementById('microblog-modal').classList.remove('hidden');
  document.getElementById('modal-title').textContent = mode === 'edit' ? 'Edit Microblog Post' : 'Create Microblog Post';
  document.getElementById('post-id').value = post.id || '';
  document.getElementById('topic-id').value = post.topicPath || pagePermalink;
  document.getElementById('content').value = post.content || '';
}
function closeModal() {
  document.getElementById('microblog-modal').classList.add('hidden');
}
document.getElementById('modal-close').onclick = closeModal;
document.getElementById('microblog-modal').onclick = function(e) {
  if (e.target === this) closeModal();
};

document.getElementById('microblog-form').onsubmit = async function(e) {
  e.preventDefault();
  const id = document.getElementById('post-id').value;
  const topicPath = document.getElementById('topic-id').value;
  const content = document.getElementById('content').value;
  try {
    if (id) {
      await updatePost({ id, content, topicPath });
    } else {
      await createPost({ content, topicPath });
    }
    closeModal();
    renderMicroblogTable();
  } catch (err) {
    alert('Error saving post: ' + err.message);
  }
};

async function renderMicroblogTable() {
    const container = document.getElementById('microblog-playground');
    try {
        const data = await fetchPosts();
        // Use SVG icons for Create (plus) and Edit (pencil)
        const createIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="inline w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>`;
        const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 ml-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z" /></svg>`;

        // Topic-level info with Create button inline
        const topicInfo = `
        <div class="flex items-center mb-2">
            <button id="create-btn" class="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 flex items-center"> ${createIcon} </button>
            <div class="font-bold ml-2">Posts: ${data.count || 0}</div>
        </div>
        `;
        // Table columns for vertical stack with formatting and custom labels
        const analytics = [
          { key: 'userName' },
          { key: 'timestamp', format: ts => {
              if (!ts) return '';
              const d = new Date(ts);
              if (isNaN(d)) return ts;
              return d.toLocaleString();
            }
          },
          { key: 'characterCount', format: v => `Count: ${v}` }
        ];
        const message = [
          { key: 'topicPath', format: v => `Topic: ${v}` },
          { key: 'content' }
        ];
        let table = `
        <table id="microblog-table" border="1" style="border-collapse:collapse; margin-top:1em; width:100%;">
        <thead>
            <tr>
                <th style="width:30%">Analytics</th>
                <th>Message</th>
            </tr>
        </thead>
        <tbody>
        `;
        // Table: display data, each row is a post
        (data.microblogs || []).forEach(post => {
            const analyticsCell = analytics.map(f => {
              let value = post[f.key] ?? '';
              if (f.format) value = f.format(value);
              return `<div>${value}</div>`;
            }).join('');
            // Edit button inline with Topic
            const messageCell = message.map(f => {
              let value = post[f.key] ?? '';
              if (f.key === 'topicPath') {
                value = (f.format ? f.format(value) : value) +
                  ` <button class='edit-btn ml-2' data-id='${post.id}' title='Edit'>${editIcon}</button>`;
              } else if (f.format) {
                value = f.format(value);
              }
              return `<div>${value}</div>`;
            }).join('');
            table += `<tr><td class="text-left">${analyticsCell}</td><td class="text-left">${messageCell}</td></tr>`;
        });
        table += '</tbody></table>';
        // Table: set DOM element container with HTML, which displays content
        container.innerHTML = topicInfo + table + topicInfo;
        // Wait for DOM update, then initialize DataTables
        setTimeout(() => {
            if (window.jQuery && $('#microblog-table').length) {
                $('#microblog-table').DataTable();
                // Bind edit buttons
                $('.edit-btn').on('click', function() {
                  const id = $(this).data('id');
                  const post = (data.microblogs || []).find(p => p.id == id);
                  openModal({ mode: 'edit', post });
                });
            }
        }, 0);
    } catch (error) {
        container.innerHTML = `<div style="color:red;">Failed to load microblog posts: ${error.message}</div>`;
    }
}
renderMicroblogTable();
</script>
