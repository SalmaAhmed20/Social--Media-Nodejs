const Joi = require("joi");

const loginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,38}$")).required()
})
const vaildateSignin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        const err = new Error(error.details[0].message);
        err.statusCode = 400;
        return next(err);
    }
    next();
}
//post
const postSchema = Joi.object({
    text: Joi.string().min(3).max(500).required()
})
const vaildatePostCreation = (req, res, next) => {
    const { error } = postSchema.validate(req.body);
    if (error) {
        const err = new Error(error.details[0].message);
        err.statusCode = 400;
        return next(err);
    }
    next();
}
const updatePostSchema = Joi.object({
    text: Joi.string().min(3).max(500).required()
})
const vaildatePostUpdate = (req, res, next) => {
    const { error } = updatePostSchema.validate(req.body);
    if (error) {
        const err = new Error(error.details[0].message);
        err.statusCode = 400;
        return next(err);
    }
    next();
}
module.exports = {
    vaildateSignin,
    vaildatePostCreation,
    vaildatePostUpdate
}