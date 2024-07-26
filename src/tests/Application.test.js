const request = require('supertest')
const app = require('../app')
let id;
let token;
let idApplication;

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


test('Get / applications mostrar solicitudes', async () => { 
    const response = await request(app).get('/applications').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array);
})

test('Post /applications debe crear una solicitud', async () => {
    const application = {
        code:"codetest1233",
        description: "test test test",
        summary:"sxdcfvgbhbgffghjnhg",
        employeeId: 3
    }
    const response = await request(app).post('/applications').send(application).set('Authorization', `Bearer ${token}`);
    idApplication = response.body.id
    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined();
    expect(response.body.description).toBe(application.description);
})

test('Get /applications/:id debe mostrar una solicitud', async () => {
    const response = await request(app).get(`/applications/${idApplication}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200)
    expect(response.body.description).toBe("test test test");
})

test('Put /applications/:id debe actualizar una solicitud', async () => {
    const application = {
        code:"codetest1233",
        description: "test test test222",
        employeeId: 3
    }
    const response = await request(app).put(`/applications/${idApplication}`).send(application).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200)
    expect(response.body.description).toBe(application.description);
})


test('Delete /applications/:id debe eliminar una solicitud', async () => {
    const response = await request(app).delete(`/applications/${idApplication}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204)
})



test('Delete /users/:id debe de eliminar un usuario', async () => {
    const response = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204)
})