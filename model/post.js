const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    text: {
         type: String,
         maxLength: 500,
         minLength: 3,
         required: true
        },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },    
},{collection: 'posts'});
const post = mongoose.model("posts",postSchema);
module.exports = post;