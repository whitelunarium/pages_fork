import { pythonURI, fetchOptions } from './config.js';

/**
 * Microblog API Module
 * Provides reusable functions for interacting with the microblog API
 */

/**
 * Fetch all microblog posts
 * @returns {Promise<Array>} - Resolves to an array of posts or an error
 */
export async function fetchPosts() {
    const apiUrl = pythonURI + '/api/microblog';

    try {
        const response = await fetch(apiUrl, fetchOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Microblog posts retrieved:', data);
        return data;
    } catch (error) {
        throw error;
    }
}
