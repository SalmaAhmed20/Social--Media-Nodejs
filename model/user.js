let mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { saltRound } = require('../helpers/config');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'creator', 'user'],
        default: 'user'
    },
    imageURL:String
}, {
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            delete ret.__v;
            return ret
        }
    }
}
);
UserSchema.pre('save', async function (next) {
    const user = this;
    console.log(user)
    if (user.isModified('password')) {
        const hashedpassword = await bcrypt.hash(user.password, Number(saltRound));
        user.password = hashedpassword;
    }
    console.log(user)
    next();
})
UserSchema.methods.comparedPassword = function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
}
const User = mongoose.model("Users", UserSchema);
module.exports = { User };