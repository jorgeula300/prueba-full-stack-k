const { getAll, create, getOne, update, remove } = require('../controllers/Employee.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const employeeRoutes = express.Router();

employeeRoutes.route('/employees')
    .get(verifyJWT,getAll)
    .post(verifyJWT,create);

employeeRoutes.route('/employees/:id')
    .get(verifyJWT,getOne)
    .put(verifyJWT,update)
    .delete(verifyJWT, remove);

module.exports = employeeRoutes;