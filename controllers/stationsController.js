const express = require("express");
const stations = express.Router();
// const db = require("../config/dbConfig");

const { getAllStationsAndLines } = require("../queries/stations");

stations.get("/", async (req, res) => {
  try {
    const allStations = await getAllStationsAndLines();
    res.status(200).json(allStations);
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

module.exports = stations;
