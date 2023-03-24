const mongoose = require('mongoose');
//var idvalidator = require('mongoose-id-validator');
const postSchema = new mongoose.Schema({
    _id: {
        type: Number,
        
    },
    text: {
         type: String,
         maxLength: 500,
         minLength: 3,
         required: true
        },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },    
},
{
    collection: 'posts'
},
{
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            return ret
        }
    }
}
);

//postSchema.plugin(idvalidator);
const Post = mongoose.model("Posts",postSchema);
module.exports = { Post };