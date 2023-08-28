const express = require("express");
const data = express.Router();
const dataArray = require("../models/data.model.js");

data.get("/", (req, res) => {
    res.json(dataArray)
})

module.exports = data;