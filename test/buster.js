var config = module.exports;

config['server_env'] = {
    rootPath : '../'
    ,environment : 'node'
    ,resources : []
    ,sources : []
    ,tests : ['test/unit/server/*-test.js']
}

config['browser_env'] = {
    rootPath : '../'
    ,environment : 'browser'
    ,resources : [],
     libs : [
     'test/unit/browser/setup_client_env.js',
     'public/scripts/lib/underscore-min.js',
     'public/scripts/lib/d3.v2.js',
     'public/scripts/lib/d3.layout.cloud.js']
    ,sources : ['public/scripts/avatar/contentpanel/wordcloud/process_text.js']
    ,tests : ['test/unit/browser/*-test.js']
}