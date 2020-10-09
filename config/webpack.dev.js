const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
const {merge} = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const commonConfig = require('./webpack.common');
const {resolveRoot} = require('./helpers')

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        path: resolveRoot('dist'),
        publicPath: "/",
        filename: 'js/[name].js',
        chunkFilename: "js/[id].chunk.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {loader: 'css-loader', options: {sourceMap: true}},
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'vue-style-loader',
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}}
                ]
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin(),

    ],
    // optimization: {
    //     runtimeChunk: "single",
    //     splitChunks: {
    //         chunks: "all"
    //     }
    // },
    devServer: {
        compress: true,
        historyApiFallback: true,
        hot: true,
        // open: true,
        overlay: true,
        port: 9000,
        stats: {
            normal: true
        }
    }
})
