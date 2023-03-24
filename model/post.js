const mongoose = require('mongoose');
//var idvalidator = require('mongoose-id-validator');
const postSchema = new mongoose.Schema({
    _id: Number,
    text: {
        type: String,
        maxLength: 500,
        minLength: 3,
        required: true
    },

    commentIds: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
},
    {
        toJSON: {
            transform: (doc, ret) => {
                delete ret.__v;
                delete ret.userId.role;
                delete ret.userId._id;
                delete ret.userId.posts;
                return ret
            }
        }
    }
);
postSchema.virtual("info", {
    ref: "Users",
    foreignField: "userId",
    localField: "_id"
});
//postSchema.plugin(idvalidator);
const Post = mongoose.model("Posts", postSchema);
module.exports = { Post };