// routesController.js

const db = require("../db/dbConfig.js");

// Function to get a specific route by ID
const getRouteById = async (req, res) => {
    try {
        const routeId = req.params.id;
        const route = await db.one("SELECT * FROM routes WHERE id=$1", routeId);

        if (!route) {
            return res.status(404).send('Route not found');
        }

        res.json(route);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Function to toggle a route's favorite status
const markAsFavorite = async (req, res) => {
    try {
        const routeId = req.params.id;
        
        // Assuming that the 'routes' table has a boolean column named 'is_favorite' 
        const currentRoute = await db.one("SELECT is_favorite FROM routes WHERE id=$1", routeId);
        
        if (!currentRoute) {
            return res.status(404).send('Route not found');
        }

        const updatedStatus = !currentRoute.is_favorite;
        
        const updatedRoute = await db.one(
            "UPDATE routes SET is_favorite=$1 WHERE id=$2 RETURNING *",
            [updatedStatus, routeId]
        );
        
        res.json(updatedRoute);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getRouteById,
    markAsFavorite
};
