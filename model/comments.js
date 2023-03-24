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
        type: Number,
        ref: "posts"
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            delete ret.commenterid.role;
            delete ret.commenterid._id;
            delete ret.commenterid.posts;
            return ret
        }
    }
});
const Comment = mongoose.model("comments", commentSchema);
module.exports = { Comment };