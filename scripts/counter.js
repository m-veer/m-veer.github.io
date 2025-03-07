// const TOKEN = 'your_personal_access_token';
// const REPO_OWNER = 'your_github_username';
// const REPO_NAME = 'your_repository_name';
// const FILE_PATH = 'visitor_count.json';

// import { TOKEN, REPO_OWNER, REPO_NAME, FILE_PATH } from '../config.js';

// async function getIPAddress() {
//     try {
//         const response = await fetch('https://api.ipify.org?format=json');
//         const data = await response.json();
//         return data.ip;
//     } catch (error) {
//         console.error('Error fetching IP:', error);
//         return 'Unknown';
//     }
// }

// async function updateVisitorCount() {
//   try {
//     const ip = await getIPAddress();

//     // Fetch current file content
//     const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
//       headers: {
//         'Authorization': `token ${TOKEN}`,
//         'Accept': 'application/vnd.github.v3+json'
//       }
//     });
//     const data = await response.json();
    
//     // Parse content and update count and IP
//     const content = JSON.parse(atob(data.content));
//     content.count++;
//     content.IP = ip;
    
//     // Update file on GitHub
//     await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
//       method: 'PUT',
//       headers: {
//         'Authorization': `token ${TOKEN}`,
//         'Accept': 'application/vnd.github.v3+json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         message: 'Update visitor count and IP',
//         content: btoa(JSON.stringify(content)),
//         sha: data.sha
//       })
//     });

//     console.log('Visitor count and IP updated successfully');
//   } catch (error) {
//     console.error('Error updating visitor count and IP:', error);
//   }
// }

// // Call updateVisitorCount when the page loads
// window.onload = updateVisitorCount;

import { BIN_ID, API_KEY } from '../config.js';

console.log(BIN_ID);
console.log(API_KEY);

async function updateCounter() {
  try {
    // Fetch current data
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY
      }
    });
    const data = await response.json();
    const content = data.record;

    // Increment count
    content.count = (content.count || 0) + 1;

    // Get current IP
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const currentIP = ipData.ip;

    // Get current date and time
    // const currentDateTime = new Date().toISOString();
    const currentDateTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

    // Add new object with count, IP, and DateTime
    const newKey = `visit_${content.count}`;
    const newValue = {
      "count": content.count.toString(),
      "IP": currentIP,
      "DateTime": currentDateTime
    };
    content[newKey] = newValue;

    // Update the bin
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
      },
      body: JSON.stringify(content)
    });

  } catch (error) {
    console.error('Failed to update counter:', error);
  }
}

window.addEventListener('load', updateCounter);