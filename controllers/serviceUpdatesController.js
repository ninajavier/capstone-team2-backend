// serviceUpdatesController.js

const db = require("../db/dbConfig.js");

// Get all service updates
const getAllServiceUpdates = async (req, res) => {
    try {
        const serviceUpdates = await db.any("SELECT * FROM service_updates");
        res.json(serviceUpdates);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a service update by ID
const getServiceUpdateById = async (req, res) => {
    try {
        const serviceUpdateId = req.params.id;
        const serviceUpdate = await db.one("SELECT * FROM service_updates WHERE id=$1", serviceUpdateId);

        if (!serviceUpdate) {
            return res.status(404).send('Service update not found');
        }

        res.json(serviceUpdate);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Create a new service update
const createServiceUpdate = async (req, res) => {
    try {
        // You may need to list out the columns here and match them with req.body's content.
        const newServiceUpdate = await db.one(
            "INSERT INTO service_updates (/* your column names */) VALUES(/* your $ placeholders */) RETURNING *",
            [ /* values from req.body */ ]
        );

        res.status(201).json(newServiceUpdate);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a service update by ID
const updateServiceUpdate = async (req, res) => {
    try {
        const serviceUpdateId = req.params.id;
        const updatedServiceUpdate = await db.one(
            "UPDATE service_updates SET /* your column=value, column2=value2, etc. */ WHERE id=$1 RETURNING *",
            [ /* updated values from req.body, serviceUpdateId */ ]
        );

        if (!updatedServiceUpdate) {
            return res.status(404).send('Service update not found');
        }

        res.json(updatedServiceUpdate);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a service update by ID
const deleteServiceUpdate = async (req, res) => {
    try {
        const serviceUpdateId = req.params.id;
        const deletedServiceUpdate = await db.one("DELETE FROM service_updates WHERE id=$1 RETURNING *", serviceUpdateId);

        if (!deletedServiceUpdate) {
            return res.status(404).send('Service update not found');
        }

        res.json({ message: 'Service update deleted successfully', deletedServiceUpdate });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getAllServiceUpdates,
    getServiceUpdateById,
    createServiceUpdate,
    updateServiceUpdate,
    deleteServiceUpdate
};
