var webpack = require('webpack');
var path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm

module.exports = {
    entry: "./app/index.js",
    devtool: "source-map",
    output: {
        path: path.resolve('dist'),
        filename: "bundle.js",
        publicPath: '/dist/'
    },
    module: {
        loaders: [
           { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve('dist')])
    ],
    devServer: {
     proxy: {
       '/api': {
         target: 'http://localhost:3000/',
         secure: false
       }
     }
   }
};