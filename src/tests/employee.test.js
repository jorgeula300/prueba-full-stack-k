const request = require('supertest')
const app = require('../app')
let id;
let token;
let idEmployee;

test('Post/ users debe de crear usuarios', async () => { 

    const user = {
        firstName:"test firstName",
        lastName: "test lastName",
        email:"test@gmail.com",
        password:"test1",
        phone:"100000000",
        gender: "other",
        address: "test test test ets test",
        role:"admin"
    }

    const response = await request(app).post('/users').send(user)
    id = response.body.id
    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined();
    expect(response.body.firstName).toBe(user.firstName);
})

test('Post/ users/login debe iniciar sesion al usuario dando un token de sesion', async () => { 
    const user = {
        email:"test@gmail.com",
        password:"test1"
    }
    const response = await request(app).post('/users/login').send(user)
    token = response.body.token
    expect(response.status).toBe(200)
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe(user.email);
})

test('Get / employees traer todos los empleados', async () => { 
    const response = await request(app).get('/employees').send().set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
})


test('Post / employees', async () => { 
    const employee = {
        date_of_admission:"2024-07-24",
        name:"Test fristName",
        salary: 5500000
    }
    const response = await request(app).post('/employees').send(employee).set('Authorization', `Bearer ${token}`)
    idEmployee = response.body.id
    expect(response.statusCode).toBe(201)
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(employee.name);
})


test('GetOne / employees/:id traer un solo empleado', async () => {
    const response = await request(app).get(`/employees/${idEmployee}`).send().set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBeDefined();
})


test('Put / employees/:id actualizar un empleado', async () => {
    const employee = {
        date_of_admission:"2024-07-24",
        name:"Test fristName",
        salary: 0
    }
    const response = await request(app).put(`/employees/${idEmployee}`).send(employee).set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(employee.name);
})


test('Delete /users/:id debe de eliminar un usuario', async () => {
    const response = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204)
})