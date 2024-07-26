const { getAll, create, getOne, remove, update, login } = require('../controllers/User.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const userRoutes = express.Router();

userRoutes.route('/users')
    .get(verifyJWT,getAll)
    .post(create);

userRoutes.route('/users/:id')
    .get( verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

userRoutes.route('/users/login')
    .post(login);

module.exports = userRoutes;