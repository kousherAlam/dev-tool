const webpack = require("webpack");
const browserSync = require("browser-sync");
module.exports = function(source){
    console.log('Ok my loader working...');
    return source;
}
