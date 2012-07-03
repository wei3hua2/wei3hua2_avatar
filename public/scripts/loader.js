var wei3hua2 = {
    images : {}
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
        load : ['loader!img/wei3hua2.png','loader!scripts/lib/impress.js']
    }, {
        complete : function() {
            impress().init();
            console.log('complete 2');
            console.log(wei3hua2.images["img/wei3hua2.png"]);
        }
    }]);
}, false);
