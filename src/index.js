const soundcloud = require('./soundcloud')

soundcloud()
  .then(res => console.log(res))
  .catch(err => console.error(err))
