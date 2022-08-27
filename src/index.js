const puppeteer = require('puppeteer-core');
const cheerio = require('cheerio');
const fs = require('fs');

//IIFE
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Users\\R.Okhravi\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
        defaultViewport: {
            width: 500,
            height: 900
        }
    });

    const name = ["reza", "amir", "ali"];
    await fs.writeFileSync(".\\src\\assets\\files\\test.txt", name.join("\r\n"));

    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com/',{waitUntil:'networkidle0'});

    await page.screenshot({ path: '.\\src\\assets\\images\\pages\\test.png', fullPage: true });

    const pageData = await page.evaluate(() => {
        return {
            html: document.documentElement.innerHTML,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    });


    const $ = cheerio.load(pageData.html, {
        ignoreWhitespace: true,
        
    });

    const elemnt = $('#app > div > div > div.landing-window > div.landing-main > div > div._25pwu > div');

    console.log(elemnt.attr('data-ref'));





   // await browser.close();
})();