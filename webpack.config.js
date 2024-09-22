const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: { login: ['./js/login.js'], members: ['./js/members.js'], snGenerator: ['./js/snGenerator.js'], miners: ['./js/miners.js'], minerSpeed: ['./js/minerSpeed.js'], withdrawalReq: ['./js/withdrawalReq.js'], common: ['./js/main.js'], api: ['./js/api/getApi.js', './js/api/googleSignIn.js', './js/api/mathFunc.js', './js/api/paginationFunc.js'] },
    output: { path: path.resolve(__dirname, 'dist'), filename: '[name]_module.js', clean: true },
    module: { rules: [{ test: /\.s?css$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] }, { test: /\.js$/, use: ['babel-loader'] }] },
    plugins: [ new HtmlPlugin({ filename: 'index.html', template: './src/index.html', chunks: ['login'] }), new HtmlPlugin({ filename: 'members.html', template: './src/members.html', chunks: ['members', 'common'] }), new HtmlPlugin({ filename: 'snGenerator.html', template: './src/snGenerator.html', chunks: ['snGenerator', 'common'] }), new HtmlPlugin({ filename: 'miners.html', template: './src/miners.html', chunks: ['miners', 'common'] }), new HtmlPlugin({ filename: 'minerSpeed.html', template: './src/minerSpeed.html', chunks: ['minerSpeed', 'common'] }), new HtmlPlugin({ filename: 'withdrawalReq.html', template: './src/withdrawalReq.html', chunks: ['withdrawalReq', 'common'] }), new CopyPlugin({ patterns: [{ from: 'static' }] }) ],
    devServer: { host: 'localhost' }
}