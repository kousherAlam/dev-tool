module.exports = {
    project:{
        name: 'myfrontend',
        port: 4004,
        surge: {
            cname: '',
        },
        gh_pages: {
            repo_url: '',
        }
    },
    pwa: {
        name: 'My PWA',
        short_name: 'MYPWA',
        description: 'My awesome Progressive Web App!',
        background_color: '#ffffff',
        iso_icon: 'src/assests/iso_icon.jpg',
        iso_startup: 'src/assests/iso_startup.jpg',
        android: 'src/assests/android.jpg',
        apple_title: 'APPTITLE',
        apple_bar_color: 'black',
    },
    file_loader: /\.(pdf|doc?x)$/,
    dev: {
        port: 3000,
        sync_proxy_port: 3001,
    },
    dist: {
        export_folder: "dist",
    }
}
