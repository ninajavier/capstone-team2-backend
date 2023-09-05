const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // assuming you have a User model
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500  // You can adjust the max length as needed.
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    // Uncomment the below if you want to associate the comment with a specific post or content.
    // postId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Post' // replace 'Post' with the appropriate model name if different
    // }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
