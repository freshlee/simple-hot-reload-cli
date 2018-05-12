var client = require('webpack-hot-middleware/client?reload=true')
console.log('client', client)
client.subscribe(function (obj) {
  console.log('action', obj)
  if (obj.action === 'reload') {
    console.log('reload..............................')
    window.location.reload()
  }
})