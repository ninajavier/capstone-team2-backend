const dbQueries = require('./queries/serviceUpdates.js');

// Function to get all service updates
const getAllServiceUpdates = async () => {
    return dbQueries.getAllServiceUpdates();
};

// Function to get a service update by ID
const getServiceUpdateById = async (id) => {
    return dbQueries.getServiceUpdateById(id);
};

// Function to create a new service update
const createServiceUpdate = async (update) => {
    return dbQueries.createServiceUpdate(update);
};

// Function to update a service update by ID
const updateServiceUpdate = async (id, update) => {
    return dbQueries.updateServiceUpdate(id, update);
};

// Function to delete a service update by ID
const deleteServiceUpdate = async (id) => {
    return dbQueries.deleteServiceUpdate(id);
};

module.exports = {
    getAllServiceUpdates,
    getServiceUpdateById,
    createServiceUpdate,
    updateServiceUpdate,
    deleteServiceUpdate,
};
