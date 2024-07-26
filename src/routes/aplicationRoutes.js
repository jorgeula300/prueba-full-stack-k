const { getAll, create, getOne, remove, update } = require('../controllers/Application.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const applicationRoute = express.Router();

applicationRoute.route('/applications')
    .get(verifyJWT,getAll)
    .post(verifyJWT,create);

applicationRoute.route('/applications/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = applicationRoute;