require('dotenv').config();
const express = require("express");
const admin = require("firebase-admin");
const firebaseAuthMiddleware = require("./middlewares/firebaseAuthMiddleware");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const requestLoggerMiddleware = require("./middlewares/requestLoggerMiddleware");

// Import your routers
const userRoutes = require("./src/routes/userRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const threadRoutes = require("./src/routes/threadRoutes");
const likeRoutes = require("./src/routes/likeRoutes");

// Initialize Firebase Admin SDK
var serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json()); // This middleware is used to parse JSON bodies
app.use(requestLoggerMiddleware); // Logging all incoming requests

// Use your routes with Firebase Auth Middleware
app.use("/api/users", firebaseAuthMiddleware, userRoutes);
app.use("/api/comments", firebaseAuthMiddleware, commentRoutes);
app.use("/api/threads", firebaseAuthMiddleware, threadRoutes);
app.use("/api/likes", firebaseAuthMiddleware, likeRoutes);

// Error handler middleware should be the last middleware to be used
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
