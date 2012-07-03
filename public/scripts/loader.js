var wei3hua2 = {
    images : {},
    settings : {
        canvasWidth : 900,
        canvasHeight : 550
    }
};

window.addEventListener("load", function() {
    Modernizr.addTest("standalone", function() {
        return (window.navigator.standalone != false);
    });
    // extend yepnope with preloading
    yepnope.addPrefix("preload", function(resource) {
        resource.noexec = true;
        return resource;
    });
    var numPreload = 0, numLoaded = 0;

    yepnope.addPrefix("loader", function(resource) {
        var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
        resource.noexec = isImage;
        numPreload++;
        resource.autoCallback = function(e) {
            numLoaded++;
            if(isImage) {
                var image = new Image();
                
                image.onload = function(){
                    console.log('loaded : '+this.src)
                };
                
                image.src = resource.url;
                wei3hua2.images[resource.url] = image;
            }
        };
        return resource;
    });
    function getLoadProgress() {
        if(numPreload > 0) {
            return numLoaded / numPreload;
        } else {
            return 0;
        }
    }


    Modernizr.load([{
        load : []
    }, {
        complete : function() {console.log('complete 1');}
    }]);

    Modernizr.load([{
        load : [
        'loader!scripts/lib/kinetic-v3.10.2.js',
        
        'loader!img/wei3hua2.png',
        'loader!img/wei3hua2_eyes_normal.png',
        'loader!img/mouth_open.png',
        'loader!img/mouth_plain.png',
        
        'loader!img/glyphicons-halflings.png',
        'loader!img/glyphicons-halflings-white.png',
        'loader!scripts/lib/jquery-1.7.2.min.js',
        'loader!scripts/lib/bootstrap.js',
        
        'loader!scripts/lib/impress.js',
        'loader!scripts/ui/canvas_main.js',
        'loader!scripts/ui/wei3hua2_layer.js',
        'loader!scripts/ui/wei3hua2_converse.js',
        'loader!scripts/ui/wei3hua2_eyes.js',
        'loader!scripts/ui/wei3hua2_body.js',
        'loader!scripts/ui/util.js']
    }, {
        complete : function() {
            //impress().init();
            var cav = new wei3hua2.ui({});
            cav.init();
            
            console.log('complete 2');
        }
    }]);
}, false);
