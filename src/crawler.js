const url = require('url')
const puppeteer = require('puppeteer')

const key = 'HARDSTYLE'
const ViRU = 'https://soundcloud.com/user-133515963/sets'
const playlistsPath = '/users/280407336/playlists_without_albums'

module.exports = () => new Promise(async (resolve, reject) => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setRequestInterception(true)

  page.on('request', req => req.continue())
  page.on('response', async res => {
    const req = res.request()
    const parts = url.parse(req.url)

    if (parts.pathname !== playlistsPath) return
    const query = '&' + parts.query.slice(0, parts.query.indexOf('&'))

    const tracks = (await res.json())
      .collection
      .filter(playlist => playlist.title.includes(key))
      .map(playlist => playlist.tracks.map(track => track.id))
      .reduce((a, b) => a.concat(b))

    await browser.close()
    resolve({ tracks, query })
  })

  try {
    await page.goto(ViRU, { waitUntil: 'networkidle2' })
  } catch (err) {
    // ignored
  }
})
