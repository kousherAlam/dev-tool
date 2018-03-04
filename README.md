# todo 
	* HTML Reload 
	* Make a production config 
	* split js and css (minify & optimize & hidden-sourcemap)
	* image optimization and generate different resulation images
	* svg optimization 
	* clean dist directory & copy | generate all resources
	* dynamicly change all image srcset

### Here is an Idea
	* webpack for -> js/html/css files and minification 
	* gulp for -> images/font/svg inject srcset assest optimization


# What will be  included 
    * development workflow
        - Css compailation ( PostCSS > SASS > Support pulgins )
        - HTML Compailation > PUG
        - Javascript ( ES6 > TS > Babel )
        - Json Serve And faker for api testing (get/post/put/delete)
        - BrowserSyc
    * Production ( /dist )
        - minification
        - Assets Optimization ( font / svg / images )
        - Easy publish with ( surge / githubpages)
        - No source map on production..
    * Docs 
      - css ( classes and mixins & extends )
      - Pug (layout, mixin and includes )
      - all controlls 

## Controlled by settings
  * Sttings 
    - common settings
  * var/
    - page content data
