const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    // entry: path.join(__dirname, '../src/script/index.js'), // 单个入口打包的js文件名字为main.js，css也是main.css
    entry: {
        index: path.join(__dirname, '../src/script/index.js'),
        index1: path.join(__dirname, '../src/script/index.1.js'),
        index2: path.join(__dirname, '../src/script/index.2.js')
    },
    output: {
        path: path.join(__dirname, '../dist'),
        // 打包后的js文件路径，默认位于dist/下
        filename: 'static/js/[name].[hash].js',
        // 页面引用文件资源的公共路径，拼接到引用资源打包后的路径中
        // publicPath: 'static/'
    },
    module: {
        rules: [ // 兼容属性loaders
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            /* {
                test: /\.css$/,
                // 从右到左执行loader
                use: ['style-loader', 'css-loader']
            } */
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    // 可加入less/sass等loader处理
                    use: ['css-loader', 'postcss-loader'],
                    // 若上述处理顺利，执行style-loader并导出文件
                    fallback: 'style-loader',
                    // 定义css文件使用背景图的路径，如若不定义，默认与url-loader抽取的img资源路径(即name属性值)一致 -> background: url(static/img/放飞自我.jpg)
                    // 抽取的css文件位于static/css/文件夹下，背景图相对路径需要加上../../
                    publicPath: '../../'
                })
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] // 兼容属性loader，
            },
            {
                test: /\.s[ac]ss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    // 小于1000kb将会转换为base64
                    limit: 1024000,
                    // 大于1000kb的资源输出地址(页面img资源src路径，如果不使用服务器请求资源，建议使用相对路径，所有路径相对于dist/,未指定文件路径则默认位于dist目录下面)
                    name: 'static/img/[name].[hash:8].[ext]'
                }
            },
            // 对于img，audio，video标签这些资源，可以通过html-loader来引入，但如果没有对应的loader来处理这些文件，资源不会加载
            // 之前已经有图片处理的url-loader，这个loader同样适用于处理媒体资源
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    // 标签+属性 link:href与script:src会出错，img，audio，video没有问题
                    attrs: ['img:src', 'audio:src', 'video:src'],
                    interpolate: true
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },
                    {
                        loader: 'expose-loader',
                        options: '$'
                    }
                ]
            },
            {
                test: /\.ejs$/,
                use: 'ejs-loader?variable=data'
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        // 抽取css，文件抽取后存放在output输出的dist/static/css下面
        new ExtractTextPlugin('static/css/[name][hash].css'),
        new HtmlWebpackPlugin({
            // 打包后生成的html文件名，该文件将被存放在输出目录中，可以自定义路径
            filename: 'index.html',
            // 模板文件，基于该文件生成打包后的html文件
            template: path.join(__dirname, '../src/view/index.html'),
            // 只提取chunkName为index的入口文件打包生成的js，不设置该项默认提取所有入口文件打包生成的js
            chunks: ['index', 'commons']
        }),
        new CopyWebpackPlugin([{
            // 从第三方文件原始目录复制
            from: path.join(__dirname, '../static'),
            // 存放到dist目录
            to: 'static',
            // 筛选过滤，复制所有文件，连同文件夹
            ignore: ['.*']
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            // 提取公共模块的chunkName，在html-webpack-plugin插件中使用chunkName
            name: 'commons',
            // 生成公共模块文件路径和文件名，[name]为chunkName，即commons
            filename: 'static/js/[name].[hash].js',
            // 模块被引用的最小次数，低于该次数将不被提取
            minChunks: 2
        })
    ]
}