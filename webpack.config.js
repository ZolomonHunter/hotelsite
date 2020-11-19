const path = require('path');
const { public } = require('webpack-dev-server/bin/options');

module.exports = {
    entry: {
        main: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "[name].js",
        publicPath: "/dist"
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
      }
}