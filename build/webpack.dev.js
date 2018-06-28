const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    // entry: path.join(__dirname, '../src/script/index.js'), // 单个入口打包的js文件名字为main.js，css也是main.css
    entry: {
        app: path.join(__dirname, '../src/script/index.js')
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'static/js/[name][hash].js',
        // publicPath: '../../' // 最终输出文件的资源路径
    },
    module: {
        loaders: [
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
                    // 定义css文件使用的背景图路径，在css文件夹外（如若不定义，背景图片资源引用路径错误）
                    // background: url(img/放飞自我.jpg)
                    publicPath: '../../'
                })
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
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
                    // 大于1000kb的资源输出地址
                    name: 'static/img/[name][hash:8].[ext]'
                }
            },
            // 对于audio，video标签这些资源，可以通过html-loader来引入，但如果没有对应的loader来处理这些文件，也会出错
            // 之前已经有图片处理的url-loader，这个loader同样适用于处理媒体资源
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    // 标签+属性 貌似link:href会出错，引入脚本也会出现问题，img，audio，video没有问题
                    attrs: ['img:src', 'audio:src', 'video:src'],
                    interpolate: true
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'static/media/[name][hash:8].[ext]'
                }
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin('static/css/[name][hash].css'),
        new HtmlWebpackPlugin({
            // 打包生成的html文件名，该文件将被放置在输出目录中
            filename: 'index.html',
            // 模板文件，以该文件生成打包后的html文件
            template: path.join(__dirname, '../src/view/index.html')
        }),
        new CopyWebpackPlugin([{
            // 第三方文件目录原始目录
            from: path.join(__dirname, '../static'),
            // 存放dist目录
            to: 'static',
            // 筛选过滤，复制所有文件，连同文件夹
            ignore: ['.*']
        }])
    ]
}