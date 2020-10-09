const path = require('path')

const _root = path.resolve(__dirname, '..');

const inlineLimit = 4096


exports.genAssetPath = dir => `${dir}/[name].[hash:8].[ext]`

exports.resolveRoot = function (...args) {
    return path.join(_root, ...args)
}

exports.genUrlLoaderOptions = dir => ({
    esModule: false,
    limit: inlineLimit, // Convert images < 4kb to base64 strings
    fallback: {
        loader: 'file-loader',
        options: {
            name: this.genAssetPath(dir)
        }
    }
})
