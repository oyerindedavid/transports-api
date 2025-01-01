const express = require('express');
const { getUsers, addUser, deleteUser } = require('./users.controllers')

const userRoute = express.Router();

userRoute.get('/', getUsers)
userRoute.post('/', addUser)
userRoute.delete('/', deleteUser);

module.exports = userRoute; 