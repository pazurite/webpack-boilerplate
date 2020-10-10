'use strict';
const HtmlWebPackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const {resolveRoot, genAssetPath, genUrlLoaderOptions} = require('./helpers')


module.exports = {
    entry: {
        main: resolveRoot('src/main.js')
    },
    // shims
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // process is injected via DefinePlugin, although some 3rd party
        // libraries may require a mock to work properly (#934)
        process: 'mock',
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    resolve: {
        alias: {
            '@': resolveRoot('src')
        },
        extensions: [
            ".mjs",
            ".js",
            ".jsx",
            ".vue",
            ".json",
            ".wasm"],
        plugins: [
            PnpWebpackPlugin,
        ],
    },
    resolveLoader: {
        plugins: [
            PnpWebpackPlugin.moduleLoader(module),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [resolveRoot('src')],
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },

            // static assets -----------------------------------------------------------

            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: genUrlLoaderOptions('img')
                    }
                ]
            },

            // do not base64-inline SVGs.
            // https://github.com/facebookincubator/create-react-app/pull/1180
            {
                test: /\.(svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: genAssetPath('img')
                    }
                ]
            },

            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: genUrlLoaderOptions('media')
                    }
                ]
            },

            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: genUrlLoaderOptions('fonts')
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            showErrors: true,
            cache: true,
            template: resolveRoot("public/index.html"),
            filename: resolveRoot('dist/index.html')
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsFilename: resolveRoot('dist/stats.json'),
            statsOptions: {source: false}
        })
        // new Dotenv()
    ],

}
