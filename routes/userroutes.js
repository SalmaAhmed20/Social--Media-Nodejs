const { promisify } = require('util');
const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const { User } = require('../model/user')
const CustomError = require('../helpers/customerr');
const validator = require('../middleware/validator')
const { jwtSecret } = require('../helpers/config');
const verify = require('../middleware/verify')
const signJwt = promisify(JWT.sign);
if (!jwtSecret) throw new CustomError("Something missing")
const checkRequiredField = (params) => (req, res, next) => {
  const receivedParams = Object.keys(req.body);
  console.log(receivedParams)
  const missedParams = params.filter((param) => !receivedParams.includes(param))
  if (missedParams.length) {
    const err = new Error("missing Paramters " + missedParams.join(","));
    err.statusCode = ("400");
    return next(err);
  }
  next();
}
//signup
router.post("/signup", verify, checkRequiredField(['username', 'role', 'password']), async (req, res, next) => {
  if (req.user.role === 'admin') {
    const { username, role, password } = req.body;
    try {
      let createUser = new User({
        username,
        role,
        password
      })
      await createUser.save();
      res.send(createUser);
    } catch (err) {
      next(err)
    }
    next()
  } else {
    try {
      throw new CustomError("invalid Operation", 400);
    } catch (err) {
      next(err);
    }
  }
})
//login
router.post("/login", validator.vaildateSignin, async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new CustomError("invalid Cradentials", 400)
    }
    const isMatched = await user.comparedPassword(password);
    if (!isMatched) {
      throw new CustomError("invalid Cradentials", 400)
    }
    const payload = { id: user._id };
    const token = await signJwt(payload, jwtSecret, { expiresIn: '1h' });
    res.json({
      message: "logged in",
      token,
      user
    })
  } catch (err) {
    next(err)
  }
})
//get all users
router.get('/', verify, async (req, res, next) => {
  if (req.user.role === 'admin') {
    const users = await User.find();
    res.send(users);
  } else {
    try {
      throw new CustomError("invalid Operation", 400);
    } catch (err) {
      next(err);
    }
  }
})
//update user
module.exports = router;
