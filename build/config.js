module.exports = {
    // 多页面配置
    pageNames: [
        'index',
        'index.1',
        'index.2'
    ],
    // 开发模式
    dev: {
        sourceMap: true,
        extract: false,
        // 局域网ip
        host: '127.0.0.1',
        // 端口号
        prot: 8888
    },
    // 生产模式
    prod: {
        sourceMap: false,
        extract: true
    }
}