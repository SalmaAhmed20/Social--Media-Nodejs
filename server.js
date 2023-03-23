const fs = require('fs')
const express = require('express');
var cors = require('cors');
const multer = require('multer')
const conn = require('./database/dbConn'); //connection to database
const { port } = require('./helpers/config'); //getting the information
const userRoutes = require('./routes/userroutes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())
const { cloudnaryconf} = require('./helpers/cloudnary');
app.get('/', (req, res) => {
    res.send('  Welcome to Social Media world \n Login to see the content using /user/login')
})
app.use('/user',userRoutes)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
// 4 parameters error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    console.log('from error handler');
    res.status(err.statusCode).json({
        status: 'error',
        message: err.message || 'something went wrong',
        err
    })
});