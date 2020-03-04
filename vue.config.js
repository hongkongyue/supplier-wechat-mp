const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
})
console.log(os,'8888888')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const buildMsg = 'build at ' + new Date()

const resolve = dir => {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath:'/',
    productionSourceMap: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
            .set('libs', resolve('src/libs'))
        const jsRule = config.module.rule('js')
        // clear all existing loaders.
        // if you don't do this, the loader below will be appended to
        // existing loaders of the rule.
        jsRule.uses.clear()
        // add replacement loader(s)
        jsRule.use('happypack/loader?id=happy-babel-js').loader('happypack/loader?id=happy-babel-js')
    },
    lintOnSave: false,
    devServer: {
        disableHostCheck: true,
        port: 8050, //端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            '/eop-boot': {
                // target: 'http://localhost:80/',
                //target:'http://172.168.108.66:8080',
                target: 'http://newweb.eptison.com/',
                // pathRewrite: { '^/api': '' },
                changeOrigin: true,
                secure: false
            },
        }
    },
    configureWebpack: {
        plugins: [
            new HtmlWebpackPlugin( {
                template : './public/index.html'
            }),
            new webpack.BannerPlugin(buildMsg),
            new HappyPack({
                id: 'happy-babel-js',
                loaders: ['babel-loader?cacheDirectory=true'],
                threadPool: happyThreadPool,
            })
        ]
    },
    css:{
        sourceMap:false
    }
}