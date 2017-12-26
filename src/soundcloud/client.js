const url = require('url')
const puppeteer = require('puppeteer')

module.exports = () => new Promise(async (resolve, reject) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setRequestInterception(true)

  page.on('request', req => {
    req.continue()
    const sc = url.parse(req.url, true)
    if ('client_id' in sc.query) resolve(sc.query.client_id)
  })

  await page.goto('https://soundcloud.com')
  await browser.close()
  reject(new Error('not found'))
})
