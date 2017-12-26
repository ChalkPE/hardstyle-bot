require('dotenv').config()

const ms = require('ms')
const twitter = require('./twitter')
const soundcloud = require('./soundcloud')

const error = err => console.error(err)
const log = (...args) => console.log(new Date().toISOString(), ...args)

let tracks = []
const getTrack = () => tracks[Math.floor(Math.random() * tracks.length)]
const tweetTrack = () => twitter(getTrack()).then(track => log(track.title)).catch(error)
const updateTracks = () => soundcloud().then(t => log((tracks = t).length)).catch(error)

updateTracks() && setInterval(updateTracks, ms('2h'))
setTimeout(() => tweetTrack() && setInterval(tweetTrack, ms('5m')), ms('10s'))
