const admin = require('firebase-admin');

const  = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization?.replace('Bearer ', '');
    if (!idToken) {
      throw new Error('No token found');
    }
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token', error);
    res.status(403).json({ error: 'Unauthorized', message: error.message });
  }
};

module.exports = ;
