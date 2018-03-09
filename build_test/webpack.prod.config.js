const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require("./cli.config");
const deploy_path = path.resolve(__dirname, config.dist.export_folder );


/* =========================================
    [TODO]
        * Image optimization and resize
            * optimize and resize -> [done]
            * change the file generate path in dist/img folder
        * svg optimize
        * PWA And Offline support
        * make a dependency graph
        * Just show error or success log in one line
 =========================================== */

const pugfiles = './src/views/pages/';


let webpackDevConfig = {
    mode: 'production',
    devtool: 'hidden-source-map',
    entry: './src/js/webpack_main.js',
    output: {
        path: path.resolve(__dirname, deploy_path ),
        filename: '[name].bundle.js'
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
                    use: [
                            'css-loader',
                            'postcss-loader',
                            'sass-loader'
                        ],
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
                test: /\.(gif|svg|pdf|doc?x)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name (file) {
                            return 'img/[name].[ext]';
                        }
                    }
                }]
            },  {
                test: /\.(jpe?g|png)$/,
                use: [
                        { loader: 'responsive-loader', options: {
                            adapter: require('responsive-loader/sharp'),
                            name: '[name]-[width].[ext]',
                            context: deploy_path+"/img",
                            size: 1000,
                            min: 500,
                            max: 3000,
                            steps: 6,
                            quality: 80,
                            placeholder: true,
                            placeholderSize: 50,
                        }}
                    ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin( [config.dist.export_folder] ),
        new ExtractTextPlugin("style.css"),
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
