const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devWebpackConfig = merge(baseWebpackConfig,{
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        inline: true,
        hot: true,
        contentBase: '/home/bulat/hotelsite/dist',
        overlay: true,  
        open: true,
        port: 8081
      },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
        },
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
        }))
    ]
})

module.exports = new Promise((resolve,reject) => {
    resolve(devWebpackConfig)
})



