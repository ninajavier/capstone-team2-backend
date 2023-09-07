const express = require('express');
const router = express.Router();

const routesController = require('../controllers/routesController');

// Route to get a specific route by ID
router.get('/:id', routesController.getRouteById);

// Route to toggle a route's favorite status
router.post('/:id/favorite', routesController.markAsFavorite);

module.exports = router;
////////////////////////////////////////////////////////////////