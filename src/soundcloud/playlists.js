const axios = require('axios')
const endpoint = 'https://api.soundcloud.com/users/280407336/playlists'

module.exports = async (client_id) => {
  const params = { client_id }
  const { data } = await axios.get(endpoint, { params })

  return data
    .filter(playlist => playlist.title.includes('HARDSTYLE'))
    .map(playlist => playlist.tracks.map(track => track.id))
    .reduce((a, b) => a.concat(b), [])
}
