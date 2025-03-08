const { google } = require('googleapis');
require('dotenv').config(); // Make sure to load your env variables

// Create an OAuth2 client with your credentials
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI // e.g., http://localhost:5000/auth/google/callback or http://localhost:5000/oauth2callback
);

// Define the scopes required (modify scopes as needed)
const scopes = [
  'https://www.googleapis.com/auth/spreadsheets.readonly',
  // add any other scopes if required
];

// Generate the URL for user consent
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // This is important to receive a refresh token
  prompt: 'consent',      // Force consent to ensure refresh token is provided
  scope: scopes,
});

console.log('Authorize this app by visiting this url:\n', authUrl);

// After you visit the URL and grant permission, you'll be redirected to your redirect URI with a "code" parameter.
// Copy that code and paste it in the terminal to exchange it for tokens.
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('\nEnter the code from that page here: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('\nTokens received:');
    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);
    // Save tokens.refresh_token in your .env file for future use
  } catch (error) {
    console.error('Error retrieving access token', error);
  }
  readline.close();
});
