const catchError = require('../utils/catchError');
const User = require('../models/User.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const getAll = catchError(async(req, res) => {
    const {firstName, lastName, email, role, status, gender, phone, address, } = req.query;
    const where = {};
    if(firstName) where.firstName = {[Op.iLike]: `%${firstName}%`};
    if(lastName) where.lastName = {[Op.iLike]: `%${lastName}%`};
    if(email) where.email = {[Op.iLike]: `%${email}%`};
    if(role) where.role = role;
    if(status) where.status = status;
    if(gender) where.gender = gender;
    if(phone) where.phone = phone;
    if(address) where.address = {[Op.iLike]: `%${address}%`};
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const prePage = parseInt(req.query.prePage) || 10;



    const results = await User.findAll({
        where,
        offset: (pageNumber-1)*prePage,
        limit: prePage
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {firstName, lastName, email, password, role, status, gender, phone, address } = req.body;
    const lowerCaseEmail = email.toLowerCase(); 
    const encriptedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({firstName, lastName, email: lowerCaseEmail, password: encriptedPassword, role, status, gender, phone, address});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    const { email, password } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    const user = await User.findOne({ where: {email: lowerCaseEmail} });
    if(!user) return res.sendStatus(401).json({ error: "Invalid credentials" });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) return res.sendStatus(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    return res.json({user, token });
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}