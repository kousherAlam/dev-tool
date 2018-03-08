const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const config = require("./cli.config");

/* =========================================
    [TODO]
        * extractText -> extract css and js
        * postCss for fallback & minify css
        * js minification and polyfill
        * make a dependency graph
        * Image min and image resizer
        * svg optimize
        * Offline support
        * chalk for coloring ..
 =========================================== */

const pugfiles = './src/views/pages/';


let webpackDevConfig = {
    mode: 'production',
    devtool: 'hidden-source-map',
    entry: './src/js/webpack_main.js',
    output: {
        path: path.resolve(__dirname, config.dist.export_folder ),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_component)/,
                use: [
                    { loader: 'babel-loader', options: {
                        presets: [
                            ['@babel/preset-env',{
                                debug: false,
                                module: false,
                            }]
                        ]
                    }},
                ]
            },{
                test: /\.(ts)$/,
                exclude: /(node_modules|bower_component)/,
                use: [
                    { loader: 'babel-loader', options: {
                        presets: [
                            ['@babel/preset-env',{
                                debug: false,
                                module: false,
                            }]
                        ]
                    }},
                    { loader: 'ts-loader' }
                ]
            },{
                test: /\.(css|scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    use: [ 'css-loader', 'sass-loader' ],
                }),
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
        new ExtractTextPlugin('style.css')
    ]
}

module.exports = function(){
    fs.readdirSync(pugfiles).forEach(function(file){
        var file_name = file.replace('.pug','');
        webpackDevConfig.plugins.push(
            new HtmlWebpackPlugin({
                filename: file_name+'.html',
                cache: false,
                hash: true,
                template: './src/views/pages/'+file_name+'.pug'
            })
        );
    });
    return webpackDevConfig;
}
