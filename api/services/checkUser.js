const puppeteer = require('puppeteer');

const endpointURL = "https://twitter.com/"

module.exports = {
    check: async function (user) {

        if (!user || user.length === 0){
            return "empty";
        }

        const browser = await puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
        });
        const page = await browser.newPage();

        await page.goto(endpointURL + user);

        try {
            await page.waitForFunction(
                () => document.querySelectorAll('[data-testid=emptyState]').length == 1, 
                {timeout: 5000}
            );
            await browser.close();
            return false
        } catch {
            await browser.close();
            return true
        }
    }
}
