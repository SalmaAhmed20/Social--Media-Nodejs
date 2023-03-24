const { promisify } = require('util');
const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const { Post } = require('../model/post')
const { Review } = require('../model/review')
const { User } = require('../model/user')
const CustomError = require('../helpers/customerr');
const validator = require('../middleware/validator')
const verify = require('../middleware/review');

const { default: mongoose } = require('mongoose');


router.post("/create", verify.creationVer, validator.vaildateReviewCreation, async (req, res, next) => {

  const { _id, stars,postId } = req.body;
 
  try {
    userId = req.user._id;
    let newReview = new Review({
      _id,
      stars,
      postId,
      userId
    })
    await newReview.save();
    await Post.findByIdAndUpdate({ "_id": postId }, { $push: { "reviews": newReview._id } }, { new: true });
    res.send("review created successfully");
  } catch (err) {
    next(err)
  }
  next()
 
})
router.put("/update/:id", verify.updateVer, validator.vaildateReviewUpdate, async (req, res, next) => {
  try {
    await Review.updateOne({ "_id": req.params.id }, { $set: { "stars": req.body.stars } });
    res.send("review updated successfully");

  }
  catch (err) {
    next(err)
  }
  next()


})
router.delete("/delete/:id", verify.deleteVer, async (req, res, next) => {
  try {
    var review = await Review.findOne({ "_id": req.params.id });
    await Post.findByIdAndUpdate({ "_id": review.postId }, { $pull: { "reviews": review._id } }, { new: true })
    await Review.deleteOne({ "_id": req.params.id });

    res.send("review deleted successfully");

  }
  catch (err) {
    next(err)
  }
  next()


})

module.exports = router;
