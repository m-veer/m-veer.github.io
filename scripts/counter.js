import { BIN_ID_JSON, API_KEY_JSON, API_KEY_IP } from '../config.js';

function decodeBase64(base64String) {
  return atob(base64String);
}

let base64Encoded_BIN = BIN_ID_JSON;
let decodedString_BIN = decodeBase64(base64Encoded_BIN);
let base64Encoded_API_JSON = API_KEY_JSON;
let decodedString_API_JSON = decodeBase64(base64Encoded_API_JSON);
let base64Encoded_API_IP = API_KEY_IP;
let decodedString_API_IP = decodeBase64(base64Encoded_API_IP);

async function updateCounter() {
  try {
    // Fetch current data
    const response = await fetch(`https://api.jsonbin.io/v3/b/${decodedString_BIN}/latest`, {
      headers: {
        'X-Master-Key': decodedString_API_JSON
      }
    });
    const data = await response.json();
    const content = data.record;

    // Increment count
    content.Count = (content.Count || 0) + 1;

    // Get current IP
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const currentIP = ipData.ip;

    // Construct the API request URL
    const IPurl = `https://ipinfo.io/${currentIP}?token=${decodedString_API_IP}`;

    // Fetch the geolocation data
    const geoResponse = await fetch(IPurl);
    const geoData = await geoResponse.json();

    // Extract the required information
    const city = geoData.city;
    const region = geoData.region;
    const postalCode = geoData.postal;
    const country = geoData.country;
    const continent = geoData.loc.split(',')[0];
    const metroCode = geoData.loc;
    const coordinates = geoData.loc;
    const hostname = geoData.hostname;

    // Get current date and time
    const currentDateTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

    // Add new object with count, IP, and DateTime
    const newKey = `visit_${content.Count}`;
    const newValue = {
      "Count": content.Count.toString(),
      "IP": currentIP,
      "DateTime": currentDateTime,
      "City": city,
      "Region": region,
      "PostalCode": postalCode,
      "Country": country,
      "Continent": continent,
      "MetroCode": metroCode,
      "COOrdinates": coordinates,
      "HostName": hostname
    };
    content[newKey] = newValue;

    // Update the bin
    await fetch(`https://api.jsonbin.io/v3/b/${decodedString_BIN}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': decodedString_API_JSON
      },
      body: JSON.stringify(content)
    });

  } catch (error) {
    console.error('Failed to update counter:', error);
  }
}

window.addEventListener('load', updateCounter);