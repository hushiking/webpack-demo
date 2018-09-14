const path = require('path')
const webpack = require('webpack')
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
        }),
        // 多入口文件app采用代码抽取
        new webpack.optimize.CommonsChunkPlugin({
            // 提取公共模块的chunkName，在html-webpack-plugin插件中使用chunkName
            name: 'commons',
            // 生成公共模块文件路径和文件名，[name]为chunkName，即commons
            filename: 'static/js/[name].[hash].js',
            // 模块被引用的最小次数，低于该次数将不被提取
            minChunks: 3
        })
    ]
})