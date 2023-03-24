const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        maxLength: 500,
        minLength: 3,
        required: true
    },
    commenterid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    Postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    }
}, {
    collection: 'comments',
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            return ret
        }
    }
});
const comments = mongoose.model("comments", postSchema);
module.exports = comments;