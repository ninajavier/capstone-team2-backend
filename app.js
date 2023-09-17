require("dotenv").config();
const express = require("express");
const admin = require('./config/firebaseAdminConfig');
const firebaseAuthMiddleware = require('./middleware/firebaseAuthMiddleware');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');
const requestLoggerMiddleware = require('./middleware/requestLoggerMiddleware');

// Import your routers
const apiRoutes = require('./routes/apiRouter'); // Adjusted path
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const threadRoutes = require('./routes/threadRoutes');
const likeRoutes = require('./routes/likeRoutes');

const app = express();

app.use(express.json()); // This middleware is used to parse JSON bodies
app.use(requestLoggerMiddleware); // Logging all incoming requests

// Use your routes with Firebase Auth Middleware
app.use("/api", apiRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", firebaseAuthMiddleware, commentRoutes);
app.use("/api/threads", firebaseAuthMiddleware, threadRoutes);
app.use("/api/likes", firebaseAuthMiddleware, likeRoutes);

// Error handler middleware should be the last middleware to be used
app.use(errorHandlerMiddleware);

module.exports = app;