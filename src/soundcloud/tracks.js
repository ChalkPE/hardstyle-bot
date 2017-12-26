const axios = require('axios')
const endpoint = 'http://api.soundcloud.com/tracks'

async function fetchTracks (client_id, tracks) {
  if (tracks.length === 0) return []
  const [now, next] = [tracks.slice(0, 50), tracks.slice(50)]

  const params = { client_id, ids: now.join(',') }
  const { data } = await axios.get(endpoint, { params })

  return data
    .filter(track => track.kind === 'track')
    .concat(await fetchTracks(client_id, next)) // caution: recursive
}

module.exports = fetchTracks
