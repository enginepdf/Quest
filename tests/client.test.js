import { timeout } from './config'
// const app=require('../app'); // server on

beforeAll(async () => {
    jest.setTimeout(timeout);
    await page.goto('http://localhost:5000');
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

afterAll(()=> {
    page.close();
})

