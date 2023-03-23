const express=require('express');
const router = express.Router();
const User = require('../model/user')
router.get('/',async(req,res,next)=>{
    const users = await User.find();
    res.send(users);
})
module.exports = router;
