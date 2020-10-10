module.exports = (env, args) => require(args.mode === 'production' ? './config/webpack.prod.js' : './config/webpack.dev.js')
