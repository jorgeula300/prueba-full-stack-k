const catchError = require('../utils/catchError');
const Employee = require('../models/Employee.models');
const { Op } = require('sequelize');


const getAll = catchError(async(req, res) => {
    const {name, salary, date_of_admission } = req.query;
    const where = {};
    if(name) where.name = {  [Op.iLike]: `%${name}%` };
    if(salary) where.salary = salary;
    if(date_of_admission) where.date_of_admission = date_of_admission;
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const prePage = parseInt(req.query.prePage) || 10;
    const results = await Employee.findAll({
        where,
        offset: (pageNumber-1)*prePage,
        limit: prePage
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {date_of_admission, name, salary} = req.body;
    const result = await Employee.create(
        {date_of_admission, name, salary}
    );
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Employee.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Employee.destroy({ where: {id} });
    return res.sendStatus(204);
});




const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { date_of_admission, name, salary } = req.body;
    const getMe = req.user
    if(getMe.role !== 'admin') return res.sendStatus(403).json({message: "you cannot modify an employee"});
    const result = await Employee.update(
        { date_of_admission, name, salary },
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    update,
    remove
}