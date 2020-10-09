// const fs = require('fs')

// const env = process.env.NODE_ENV

// module.exports = env === 'production' ? require('./config/webpack.prod') : require('./config/webpack.dev.js')

const webpackConfig = require('./config/webpack.dev.js')
//
// Object.defineProperty(RegExp.prototype, "toJSON", {
//     value: RegExp.prototype.toString
// });
//
// fs.writeFileSync(`./public/test.json`,JSON.stringify(webpackConfig, null, 4));


module.exports = webpackConfig
