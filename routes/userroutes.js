const { promisify } = require('util');
const path = require('node:path');
const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const { User } = require('../model/user')
const CustomError = require('../helpers/customerr');
const validator = require('../middleware/validator')
const { jwtSecret } = require('../helpers/config');
const verify = require('../middleware/verify')
const multer = require('multer');
const { cloudnaryconf, cloudinary } = require('../helpers/cloudnary');
const upload = multer({
  dest: '../uploads/', fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new CustomError('Only images are allowed'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024
  }
});
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
router.get('/profile', verify,
  async (req, res, next) => {
    res.json({
      user: req.user,
      message: "profile page"
    })
  })

//get all users
router.get('/', verify, async (req, res, next) => {
  if (req.user.role === 'admin') {
    const users = await User.find().populate('posts');
    res.send(users);
  } else {
    try {
      throw new CustomError("invalid Operation", 400);
    } catch (err) {
      next(err);
    }
  }
})
//read specific
router.get("/:category", verify, async (req, res) => {
  if (req.user.role === 'admin') {
    let keyval = req.params.category;
    let keyvald = keyval.toString().split("=");
    let list = [];
    if (keyvald[0] == "id") {
      list = await User.findOne({ _id: keyvald[1] }).populate('posts');
    } else if (keyvald[0] == "username") {
      list = await User.findOne({ username: keyvald[1] }).populate('posts');
    }
    else if (keyvald[0] == "role") {
      list = await User.findOne({ role: keyvald[1] }).populate('posts');
    }
    res.json(list)
  } else {
    try {
      throw new CustomError("invalid Operation", 400);
    } catch (err) {
      next(err);
    }
  }
})
//update user by id
router.patch('/:_id', verify, async (req, res, next) => {
  try {
    const updatedUser = '';
    console.log(req.user.role);
    if (!req.body.role || req.user.role == "admin") {
      if (req.user.role == "admin") {
        updatedUser = await User.findByIdAndUpdate({ _id: req.params._id }, req.body, { new: true })
      } else if (req.user._id == req.params._id)
        updatedUser = await User.findByIdAndUpdate({ _id: req.params._id }, req.body, { new: true })
      else
        throw new CustomError("You can't update someone's account");
      res.send(updatedUser);
    } else {
      throw new CustomError("You can't update your role")
    }
  } catch (err) {
    console.log(err)
    return next(err)
  }
})
//delete one
router.delete("/:_id", verify, async (req, res, next) => {
  if (req.user.role == "admin") {
    const result = await User.findOneAndDelete({ _id: req.params._id });
    res.json(result)
  } else {
    try {
      throw new CustomError("invalid Operation", 400);
    } catch (err) {
      next(err);
    }
  }
})
//upload image
router.post('/upload', verify, upload.single('image'), async function (req, res, next) {
  var urls = [];
  const f = req.file;
  const pub = f.filename + "-" + Date.now();
  const result = cloudinary.uploader.upload('../uploads/' + f.filename, { public_id: pub })
  result.then((data) => {
    // console.log(data);
    // console.log(data.secure_url);
  }).catch((err) => {
    console.log(err);
    throw new CustomError("something want wrong");
  });
  // Generate 
  const url = cloudinary.url(pub);
  req.user.imageURL = url
  const updateuser = await User.updateOne({ _id: req.user._id }, req.user, { new: true })
  const { path } = f
  const newPath = url;
  urls.push(newPath);
  res.status(200).json({
    message: "Pic uploaded successfully",
    data: urls,
  })
  next();
})
module.exports = router;
