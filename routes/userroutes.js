const { promisify } = require('util');
const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const { User } = require('../model/user')
const validator = require('../middleware/validator')
const { jwtSecret } = require('../helpers/config');
const verify = require('../middleware/verify')
const signJwt = promisify(JWT.sign);
//login first
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
router.get('/', async (req, res, next) => {
  const users = await User.find();
  res.send(users);
})
module.exports = router;
