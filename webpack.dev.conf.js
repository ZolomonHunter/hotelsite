const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
const webpack = require('webpack')
const path = require('path')

const devWebpackConfig = merge(baseWebpackConfig,{
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        overlay: true,  
        open: true,
        port: 8081
      },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
        })
    ]
})

module.exports = new Promise((resolve,reject) => {
    resolve(devWebpackConfig)
})



