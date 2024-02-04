const ppt = require('puppeteer')
const puppeteer = require('puppeteer-extra');
const chromium = require('chrome-aws-lambda');
const pluginStealth = require('puppeteer-extra-plugin-stealth')();
puppeteer.use(pluginStealth);
pluginStealth.setMaxListeners = () => { };
const path = require('path');
const fs = require('fs');
const os = require('os');

/**
 * 
 * @param {{headless: true | false | "new" | "chrome"}} param0 
 */
module.exports = async function ({
    content = "require content",
    log = false,
    url = 'http://localhost:3000',
    headless = "new"
} = {}) {

    // const headless = os.hostname() == "bips-MacBook-Air.local" ? false : "new"
    log && console.log("ini page")
    const browser = await puppeteer.launch({
        executablePath: await chromium.executablePath,
        headless,
        ignoreHTTPSErrors: true,
        args: [`
        --window-size=1280,720`,
            '--no-sandbox'
        ]
    })
    /**
     * @type {ppt.Page}
     */
    const page = (await browser.pages())[0]
    // await page.setDefaultNavigationTimeout(6000);

    log && console.log("set user agent")
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    log && console.log("menuju ke alamat")
    const encodedContent = encodeURIComponent(content);
    console.log(`${url}/generator?content=${encodedContent}`)

    await page.goto(`${url}/generator`);
    await new Promise(r => setTimeout(r, 2000))

    

    log && console.log("mengambil screenshot")
    const screenshotPath = path.join(__dirname, './../../assets/png/gambar.png');
    try {
        // Check if the file exists, and if it does, delete it
        await fs.promises.access(screenshotPath);
        await fs.promises.unlink(screenshotPath);
        log && console.log('Previous screenshot deleted.');
    } catch (error) {
        log && console.log('No previous screenshot found.');
    }

    // Take a screenshot
    log && console.log("menyimpan hasil screenshot")
    await page.screenshot({ path: path.join(__dirname, "./../../assets/png/gambar.png"), type: "png" });

    // Close the browser
    log && console.log("menutup browser")
    await browser.close();
}