const browserSync = require("browser-sync");
const localtunnel = require('localtunnel');
const config = require("./cli.config");

/* ====================================
    [TODO] * Need to add chalk ...
 ======================================= */
browserSync({
    server: config.dist.export_folder,
    port: config.share.share_port,
});


var tunnel = localtunnel(config.share.share_port, {
        subdomain: config.share.name
    }, function(err, tunnel) {
        if (err) {
            console.log("ERROR ON TUNNEL :'( ")
        }else{
            console.log("Tunnel Running on: "+tunnel.url)
        }
    }
);

tunnel.on('close', function() {
    console.log('Localtunnel :-IS-: closed');
});
