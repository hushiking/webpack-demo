const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 静态文件与第三方文件资源存放地址
const staticDir = 'static'

// 资源路径 背景图片 音频路径等 传入路径以及文件名 ex img/xxx.png
exports.publicPath = _path => path.posix.join(staticDir, _path)

/**
 * 生成处理不同样式的loader对象，放入数组中
 * @param {Object} options
 * @return {Array}
 */
exports.styleLoader = (options) => {
    options = options || {}
    // 固定的两个loader
    const cssLoader = {
        loader: 'css-loader',
        // 是否生成.map
        options: {
            sourceMap: options.sourceMap
        }
    }
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }
    /**
     * 拼接需要的loader
     * @param {String} loader 各种加载样式的loader名称
     * @return {Array}
     */
    function combineLoaders(loader) {
        const loaders = [cssLoader, postcssLoader]
        if (loader) {
            // 从末尾添加loader，因为loader的执行顺序是从后往前
            loaders.push({
                loader: `${loader}-loader`,
                options: {
                    sourceMap: options.sourceMap
                }
            })
        }
        // 提取样式
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'style-loader',
                publicPath: '../../'
            })
        }
        return ['style-laoder'].concat(loaders)
    }

    // 生成对应loader
    const loaders = {
        css: combineLoaders(),
        less: combineLoaders('less'),
        scss: combineLoaders('scss'),
        sass: combineLoaders('sass')
    }

    const output = []
    // 为不同类型的loader加入正则判断
    for(const key in loaders) {
        const loader = loaders[key]
        // console.log(new RegExp(`\\.${key}$`))
        output.push({
            test: new RegExp(`\\.${key}$`),
            use: loader
        })
    }
    return output
}
