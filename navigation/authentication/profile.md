---
layout: post
title: Profile Settings
permalink: /profile
search_exclude: true
show_reading_time: false
---

<div style="display: flex; flex-direction: row; gap: 20px; max-width: 1200px; margin: 0 auto;">
    <!-- Sidebar -->
    <div style="flex: 0 0 250px; background-color: #1e1e1e; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); height: 100vh; position: fixed; top: 0; left: 0; padding: 20px;">
        {% include Aesthetihawk/sidebarMain.html %}
    </div>
    <!-- Profile Content -->
    <div style="flex: 1; margin-left: 270px; display: flex; justify-content: center;">
        <div class="profile-container" style="background-color: #1e1e1e; color: white; max-width: 800px; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);">
            <div class="d-flex align-items-center">
                <div class="text-center" style="flex-shrink: 0; flex-basis: 150px; display: flex; flex-direction: column; align-items: center; padding: 0 20px;">
                    <img id="profilePhoto" src="" alt="Profile Photo" class="profile-photo" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; background-color: #2c3e50; border: 2px solid white;">
                    <button class="btn btn-dark mt-2" style="display: block; margin: 10px auto;" onclick="editProfilePhoto()">✏️ Change Profile Photo</button>
                </div>
                <div style="flex-grow: 1;">
                    <form>
                        <div class="mb-3">
                            <label class="form-label" style="color: white;">User ID</label>
                            <input type="text" class="form-control" id="profileUid" value="Loading..." style="background-color: #2c3e50; color: white; border: none;">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" style="color: white;">Full Name</label>
                            <input type="text" class="form-control" id="profileName" value="Loading..." style="background-color: #2c3e50; color: white; border: none;">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" style="color: white;">Email Address</label>
                            <input type="email" class="form-control" id="profileEmail" value="Loading..." style="background-color: #2c3e50; color: white; border: none;">
                        </div>
                        <div class="mb-3">
                            <input type="checkbox" id="kasm-server" style="margin-right: 5px;">
                            <label for="kasm-server" style="color: white;">Kasm server needed</label>
                            <p class="text-muted" style="color: rgba(255, 255, 255, 0.6);">Enable this if you need a dedicated Kasm workspace server.</p>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-secondary me-2">Cancel</button>
                            <button type="submit" class="btn btn-success" onclick="saveProfileChanges(event)">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="module">
    // Import fetchOptions from config.js
    import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    // Import functions from config.js
    import { putUpdate, postUpdate, deleteData, logoutUser } from "{{site.baseurl}}/assets/js/api/profile.js";
    
    async function fetchUserProfile() {
        const URL = pythonURI + "/api/id"; // Endpoint to fetch user profile data
    
        try {
            const response = await fetch(URL, fetchOptions);
            if (!response.ok) {
                throw new Error(`Failed to fetch user profile: ${response.status}`);
            }
    
            const profileData = await response.json();
            console.log('Fetched Profile Data:', profileData);
    
            // Update the profile fields
            document.getElementById('profileUid').value = profileData.uid || 'N/A';
            document.getElementById('profileName').value = profileData.name || 'N/A';
            document.getElementById('profileEmail').value = profileData.email || 'N/A';
            document.getElementById('kasm-server').checked = profileData.kasm_server_needed || false;
    
            // Update the profile picture
            const profilePhoto = document.getElementById('profilePhoto');
            if (profileData.pfp) {
                profilePhoto.src = profileData.pfp;
            } else {
                profilePhoto.src = ''; // Blank circle as default
                profilePhoto.style.backgroundColor = '#1e1e1e'; // Ensure it has a dark background
            }
        } catch (error) {
            console.error('Error fetching user profile:', error.message);
        }
    }
    
    function saveProfileChanges(event) {
        event.preventDefault(); // Prevent form submission
    
        const updatedProfile = {
            uid: document.getElementById('profileUid').value,
            name: document.getElementById('profileName').value,
            email: document.getElementById('profileEmail').value,
            kasm_server_needed: document.getElementById('kasm-server').checked,
        };
    
        console.log('Saving Profile Changes:', updatedProfile);
    
        // Add logic to send updatedProfile to the backend
    }
    
    function editProfilePhoto() {
        alert('Edit Profile Photo functionality coming soon!');
    }
    
    // Ensure the profile data is fetched on page load
    document.addEventListener('DOMContentLoaded', async function () {
        await fetchUserProfile();
    });
</script>
