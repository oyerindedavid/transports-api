const express = require('express');
const { getUsers, addUser } = require('./users.controllers')

const userRoute = express.Router();

userRoute.get('/', getUsers)
userRoute.post('/', addUser);

module.exports = userRoute; 