// add main page files
import './start.ts';
import './vendor.ts';
import './app.ts';

// add css files
import '../css/main.sass';

// offline runtime puglin
import * as OfflinePluginRuntime from 'offline-plugin/runtime';


if(module.hot){
    // module.hot only enable when developoing
	module.hot.accept();
}else{
    // When our site on production.
    OfflinePluginRuntime.install();
}
/*
if (module.hot) {
    const hotEmitter = require("webpack/hot/emitter");
    const DEAD_CSS_TIMEOUT = 2000;

    hotEmitter.on("webpackHotUpdate", function(currentHash) {
        document.querySelectorAll("link[href][rel=stylesheet]").forEach((link) => {
            const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
            const newLink = link.cloneNode();
            newLink.href = nextStyleHref;

            link.parentNode.appendChild(newLink);
            setTimeout(() => {
            	if(link.parentNode){
            		link.parentNode.removeChild(link);
            	}
            }, DEAD_CSS_TIMEOUT);
        });
    })
}
*/
