const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    _id: Number,
    stars: {
        type: Number,
        enum:[1,2,3,4,5],
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    postId:{
        type: Number,
        ref: "Posts",
        required: true
    }
}
    
);

const Review = mongoose.model("Reviews", reviewSchema);
module.exports = { Review };