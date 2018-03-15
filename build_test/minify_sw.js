const path = require('path');
const fs = require('fs');

const webpack = require('webpack');


const config = require("./cli.config");
const deploy_path = path.resolve(__dirname, config.dist.export_folder );


let webpackDevConfig = {
    mode: 'production',
    entry: {sw: './dist/sw.js'},
    output: {
        path: path.resolve(__dirname, deploy_path ),
        filename: '[name].js'
    },
    module: {},
    plugins: []
}

module.exports = function(){

    return webpackDevConfig;
}
