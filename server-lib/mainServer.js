

/**  helper methods  **/
var createServer = function(express, mainDirectory){
    console.log('dirname : '+mainDirectory);
    var app = express.createServer(express.bodyParser(), express.cookieParser());

    app.configure(function() {
        app.use(express.static(mainDirectory + "/public"));
        app.set('views', mainDirectory + '/views');
        app.set('view engine', 'ejs');
        app.set('layout', false);
    });

    
    return app;
}




module.exports = {
    createServer : createServer
}
