import { timeout } from './config';
const request = require('request');
const devices = require('puppeteer/DeviceDescriptors');

beforeAll(async () => {
    jest.setTimeout(timeout);
    await page.goto('http://localhost:5000');
});

describe('Backend Testing', () => {
    test('/process/check', async() => {
        request("http://localhost:3000/process/check", (error, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.body)).toEqual("this is /process/check");
        });  
    });

    test('/check1', async() => {
        request("http://localhost:3000/check1", (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual("this is /check1");
        });  
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
        await page.click('#button1');
        const h1res = await page.$('#h1res');
        const html = await page.evaluate(h1res => h1res.innerHTML, h1res); // html=await page.$eval('#h1res', el => el.innerHTML);
        expect(html).toBe("Response : this is /process/check");
    }, timeout);
    
    test('Check1 button works?', async () => {
        await page.click('#button2');
        await page.click('#button2');
        const h1res = await page.$('#h1res');
        const html = await page.evaluate(h1res => h1res.innerHTML, h1res);
    
        expect(html).toBe("Response : this is /check1");
    }, timeout);
});

// describe('Mobile Testing', () => {
//     test('Take screenshot of home page', async () => {
//         await page.setViewport({ width: 1920, height: 1080 });
//         await page.screenshot({
//             path: './screenshots/home.jpg',
//             fullpage: true,
//             type: 'jpeg'
//         });
//     }, timeout);

//     test('Emulate Mobile Device And take screenshot', async () => {
//         await page.goto(`${URL}/login`, {waitUntil: 'domcontentloaded'})
//         const iPhonex = devices['iPhone X'];
//         await page.emulate(iPhonex);
//         await page.setViewport({ width: 375, height: 812, isMobile: true});
//         await page.screenshot({
//             path: './screenshots/home-mobile.jpg',
//             fullpage: true,
//             type: 'jpeg'
//         });
//     }, timeout);
// });


afterAll(()=> {
    page.close();
})


// Running single Test Seperately
        // HEADLESS="false" SLOWMO=100 jest -t 'Intercept Request'

// jestPuppeteer.debug()

// Puppeteer Recorder Chrome extension