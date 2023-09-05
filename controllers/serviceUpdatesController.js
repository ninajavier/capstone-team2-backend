const ServiceUpdate = require('../models/ServiceUpdate');

// Get all service updates
exports.getAllServiceUpdates = async (req, res) => {
    try {
        const serviceUpdates = await ServiceUpdate.find();
        res.json(serviceUpdates);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a service update by ID
exports.getServiceUpdateById = async (req, res) => {
    try {
        const serviceUpdate = await ServiceUpdate.findById(req.params.id);
        if (!serviceUpdate) return res.status(404).send('Service update not found');
        res.json(serviceUpdate);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Create a new service update
exports.createServiceUpdate = async (req, res) => {
    try {
        const newServiceUpdate = new ServiceUpdate(req.body);
        const savedServiceUpdate = await newServiceUpdate.save();
        res.status(201).json(savedServiceUpdate);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a service update by ID
exports.updateServiceUpdate = async (req, res) => {
    try {
        const serviceUpdate = await ServiceUpdate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!serviceUpdate) return res.status(404).send('Service update not found');
        res.json(serviceUpdate);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a service update by ID
exports.deleteServiceUpdate = async (req, res) => {
    try {
        const serviceUpdate = await ServiceUpdate.findByIdAndRemove(req.params.id);
        if (!serviceUpdate) return res.status(404).send('Service update not found');
        res.json({ message: 'Service update deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
