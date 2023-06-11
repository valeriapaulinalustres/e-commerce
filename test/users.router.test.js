import './db.js';
import supertest from "supertest";
import { expect } from "chai";
import { faker } from '@faker-js/faker'

const request = supertest("http://localhost:8080");

const mockedUser = {
    first_name: faker.name.firstName(),
    last_name: 'Gomez',
    email: faker.internet.email(),
    age: 25,
    password: '1234'

}
const mockedUser2 ={
    email: 'lau7@gmail.com',
    password: '1234'
}

describe('Testing sessions', function (){
    let cookie;
    it ('Debe registrar bien un usuario', async function (){
        const response = await request.post('/api/users/registro').send(mockedUser)
        console.log(response)
        expect(response.headers.location).to.be.equal('/api/users/registro/success')
    })




    it ('Debe hacer login y devolver una cookie', async function (){
const result = await request.post('/api/users/login').send(mockedUser2)

const cookieResult = result.headers['set-cookie'][0]
//console.log(cookieResult)
expect(cookieResult).to.be.ok
cookie = {
    name: cookieResult.split('=')[0],
    value: cookieResult.split('=')[1]
}
expect(cookie.name).to.be.equal('connect.sid')


    })

    it ('Debe crear token y guardarlo en cookie', async function (){
        const result = await request.get('/api/users/login/success')
        console.log(result)
        const cookieResult = result.headers['set-cookie'][0]
//console.log(cookieResult)
expect(cookieResult).to.be.ok
cookie = {
    name: cookieResult.split('=')[0],
    value: cookieResult.split('=')[1]
}
expect(cookie.name).to.be.equal('token')
    })

    console.log(mockedUser)
})