import { timeout } from './config';
const request = require('supertest');
const app=require('../app');

let server;

beforeAll(async (done) => {
    jest.setTimeout(timeout);
    await page.goto('http://localhost:5000');
    server=app.listen(done);
});

describe('Backend Testing', () => {
    test('/process/check', async() => {
        const response=await request(app).get("/process/check");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual("this is /process/check");
    });

    test('/check1', async() => {
        const response=await request(app).get("/check1");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual("this is /check1");
    });
});

describe('Frontend testing', () => {
    test('Check the title of the page and if things displayed', async () => {
        const title = await page.title();
        expect(title).toBe('ClientQ');
        await page.waitForSelector('#button1');
        await page.waitForSelector('#button2');
        await page.waitForSelector('#button3');
    }, timeout);
    
    test('Check button works?', async () => {
        await page.click('#button1');
        await page.waitFor(1);
        const h1res = await page.$('#h1res');
        const html = await page.evaluate(h1res => h1res.innerHTML, h1res);
        expect(html).toBe("Response : this is /process/check");
    }, timeout);
    
    test('Check1 button works?', async () => {
        await page.click('#button2');
        await page.waitFor(1);
        const h1res = await page.$('#h1res');
        const html = await page.evaluate(h1res => h1res.innerHTML, h1res);
    
        expect(html).toBe("Response : this is /check1");
    }, timeout);
});


afterAll(async (done)=> {
    page.close();
    await server.close(done);
})