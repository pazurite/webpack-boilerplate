const HashedModuleIdsPlugin = require('webpack').HashedModuleIdsPlugin;
const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const { resolveRoot } = require('./helpers');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    path: resolveRoot('dist'),
    publicPath: '/',
    filename: 'js/[hash].js',
    chunkFilename: 'js/[id].[hash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: false } },
          { loader: 'sass-loader', options: { sourceMap: false } }
        ]
      }
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    }),
    new HashedModuleIdsPlugin()
  ],
  optimization: {
    runtimeChunk: 'single',
    minimize: false,
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        }
      }),

      new TerserPlugin({
        terserOptions: {
          compress: {
            // turn off flags with small gains to speed up minification
            arrows: false,
            collapse_vars: false, // 0.3kb
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,

            // a few flags with noticeable gains/speed ratio
            // numbers based on out of the box vendor bundle
            booleans: true, // 0.7kb
            if_return: true, // 0.4kb
            sequences: true, // 0.7kb
            unused: true, // 2.3kb

            // required features to drop conditional branches
            conditionals: true,
            dead_code: true,
            evaluate: true
          },
          mangle: {
            safari10: true
          }
        },
        extractComments: false,
        sourceMap: true,
        cache: true,
        parallel: true
      })
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          }
        },
        styles: {
          test: /\.css$/,
          name: 'styles',
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
});
