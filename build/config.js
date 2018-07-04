module.exports = {
    // 多页面配置
    pageNames: [
        'index',
        // 'demo1',
        // 'demo2'
    ],
    // 开发模式
    dev: {
        sourceMap: true,
        extract: false
    },
    // 生产模式
    prod: {
        sourceMap: false,
        extract: true
    }
}