const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: {
        main: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname,"./dist"),
        filename: "[name].js",
        publicPath: "/dist"
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader"
            ]
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname,'dist'),
        overlay: true,
        open: true
      },
    plugins: [new MiniCssExtractPlugin({
        filename: "[name].css"
    })],
}