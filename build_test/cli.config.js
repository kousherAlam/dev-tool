module.exports = {
    project:{
        name: 'frontend',
        port: 4004,
        surge: {
            cname: '',
        },
        gh_pages: {
            repo_url: '',
        }
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
