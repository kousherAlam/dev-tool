module.exports = {
    project:{
        name: 'font-end',
        surge: {
            cname: '',
        },
        gh_pages: {
            repo_url: '',
        }
    },
    share: {
        name: 'kousher',
        port: 4004
    },
    file_loader: /\.(gif|svg|pdf|doc?x)$/,
    dev: {
        port: 3000,
        sync_proxy_port: 3001,
    },
    dist: {
        export_folder: "dist",
    }
}
