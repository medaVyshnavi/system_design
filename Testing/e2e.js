const puppeteer = require('puppeteer');

(async() => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--window-size=1190,788"]
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://namastedev.com/");

  // Set screen size
  await page.setViewport({ width: 1190, height: 788 });
  console.log("my webpage loaded");

  // select the selector where you want to click
  const coursePageSelector = "ul > li:nth-child(2) > a";

  // wait for the selector to come in the page or else we get error -> No element found 
  await page.waitForSelector(coursePageSelector);
  await page.click(coursePageSelector);

  await browser.close()
})();


// automate the whole user journey
// run the script everyday at 08:00 AM - CRON JOB
// collect all logs and errors and send it to mail - Amazon SES