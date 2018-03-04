const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const pugfiles = './src/views/pages/';
const jsFilesPath = './src/js/';
const all_js_Entry = {};


fs.readdirSync(jsFilesPath).forEach(function(file){
    if(file.match(/.(js|ts)$/)){
        var file_name = file.replace(/.(ts|js)$/, '');
        all_js_Entry[file_name] = jsFilesPath+file;
    }
});


let webpackDevConfig = {
    mode: 'development',
    devtool: 'source-map',
    entry: all_js_Entry,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        watchContentBase: false,
        publicPath: '/',
        overlay: true,
        host: '0.0.0.0',
        // hotOnly: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                exclude: /(node_modules|bower_component)/,
                use: [
                    { loader: 'babel-loader', options: {
                        presets: [
                            ['@babel/preset-env',{
                                debug: false,
                                module: false, 
                                targets: {
                                    browsers: ['last 3 Chrome major versions']
                                },
                            }]
                        ]
                    }},
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
            },{
              test: /\.pug/,
              use: [
                { loader: 'html-loader', options: {} },
                { loader: 'pug-html-loader', options: {
                    pretty: true,
                } },
              ]
            },{
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
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}

module.exports = function(){
    fs.readdirSync(pugfiles).forEach(function(file){
        var file_name = file.replace('.pug','');
        webpackDevConfig.plugins.push(
            new HtmlWebpackPlugin({
                filename: file_name+'.html',
                hash: false, 
                template: './src/views/pages/'+file_name+'.pug'
            })
        );
    });
    return webpackDevConfig;
}
