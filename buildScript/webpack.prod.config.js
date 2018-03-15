const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const TidyHtmlWebpackPlugin = require('tidy-html-webpack-plugin');


const config = require("./cli.config");
const deploy_path = path.resolve(__dirname, '../'+config.dist.export_folder );


/* =========================================
    [TODO]
        * add html beautify .. 
        * code spliting ...
        * Lazy loading ...
        * make a dependency graph
        * ZIP
        * Surge 
        * Github Pages 
        * Create new App .. 
 =========================================== */

const pugfiles = './src/views/pages/';


let webpackDevConfig = {
    mode: 'production',
    devtool: 'hidden-source-map',
    entry: './src/js/webpack_main.js',
    output: {
        path: deploy_path,
        filename: 'js/[name].bundle.js'
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
                test: /\.(pdf|doc?x)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name (file) {
                            return 'files/[name].[ext]';
                        }
                    }
                }]
            },  {
                test: /\.(jpe?g|png|webp)$/,
                use: [
                        { loader: 'responsive-loader', options: {
                            adapter: require('responsive-loader/sharp'),
                            name: 'images/[name]-[width].[ext]',
                            size: 1000,
                            min: 500,
                            max: 3000,
                            steps: 6,
                            quality: 50,
                            placeholder: true,
                            placeholderSize: 50,
                        }}
                    ]
            }, {
                test: /\.(gif|svg|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name (file) {
                                return 'images/[name].[ext]';
                            }
                        }
                    },
                    { loader: 'image-webpack-loader',options: {
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin( [config.dist.export_folder] ),
        new ExtractTextPlugin("css/style.css"),
        new OfflinePlugin({
            ServiceWorker: {
                minify: false
            }
        }),
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

    webpackDevConfig.plugins.push(new WebpackPwaManifest({
            name: config.pwa.name,
            short_name: config.pwa.short_name,
            ios: {
                'apple-mobile-web-app-title': config.pwa.apple_title,
                'apple-mobile-web-app-status-bar-style': config.pwa.apple_bar_color
            },
            inject: true,
            fingerprints: true,
            description: config.pwa.description,
            background_color: config.pwa.background_color,
            icons: [
              {
                src: path.resolve(config.pwa.iso_icon),
                sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                destination: path.join('icons', 'ios'),
                ios: true,
              },
              {
                src: path.resolve(config.pwa.iso_startup),
                size: '1024x1024', // you can also use the specifications pattern
                destination: path.join('icons', 'iosStartup'),
                ios: 'startup'
              },{
                  src: path.resolve(config.pwa.android),
                  sizes: [36, 48, 72, 96, 144, 192, 512],
                  destination: path.join('icons', 'android')
                }
            ]
        }));

    webpackDevConfig.plugins.push(
        new TidyHtmlWebpackPlugin({
          tidy: {
            doctype: 'html5',
            hideComments: false,
            indent: true,
            sortAttributes: 'alpha',
            tabSize: 4,
            wrap: 0
          }
        })
    );

    return webpackDevConfig;
}
