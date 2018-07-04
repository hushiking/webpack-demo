// 路径解析
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('./utils');
const config = require('./config');

// 入口对象
const entries = {}
// 插件数组（多页面应用需要多个插件）
const htmlPlugins = []

config.pageNames.forEach(page => {
    const htmlPlugin = new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: path.join(__dirname, `../src/view/${page}.html`),
        chunks: [page]
    })
    htmlPlugins.push(htmlPlugin)
    entries[page] = path.join(__dirname, `../src/script/${page}.js`)
})

module.exports = {
    // 项目入口
    entry: entries,
    // 输出dist目录
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'static/js/[name].[hash].js'
    },
    module: {
        rules: [ // 兼容webpack1采用的loaders
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /.html$/,
                loader: 'html-loader', // 兼容webpack1采用的loader
                options: {
                    // 标签+属性，不支持link:href script:src
                    attrs: ['img:src', 'audio:src', 'video:src']
                }
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    // 小于100kb将会转换为base64
                    limit: 102400,
                    // 大于100kb的资源输出地址
                    name: utils.publicPath('/img/[name].[hash:8].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 102400,
                    name: utils.publicPath('/media/[name][hash:8].[ext]')
                }
            }
        ]
    },
    plugins: [
        ...htmlPlugins,
        new CopyWebpackPlugin([{
            // 第三方文件目录原始目录
            from: path.join(__dirname, '../static'),
            // 存放到dist目录
            to: 'static',
            // 筛选过滤，复制所有文件，连同文件夹
            ignore: ['.*']
        }])
    ]
}