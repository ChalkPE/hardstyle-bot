const client = require('./client')
const tracks = require('./tracks')
const playlists = require('./playlists')

module.exports = async () => {
  const clientId = await client()
  return tracks(clientId, await playlists(clientId))
}
