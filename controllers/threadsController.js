const Thread = require('../models/Thread');

// Get all threads
exports.getAllThreads = async (req, res) => {
    try {
        const threads = await Thread.find();
        res.json(threads);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a thread by ID
exports.getThreadById = async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.id);
        if (!thread) return res.status(404).send('Thread not found');
        res.json(thread);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Create a new thread
exports.createThread = async (req, res) => {
    try {
        const newThread = new Thread(req.body);
        const savedThread = await newThread.save();
        res.status(201).json(savedThread);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a thread by ID
exports.updateThread = async (req, res) => {
    try {
        const thread = await Thread.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!thread) return res.status(404).send('Thread not found');
        res.json(thread);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a thread by ID
exports.deleteThread = async (req, res) => {
    try {
        const thread = await Thread.findByIdAndRemove(req.params.id);
        if (!thread) return res.status(404).send('Thread not found');
        res.json({ message: 'Thread deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
