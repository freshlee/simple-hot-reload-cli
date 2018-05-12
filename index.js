const webpackHotMiddleware = require('webpack-hot-middleware')
let express = require('express')
const fs = require('fs')
let app = express()
let port
let webpackconfig = require('./build/webpack.dev.config')
webpackconfig(app)
app.use(express.static('./static'));
app.get('/', function(req, res, next){
    next();
})
app.listen(3000, () => {
  console.log('热重载启动')
})

