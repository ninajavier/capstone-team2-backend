const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    "projectId": "prograde-df423",
    "private_key_id": "YOUR_PRIVATE_KEY_ID",  // You will get this from your downloaded JSON
    "private_key": "YOUR_PRIVATE_KEY",  // You will get this from your downloaded JSON
    "client_email": "YOUR_CLIENT_EMAIL",  // You will get this from your downloaded JSON
    "client_id": "YOUR_CLIENT_ID",  // You will get this from your downloaded JSON
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "YOUR_CLIENT_X509_CERT_URL"  // You will get this from your downloaded JSON
  }),
});

module.exports = admin;
