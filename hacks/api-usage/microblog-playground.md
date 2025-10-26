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

<div class="mb-4">
  <button id="create-btn" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Create Post</button>
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

document.getElementById('create-btn').onclick = () => openModal({ mode: 'create' });

document.getElementById('microblog-form').onsubmit = async function(e) {
  e.preventDefault();
  const id = document.getElementById('post-id').value;
  const topicPath = document.getElementById('topic-id').value;
  const content = document.getElementById('content').value;
  try {
    if (id) {
      await updatePost(id, { content });
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
            ${attributes.map(header => `<th>${header}</th>`).join('')}<th>Action</th>
            </tr>
        </thead>
        <tbody>
        `;
        // Table: display data
        (data.microblogs || []).forEach(post => {
            table += '<tr>' + attributes.map(data => `<td>${post[data] ?? ''}</td>`).join('') +
              `<td><button class='edit-btn bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600' data-id='${post.id}'>Edit</button></td></tr>`;
        });
        // Table: closing tags
        table += '</tbody></table>';
        // Table: set DOM element container with HTML, which displays content
        container.innerHTML = topicInfo + table;
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
