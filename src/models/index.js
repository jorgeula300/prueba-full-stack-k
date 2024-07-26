const Employee = require("./Employee.models")
const Application = require("./Application.models")
// un Employee tiene muchas aplicaciones y una aplicasion tiene un empleado
Application.belongsTo(Employee)
Employee.hasMany(Application)