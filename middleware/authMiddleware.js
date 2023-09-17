const admin = require("../config/firebaseAdminConfig");

async function authMiddleware(req, res, next) {
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
