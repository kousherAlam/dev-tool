const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const pugfiles = './src/views/pages/';
const jsFilesPath = './src/js/';
const all_js_Entry = [];


fs.readdirSync(jsFilesPath).forEach(function(file){
    if(file.match(/.js$/)){
        all_js_Entry.push(jsFilesPath+file);
    }
});


let webpackDevConfig = {
    mode: 'production',
    entry: all_js_Entry,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_component)/,
                use: [
                     { loader: 'babel-loader', options:{
                        presets: [
                            ['@babel/preset-env',{
                                debug: false,
                                module: false, 
                                targets: {
                                    browsers: ['> 1%']
                                },
                                useBuiltIns: 'usage'
                            }]
                        ]
                     }}
                ]
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    // stylelush
                    {loader: 'sass-loader'}
                ]
            },{
              test: /\.pug/,
              use: [
                { loader: 'html-loader', options: {} },
                { loader: 'pug-html-loader', options: {
                    pretty: true,
                } },
              ]
            },
            {
                test: /\.(png|jpg|gif|svg|pdf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name (file) {
                            return '[hash].[ext]'
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
                hash: true, 
                template: './src/views/pages/'+file_name+'.pug'
            })
        );
    });
    return webpackDevConfig;
}

/* Need to do some ...
    * HMR 
    * Dynamic file compailation and inject into html files ... 
*/