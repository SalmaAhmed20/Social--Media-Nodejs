const express = require('express');
const router = express.Router();
const verify = require('../middleware/verify')
const validator=require('../middleware/validator');
const { Post } = require('../model/post');
const { Comment } = require('../model/comments');

//create comment must be with post id 
router.post('/:Postid',verify,validator.vaildateCommentCreation, async(req,res,next)=>{
    const newComment = new Comment (req.body);
    newComment.commenterid = req.user._id;
    newComment.Postid = req.params.Postid;
    await Post.findByIdAndUpdate({ "_id": req.params.Postid }, { $push: { "commentIds": newComment._id } }, { new: true });

    const result = await newComment.save()
    res.json(result)
})
module.exports = router;
