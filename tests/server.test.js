import { timeout } from './config';
const request = require('supertest');
const app=require('../app');


let server;

beforeAll(async (done) => {
    jest.setTimeout(timeout);
    server=app.listen(done);
});

describe('Backend Testing', () => {
    test('/process/check', async() => {
        const response=await request(server).get("/process/check");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual("this is /process/check");
    });

    test('/check1', async() => {
        const response=await request(server).get("/check1");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual("this is /check1");
    });
});

afterAll((done)=> {
    server.close(done);
})