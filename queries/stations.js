const db = require("../config/dbConfig");

const getAllStationsAndLines = async (req, res) => {
  try {
    const stations = await db.any(
      'SELECT "station_id", "stop_name", "daytime_routes" FROM stations'
    );
    return {
      stations,
    };
  } catch (error) {
    console.error((error, "error fetching stations"));
  }
};

module.exports = { getAllStationsAndLines };
