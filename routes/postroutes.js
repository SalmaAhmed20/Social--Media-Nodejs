const { promisify } = require('util');
const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const { Post } = require('../model/post')
const { Review } = require('../model/review')
const { User } = require('../model/user')
const { Comment } = require('../model/comments')
const CustomError = require('../helpers/customerr');
const validator = require('../middleware/validator')
const verify = require('../middleware/post');
const verify2 = require('../middleware/verify');

const { default: mongoose } = require('mongoose');


router.post("/", verify.creationVer, validator.vaildatePostCreation, async (req, res, next) => {

  const { _id, text } = req.body;
  userId = req.user._id
  console.log(userId);
  try {
    let newPost = new Post({
      _id,
      text,
      userId
    })
    await newPost.save();
    //var id =new mongoose.ObjectId(_id);
    //console.log(id);
    //const ObjectId = mongoose.Types.ObjectId;
    //var id =new ObjectId(_id);
    await User.findByIdAndUpdate({ "_id": userId }, { $push: { "posts": newPost._id } }, { new: true });
    res.send("post created successfully");
  } catch (err) {
    next(err)
  }
  next()

})
router.put("/:id", verify.updateVer, validator.vaildatePostUpdate, async (req, res, next) => {
  try {
    await Post.updateOne({ "_id": req.params.id }, { $set: { "text": req.body.text } });
    res.send("post updated successfully");

  }
  catch (err) {
    next(err)
  }
  next()


})
router.delete("/:id", verify.deleteVer, async (req, res, next) => {
  try {
    var post = await Post.findOne({ "_id": req.params.id });
    await User.findByIdAndUpdate({ "_id": post.userId }, { $pull: { "posts": post._id } }, { new: true })
    await Post.deleteOne({ "_id": req.params.id });
    await Review.deleteMany({ "postId": req.params.id })
    await Comment.deleteMany({ "postId": req.params.id })
    res.send("post deleted successfully");

  }
  catch (err) {
    next(err)
  }
  next()


})
router.get("/", verify2, async (req, res, next) => {
  try {
    var users = await User.find();
    console.log(users);
    var posts = await Post.find().populate({ path: "userId" }).populate("commentIds");
    res.send(posts);
  }
  catch (err) {
    next(err)
  }
  next()


})
//Top five rated posts
router.get("/top-five", async (req, res, next) => {
  try {
    const pipeline = [
      {
        $group:
        {
          _id: "$postId",
          averageReviews: { $avg: "$stars" }
        }
      },
      { $sort: { averageReviews: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: '_id',
          as: 'post'
        }
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'postId',
          as: 'reviews'
        }
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'Postid',
          as: 'comments'
        }
      },
      { "$project": { "post_id": "$_id", _id: 0, "post.text": 1, "averageReviews": 1, "reviews.stars": 1, "comments.text": 1 } },
    ];
    var reviews = await Review.aggregate(pipeline).exec();
    res.send(reviews);
  }
  catch (err) {
    next(err)
  }
  next()


})
module.exports = router;
