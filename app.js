require("dotenv").config();
const cors = require("cors")
const express = require("express");
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');
const requestLoggerMiddleware = require('./middleware/requestLoggerMiddleware');

// Import your routers
// const apiRoutes = require('./routes/apiRouter'); // REDUNDANCY
// const userRoutes = require('./routes/userRoutes');
const commentController= require('./controllers/commentsController');
// const threadRoutes = require('./routes/threadRoutes');
// const likeRoutes = require('./routes/likeRoutes');
const threadsController = require('./controllers/threadsController');
const app = express();
app.use(cors())
app.use(express.json()); // This middleware is used to parse JSON bodies
app.use(requestLoggerMiddleware); // Logging all incoming requests

// Use your routes
// app.use("/api", apiRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/comments", commentController);
app.use("/api/threads", threadsController);
// app.use("/api/likes", likeRoutes);

// Error handler middleware should be the last middleware to be used
app.use(errorHandlerMiddleware);

module.exports = app;
