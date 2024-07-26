const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const employeeRoutes = require('./employeeRoutes');
const applicationRoute = require('./aplicationRoutes');

// colocar las rutas aquí
router.use(userRoutes);
router.use(employeeRoutes);
router.use(applicationRoute);


module.exports = router;