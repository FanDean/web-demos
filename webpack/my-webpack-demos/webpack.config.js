module.exports = {
    //入口文件
    entry: './app.js',
    //出口文件
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    //需要依赖的插件或者是装载器
    module: {
        loaders: [
            {test: /\.css$/, loader:"style-loader!css-loader"} //使用正则表达式匹配所有 css 文件
        ]
    }
}