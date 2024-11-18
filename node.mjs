const jwt = require('jsonwebtoken');
const fs = require('fs');

const serviceAccount = require('./Yen.json'); // Path to your JSON file
const privateKey = serviceAccount.private_key;
const clientEmail = serviceAccount.client_email;

const now = Math.floor(Date.now() / 1000);

const jwtPayload = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly', // Adjust the scope as needed
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
};

const token = jwt.sign(jwtPayload, privateKey, { algorithm: 'RS256' });

console.log(token);
