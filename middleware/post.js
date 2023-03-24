const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const { promisify } = require('util');
const verifyJwt = promisify(JWT.verify);
const { User } = require("../model/user");
const { jwtSecret } = require('../helpers/config');

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
        if (user.role !== "creator"){
            const error = new Error("unauthorized");
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
        var posts = mongoose.model('Posts');
        let post = await posts.findOne({_id:req.params.id})
        if(!post){
            const error = new Error("invalid post id");
            error.statusCode = 401;
            return next(error);
        }
        
        if(!post.userId.equals(user._id)){
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
        var posts = mongoose.model('Posts');
        let post = await posts.findOne({_id:req.params.id})
        if(!post){
            const error = new Error("invalid post id");
            error.statusCode = 401;
            return next(error);
        }
        
        if(!post.userId.equals(user._id )){
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
    deleteVer
}