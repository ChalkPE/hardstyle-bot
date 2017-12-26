const client = require('./client')
const tracks = require('./tracks')
const playlists = require('./playlists')

module.exports = async () => {
  try {
    const clientId = await client()
    return tracks(clientId, await playlists(clientId))
  } catch (err) {
    return console.error(err) || []
  }
}
