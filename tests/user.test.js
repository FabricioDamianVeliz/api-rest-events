const User = require('../models/User');
const bcrypt = require('bcrypt');
const {api, getUsers} = require('./helpers');
const mongoose = require('mongoose');
const {server} = require('../index');

beforeEach(async () => {
    await User.deleteMany({});

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash('1234', saltRounds);
    const user = new User({username: 'McLovin', name: 'Fabricio', passwordHash});

    await user.save();
});

describe('creando un nuevo usuario', () => {
    
    test('creación exitosa con un nombre de usuario no existente', async() => {

        const usersAtStart = await getUsers();

        const newUser = {
            
            username: 'McLovin2021',
            name: 'Fabricio', 
            password: '5678'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await getUsers();
        
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creación fallida con un nombre de usuario existente', async() => {

        const usersAtStart = await getUsers();

        const newUser = {
            
            username: 'McLovin',
            name: 'Fabricio', 
            password: '5678'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.errors.username.message).toContain('`username` to be unique');

        const usersAtEnd = await getUsers();

        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
 
})

afterAll(() => {
    mongoose.connection.close();
    server.close();
});