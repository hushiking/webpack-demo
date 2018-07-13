const baseWebpack = require('./webpack.config')
const merge = require('webpack-merge')
const config = require('./config')
const utils = require('./utils')
// 一些移动端浏览器不提取样式无法被加载
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(baseWebpack, {
    devtool: 'inline-source-map',
    module: {
        loaders: utils.styleLoader(config.dev),
        devServer: {
            host: config.dev.host,
            port: config.dev.prot
        }
    },
    // plugins: [
    //     new ExtractTextPlugin('static/css/style.css')
    // ]
})