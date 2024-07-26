const catchError = require('../utils/catchError');
const Application = require('../models/Application.models');
const Employee = require('../models/Employee.models');
const { Op } = require('sequelize');

const getAll = catchError(async(req, res) => {
    const {code, description, summary, employeeId} = req.query;
    const where = {};
    if(code) where.code = code;
    if(description) where.description = {[Op.iLike]: `%${description}%`};
    if(summary) where.summary = {[Op.iLike]: `%${summary}%`};
    if(employeeId) where.employeeId = employeeId;
    
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const prePage = parseInt(req.query.prePage) || 10;
    
    const results = await Application.findAll({
        include: [Employee],
        where:where,
        offset: (pageNumber-1)*prePage,
        limit: prePage
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {code, description,  summary} = req.body;
    const result = await Application.create(
        {code, description, summary}
    );
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Application.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Application.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Application.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}