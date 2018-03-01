const path = require('path');
const webpack = require('webpack');


module.exports = {
    mode: 'development',
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: 'app.bundle.js',
        publicPath: '/js/'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        watchContentBase: false,
        publicPath: '/js/',
        hotOnly: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}