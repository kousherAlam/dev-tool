const fs = require('fs');

const browserSync = require("browser-sync");
const localtunnel = require('localtunnel');

const config = require("./cli.config");

/* ====================================
    [TODO]  * Need to add chalk ...
            * Need to check dist folder existance ...
 =======================================
 */

if (fs.existsSync('./'+config.dist.export_folder)) {
    browserSync({
        server: './'+config.dist.export_folder,
        port: config.project.port,
    });
    var tunnel = localtunnel( config.project.port , {
            subdomain: config.project.name
        }, function(err, tunnel) {
            if (err) {
                console.log("ERROR ON TUNNEL :'( ", err);
            }else{
                console.log("Tunnel Running on: "+tunnel.url);
            }
        }
    );
    tunnel.on('close', function() {
        console.log('Localtunnel :-IS-: closed');
    });
} else {
    console.log('Directory not exists.');
    console.log('RUN: npm run deploy');
}

