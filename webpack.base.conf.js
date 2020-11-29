const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const path = require('path');
const fs = require('fs');



const pages = [];

fs
  .readdirSync(path.resolve(__dirname, 'src', 'pages'))
  .filter((file) => {
    return file.indexOf('base') !== 0;
  })
  .forEach((file) => {
    pages.push(file.split('/', 2));
  });

const htmlPlugins = pages.map(fileName => new HtmlWebpackPlugin({
  getData: () => {
    try {
      return JSON.parse(fs.readFileSync(`./src/pages/${fileName}/data.json`, 'utf8'));
    } catch (e) {
      console.warn(`data.json was not provided for page ${fileName}`);
      return {};
    }
  },
  filename: `${fileName}.html`,
  template: `./src/pages/${fileName}/${fileName}.pug`,
  alwaysWriteToDisk: true,
  inject: 'body',
  hash: true,
}));

module.exports = {
    entry: {
        main: './src/entry.js'
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "[name].js",
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },
        {  
            test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
            }
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
        },
        {
            test: /\.pug$/,
            use: [
              {
                loader: "html-loader"
              },
              {
                loader: "pug-html-loader",
                options: {
                  "pretty":true
                }
              }
            ]
        }
    ]},
    plugins: [new MiniCssExtractPlugin({
        filename: "[name].css"
    }),
    new HtmlWebpackHarddiskPlugin(),
    new HtmlWebpackPlugin({
        filename: "index.html",
        templates: './src/index.pug'
    })].concat(htmlPlugins),
    
}