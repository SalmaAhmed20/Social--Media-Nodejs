const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const { promisify } = require('util');
const verifyJwt = promisify(JWT.verify);
const { User } = require("../model/user");
const { Post } = require("../model/post");
const { jwtSecret } = require('../helpers/config');

async function readVer (req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            const error = new Error("unauthorized");
            error.statusCode = 401;
            return next(error);
        }
        const { id } = await verifyJwt(token, jwtSecret);
        const user = await User.findById(id)
        if (!user) {
            const error = new Error("unauthorized");
            error.statusCode = 401;
            return next(error);
        }
        var post = await Post.findById(req.params.postId);
        console.log(post)
        if(!post){
            const error = new Error("post is not found");
            error.statusCode = 401;
            return next(error);
        }
        req.post = post;
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
}
//create
async function creationVer (req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            const error = new Error("unauthorized");
            error.statusCode = 401;
            return next(error);
        }
        const { id } = await verifyJwt(token, jwtSecret);
        const user = await User.findById(id)
        if (!user) {
            const error = new Error("unauthorized");
            error.statusCode = 401;
            return next(error);
        }
        if (user.role !== "user"){
            const error = new Error("unauthorized");
            error.statusCode = 401;
            return next(error);
        }
        var post = await Post.findById(req.body.postId)
        console.log(post)
        if(!post){
            const error = new Error("post is not found");
            error.statusCode = 401;
            return next(error);
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
}
//update 
async function updateVer (req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            const error = new Error("unauthorized");
            error.statusCode = 401;
            return next(error);
        }
        const { id } = await verifyJwt(token, jwtSecret);
        const user = await User.findById(id)
        if (!user) {
            const error = new Error("unauthorized");
            error.statusCode = 401;
            return next(error);
        }
        var reviews = mongoose.model('Reviews');
        let review = await reviews.findOne({_id:req.params.id})
        if(!review){
            const error = new Error("review not found");
            error.statusCode = 401;
            return next(error);
        }
        if(!review.userId.equals(user._id)){
            const error = new Error("unauthorized user");
            error.statusCode = 401;
            return next(error);
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
}
//delete
async function deleteVer (req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            const error = new Error("unauthorized");
            error.statusCode = 401;
            return next(error);
        }
        const { id } = await verifyJwt(token, jwtSecret);
        const user = await User.findById(id)
        if (!user) {
            const error = new Error("unauthorized");
            error.statusCode = 401;
            return next(error);
        }
        var reviews = mongoose.model('Reviews');
        let review = await reviews.findOne({_id:req.params.id})
        if(!review){
            const error = new Error("invalid review id");
            error.statusCode = 401;
            return next(error);
        }
        
        if(!review.userId.equals(user._id )){
            if(user.role !== "admin"){
                const error = new Error("unauthorized user");
                error.statusCode = 401;
                return next(error);
            }
           
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
}
module.exports = {
    creationVer,
    updateVer,
    deleteVer,
    readVer
}