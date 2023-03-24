const express = require('express');
const router = express.Router();
const verify = require('../middleware/verify')
const validator = require('../middleware/validator');
const { Post } = require('../model/post');
const { Comment } = require('../model/comments');
const CustomError = require('../helpers/customerr');

//create comment must be with post id 
router.post('/:Postid', verify, validator.vaildateCommentCreation, async (req, res, next) => {
    const newComment = new Comment(req.body);
    newComment.commenterid = req.user._id;
    newComment.Postid = req.params.Postid;

    let post = await Post.findByIdAndUpdate({ "_id": req.params.Postid }, { $push: { "commentIds": newComment._id } }, { new: true });
    if (post) {
        const result = await newComment.save()
        res.json(result)
    } else {
        try {
            throw new CustomError("no such post", 404)
        } catch (err) {
            next(err)
        }
    }
})
router.get('/:Postid', verify, async (req, res, next) => {
    await Post.find({ "_id": req.params.Postid }).populate({ path: "commentIds" }).then(async (data) => {
        res.json(data)
    }).catch(err)
    {
        next(err);
    };
})
router.put('/:commentid', verify, async (req, res, next) => {
    try {
        let comment = await Comment.findOne({ '_id': req.params.commentid });
        console.log(comment.commenterid)
        console.log(req.user._id)
        if (comment.commenterid.equals(req.user._id)) {
            if (!req.body.commenterid) {
                let updatedcomment = await Comment.findByIdAndUpdate({ _id: req.params.commentid }, req.body, { new: true })
                res.send(updatedcomment);
            }
        } else {
            throw new CustomError("You can't update comment not yours")
        }
    } catch (err) {
        next(err)
    }
})
module.exports = router;
