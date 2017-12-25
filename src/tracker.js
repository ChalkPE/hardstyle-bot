const axios = require('axios')
const base = 'http://api.soundcloud.com/tracks?ids='

module.exports = async ({ tracks, query }) => {
  const url = base + tracks.join() + query
  const res = await axios.get(url)
  return res.data
}
