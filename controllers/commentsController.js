const Comment = require('../models/Comment'); // Assuming you have a model named Comment

// Get all comments
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single comment by ID
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a comment by its ID
exports.updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        let comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        Object.assign(comment, req.body);
        await comment.save();

        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a comment by its ID
exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
