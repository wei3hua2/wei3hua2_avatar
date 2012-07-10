var express = require('express');
var config = require('./config');

var main = require('./server-lib/mainServer');

var port = process.env.PORT || config.DEFAULT_PORT;

var server = main.createServer(express,__dirname);

var _handleMainRequest = function(req, res){
    res.render('main/index', {
        layout : true,
        googleAnalytics : config.GOOGLE_ANALYTICS_ID
    });
}


server.get('/', function(req, res) {
    _handleMainRequest(req, res);
});

server.listen(port, function() {
    console.log("Listening on port : " + port);
});

console.log("APP STARTED!");
