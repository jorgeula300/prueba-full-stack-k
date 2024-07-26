const request = require('supertest')
const app = require('../app')
let id;
let token;


test('Post/ users debe de crear usuarios', async () => { 

    const user = {
        firstName:"test firstName",
        lastName: "test lastName",
        email:"test@gmail.com",
        password:"test1",
        phone:"100000000",
        gender: "other",
        address: "test test test ets test",
        role:"user"
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

test('Get / users debe de traer todos los usuarios ', async () => { 
    const response = await request(app).get('/users').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array);
})

test('Get/ users/:id debe de traer un usuario ', async () => {
    const response = await request(app).get('/users/1').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200)
    expect(response.body.id).toBeDefined();
})


test('Put /users/:id debe de actualizar un usuario', async () => {
    const user = {
        firstName:"test firstName",
        lastName: "test lastName",
        email:"XXXXXXXXXXXXXX",
        password:"XXXXX",
        phone:"100000000",
        gender: "other",
        address: "test test test ets test",
        role:"user"
    }

    const response = await request(app).put(`/users/${id}`).send(user).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200)
    expect(response.body.firstName).toBe(user.firstName);
    expect(response.body.email).toBe(user.email);
})

test('Delete /users/:id debe de eliminar un usuario', async () => {
    const response = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204)
})