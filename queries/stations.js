const db = require("../config/dbConfig");

const getAllStationsAndLines = async (req, res) => {
  try {
    const stations = await db.any(
      'SELECT "station_id", "daytime_routes" FROM stations'
    );
    return {
      stations,
    };
  } catch (error) {
    return error;
  }
};

module.exports = { getAllStationsAndLines };
