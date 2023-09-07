const dbQueries = require('./queries/routes.js');

// Function to get all routes
const getAllRoutes = async () => {
    return dbQueries.getAllRoutes();
};

// Function to get a route by ID
const getRouteById = async (id) => {
    return dbQueries.getRouteById(id);
};

// Function to add a favorite route for a user
const addFavoriteRoute = async (userId, routeId) => {
    return dbQueries.addFavoriteRoute(userId, routeId);
};

// Function to remove a favorite route for a user
const removeFavoriteRoute = async (userId, routeId) => {
    return dbQueries.removeFavoriteRoute(userId, routeId);
};

// Function to create a new route
const createRoute = async (route) => {
    return dbQueries.createRoute(route);
};

// Function to update a route by ID
const updateRoute = async (id, route) => {
    return dbQueries.updateRoute(id, route);
};

// Function to delete a route by ID
const deleteRoute = async (id) => {
    return dbQueries.deleteRoute(id);
};

module.exports = {
    getAllRoutes,
    getRouteById,
    addFavoriteRoute,
    removeFavoriteRoute,
    createRoute,
    updateRoute,
    deleteRoute,
};
