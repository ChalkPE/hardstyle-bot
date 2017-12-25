const crawler = require('./crawler')
const tracker = require('./tracker')

async function run () {
  const info = await crawler()
  const result = await tracker(info)
  return result
}

run()
  .then(res => console.log(res.map(track => track.title).sort()))
  .catch(err => console.error(err))
