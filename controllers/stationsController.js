const db = require("../config/dbConfig");

app.get("/api/stations", async (req, res) => {
  try {
    const stations = await db.any(
      'SELECT "station_id", "daytime_routes" FROM stations'
    );
    res.json(stations);
  } catch (error) {
    console.error("Error fetching stations:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching stations." });
  }
});
