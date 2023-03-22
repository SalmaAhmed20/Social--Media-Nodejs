const express = require('express');
const app = express();
app.use(express.json());
const conn = require('./database/dbConn');
const { port } = require('./helpers/config');
const { User } = require('./model/user');

async function getUsers() {
    
    const lists = await User.find()
    console.log(lists)
}
getUsers()
app.listen(port);