const express = require("express");
// const dataController = require("./controllers/data.controller.js");
const app = express();

// app.use('/data', dataController);

app.get("/", (req, res) => {
  res.send("Prograde");
});

module.exports = app;
