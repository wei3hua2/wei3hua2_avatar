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
     libs : []
    ,sources : []
    ,tests : ['test/unit/browser/*-test.js']
}