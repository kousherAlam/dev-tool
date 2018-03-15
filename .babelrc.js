module.exports = {
	presets: [
        ['@babel/preset-env',{
            debug: false,
            module: false, 
            targets: {
                browsers: ['last 5 Chrome major versions']
            },
            // useBuiltIns: 'usage'
        }]
    ],
    // plugins: ["@babel/plugin-transform-runtime"]

}