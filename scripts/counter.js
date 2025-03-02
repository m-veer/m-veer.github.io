// const TOKEN = 'your_personal_access_token';
// const REPO_OWNER = 'your_github_username';
// const REPO_NAME = 'your_repository_name';
// const FILE_PATH = 'visitor_count.json';

import { TOKEN, REPO_OWNER, REPO_NAME, FILE_PATH } from '../config.js';

async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return 'Unknown';
    }
}

async function updateVisitorCount() {
  try {
    const ip = await getIPAddress();

    // Fetch current file content
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      headers: {
        'Authorization': `token ${TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    const data = await response.json();
    
    // Parse content and update count and IP
    const content = JSON.parse(atob(data.content));
    content.count++;
    content.IP = ip;
    
    // Update file on GitHub
    await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Update visitor count and IP',
        content: btoa(JSON.stringify(content)),
        sha: data.sha
      })
    });

    console.log('Visitor count and IP updated successfully');
  } catch (error) {
    console.error('Error updating visitor count and IP:', error);
  }
}

// Call updateVisitorCount when the page loads
window.onload = updateVisitorCount;
