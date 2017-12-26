const prefix = '☣HARDSTYLE IS IIZO.☣ '

const Twit = require('twit')
const T = new Twit({
  consumer_key: process.env.IIZO_CK,
  consumer_secret: process.env.IIZO_CS,
  access_token: process.env.IIZO_AT,
  access_token_secret: process.env.IIZO_ATS
})

module.exports = track => new Promise((resolve, reject) =>
  track ? T.post('statuses/update',
    { status: prefix + track.permalink_url },
    err => err ? reject(err) : resolve(track)) : reject('no track'))
