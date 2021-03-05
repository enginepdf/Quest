import { timeout } from './config'

beforeAll(async () => {
    jest.setTimeout(timeout)
    await page.goto('http://localhost:5000', {waitUntil: 'domcontentloaded'});
});

describe('Test header and title of the page', () => {
    test('Title of the page', async () => {
        const title = await page.title();
        expect(title).toBe('ClientQ');
    }, timeout);

    test('Are things displayed', async ()=> {
        await page.waitForSelector('button1');
        await page.waitForSelector('button2');
        await page.waitForSelector('button3');
    
        await page.click('button1');
        await page.click('button2');
    })
    
    test('Check button works?', async () => {
        const h1res = await page.$('#h1res');
        await page.click('button1');
        const html = await page.evaluate(h1res => h1res.innerHTML, h1res);
    
        expect(html).toBe("Response : this is /process/check");
    }, timeout);
    
    test('Check1 button works?', async () => {
        const h1res = await page.$('#h1res');
        await page.click('button2');
        const html = await page.evaluate(h1res => h1res.innerHTML, h1res);
    
        expect(html).toBe("Response : this is /check1");
    }, timeout);
});

