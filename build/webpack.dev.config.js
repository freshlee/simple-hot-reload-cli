let webpack = require("webpack");
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webPackDevMiddleWare = require('webpack-dev-middleware'); // 热编译
var webPackHotMiddleWare = require('webpack-hot-middleware'); // 热重载


let baseConfig = require('./webpack.base.config');
let devOption = {
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './src/main.js'
    ],
  },
  output: {
    path: '/',
    // publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/main.html',
      inject: true
    }),
  ]
}

module.exports = function (app) {
  let webpackconfig = Object.assign({}, baseConfig, devOption);// console.log(webpackconfig);
  for (var key in webpackconfig.entry) {
    var entry = webpackconfig.entry[key]
    entry.unshift('./build/client.js')
  }
  console.log(webpackconfig.entry)

  var compiler = webpack(webpackconfig);// console.log(compiler);
  devMiddleWare = webPackDevMiddleWare(compiler, {
    publicPath: webpackconfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
      quiet: true
    }
  })
  hotMiddleWare = webPackHotMiddleWare(compiler, {
    log: () => {
    }
  })
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      console.log('reload')
      hotMiddleWare.publish({ action: 'reload' })
      cb()
    })
  })
  app.use(devMiddleWare);
  app.use(hotMiddleWare);
  return app;
}