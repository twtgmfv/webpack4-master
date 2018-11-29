const {resolve} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = {
    context:resolve(__dirname,'./'),
    entry:'./src/index.js',
    output:{
        path:resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module: {
        rules: [
            {
                test:/\.s?[ac]ss$/,
                use:[ MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader']
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        /*在`plugins`配置项中需要增加的插件设置，注意这里不能写[hash]，否则无法实现热跟新，如果有hash需要，可以开发环境和生产环境分开配置*/
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),


        /*在`plugins`配置项中需要增加的插件设置*/
        new OptimizeCSSPlugin({
            cssProcessorOptions: {safe: true}
        }),

        new ParallelUglifyPlugin({
            uglifyJS: {},
            test: /.js$/g,
            include: [],
            exclude: [],
            cacheDir: '',
            workerCount: '',
            sourceMap: false
        })
    ]
}