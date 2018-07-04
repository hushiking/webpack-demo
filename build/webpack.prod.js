const path = require('path')
const baseWebpack = require('./webpack.config')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./config')
const rm = require('rimraf')
const utils = require('./utils')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

rm(path.join(__dirname, '../dist'), err => {
    if (err) throw err
})

module.exports = merge(baseWebpack, {
    devtool: 'source-map',
    module: {
        rules: utils.styleLoader(config.prod) // 兼容webpack1采用的loaders
    },
    plugins: [
        new ExtractTextPlugin('static/css/[name][hash].css'),
        new UglifyJsPlugin({
            sourceMap: config.prod.sourceMap
        })
    ]
})