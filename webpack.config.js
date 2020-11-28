const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
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
                {
                    loader: 'css-loader',
                    options: {sourceMap: true},
                },{
                    loader: 'postcss-loader',
                    options: {sourceMap: true}
                }
            ]
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {sourceMap: true},
                },
                {
                    loader: 'postcss-loader',
                    options: {sourceMap: true}   
                },{
                    loader: 'sass-loader',
                    options: {sourceMap: true},    
                }
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
    }),
        new HtmlWebpackPlugin({
            hash: false,
            template: './src/pages/uikit/index.html',
            filename: 'index.html',
        }),],
    
}