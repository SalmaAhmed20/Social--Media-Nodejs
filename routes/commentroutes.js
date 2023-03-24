const express = require('express');
const router = express.Router();
const verify = require('../middleware/verify')

//create comment must be with post id 
// router.post('/:Postid',verify,async)
module.exports = router;
