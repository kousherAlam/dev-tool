const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


// const HelloWebpackPlugin = require("./plugins/HelloWebpackPlugin");

const pugfiles = './src/views/pages/';



let webpackDevConfig = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/js/webpack_main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, './dist'),
        watchContentBase: true,
        publicPath: '/',
        overlay: true,
        port: 3100,
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_component)/,
                use: [
                    { loader: 'babel-loader'},
                ]
            },{
                test: /\.(ts)$/,
                exclude: /(node_modules|bower_component)/,
                use: [
                    { loader: 'babel-loader',},
                    { loader: 'ts-loader' }
                ]
            },{
                test: /\.(css|scss|sass)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: {
                        importLoaders: 1,
                        sourceMap: true
                    }},
                    {loader: 'sass-loader', options: {
                        sourceMap: true,
                    }}
                ]
            }, {
              test: /\.pug/,
              use: [
               { loader: 'html-loader', options: {} },
                { loader: 'pug-html-loader', options: {
                    pretty: true,
                } },
              ]
            },  {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name (file) {
                            return '[path][name].[ext]';
                        }
                    }
                }]
            }
        ]
    },
    plugins: [
        // new HelloWebpackPlugin({options: true}),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:3100/',
                files: [{
                    match: [
                        'dist/*.html',
                        'src/views/**/*.pug',
                    ],
                    fn: function(event, file) {
                        if (event === "change") {
                            const bs = require('browser-sync').get('bs-webpack-plugin');
                            bs.reload();
                        }
                    }
                }]
            },{
                reload: false,
            }
        ),
    ]
}

module.exports = function(){
    fs.readdirSync(pugfiles).forEach(function(file){
        var file_name = file.replace('.pug','');
        webpackDevConfig.plugins.push(
            new HtmlWebpackPlugin({
                filename: file_name+'.html',
                cache: true,
                hash: false,
                template: './src/views/pages/'+file_name+'.pug'
            })
        );
    });
    return webpackDevConfig;
}
