require('dotenv').config();
const admin = require("../config/firebaseAdminConfig");

async function authMiddleware(req, res, next) {
  if (process.env.BYPASS_AUTH === "true") {
    console.warn("Authentication bypassed");
    req.user = { uid: "bypassedUserId" }; // Provide a dummy user ID
    return next();
  }
  
  const idToken = req.headers.authorization;

  try {
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Add the verified token and user info to the request object
    req.user = decodedToken;

    // Pass the execution to the next middleware/function
    next();
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(403).send("Unauthorized");
  }
}

module.exports = authMiddleware;
