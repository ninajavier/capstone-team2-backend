const db = require("../db/dbConfig.js");

// INDEX - Get all routes
const getAllRoutes = async () => {
  try {
    const allRoutes = await db.any("SELECT * FROM routes");
    return allRoutes;
  } catch (error) {
    return error;
  }
};

// SHOW - Get a single route by ID
const getRouteById = async (id) => {
  try {
    const route = await db.one("SELECT * FROM routes WHERE id=$1", id);
    return route;
  } catch (error) {
    return error;
  }
};

// CREATE - Add a new route
const createRoute = async (route) => {
  try {
    const newRoute = await db.one(
      "INSERT INTO routes (route_name, description) VALUES($1, $2) RETURNING *", 
      [route.route_name, route.description]
    );
    return newRoute;
  } catch (error) {
    return error;
  }
};

// UPDATE - Update a route by ID
const updateRoute = async (id, route) => {
  try {
    const updatedRoute = await db.one(
      "UPDATE routes SET route_name=$1, description=$2 WHERE id=$3 RETURNING *",
      [route.route_name, route.description, id]
    );
    return updatedRoute;
  } catch (error) {
    return error;
  }
};

// FAVORITE - Increment the favorite count for a route
const favoriteRoute = async (id) => {
  try {
    const favoritedRoute = await db.one(
      "UPDATE routes SET favorites_count = favorites_count + 1 WHERE id=$1 RETURNING *", 
      id
    );
    return favoritedRoute;
  } catch (error) {
    return error;
  }
};

// UNFAVORITE - Decrement the favorite count for a route
const unfavoriteRoute = async (id) => {
  try {
    const unfavoritedRoute = await db.one(
      "UPDATE routes SET favorites_count = favorites_count - 1 WHERE id=$1 RETURNING *", 
      id
    );
    return unfavoritedRoute;
  } catch (error) {
    return error;
  }
};

// DELETE - Remove a route by ID
const deleteRoute = async (id) => {
  try {
    const deletedRoute = await db.one(
      "DELETE FROM routes WHERE id = $1 RETURNING *", 
      id
    );
    return deletedRoute;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  favoriteRoute,
  unfavoriteRoute,
  deleteRoute,
};
