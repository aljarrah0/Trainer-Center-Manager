const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('config');

module.exports = {
    entry: './index.js',
    output: {
        //'/home/aljarrah/Desktop/Trainer-Center-Manager/dist'
        path: path.resolve(__dirname, './dist'),
        filename: 'index.app.js',
    }
    ,
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ]
    },
    // optimization: {
    //     minimizer: [new UglifyJsPlugin()],
    //   },
    // plugins:[
    //     new webpack.optimize.UglifyJsPlugin(),
    //    new config.optimization.minimize,

    // ]
}