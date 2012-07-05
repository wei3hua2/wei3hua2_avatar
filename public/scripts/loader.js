var wei3hua2 = {
    images : {},
    settings : {
        canvasWidth : 900,
        canvasHeight : 300
    },
    impress_api : undefined,
    timeouts : []
};

wei3hua2.pushTimeoutHandler = function(timeout,newAction){
    if(newAction){
        wei3hua2.timeouts.forEach(function(t){
            clearTimeout(t);
        });
        wei3hua2.timeouts = [];
    }
    
    wei3hua2.timeouts.push(timeout);
}


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

                image.onload = function() {
                    //console.log('loaded : '+this.src);
                };

                image.src = resource.url;
                wei3hua2.images[resource.url] = image;
            }
        };
        return resource;
    });
    function progressUpdater() {

        function checkProgress() {
            var p = Math.round((numLoaded / numPreload) * 100);

            var loadingInd = document.getElementById('loading_progress_txt');
            if(loadingInd)
                document.getElementById('loading_progress_txt').innerHTML = p + '%';
            if(p < 100)
                setTimeout(checkProgress, 30);
        }

        checkProgress();
    }

    function directToRootURL(){
        location.hash = '#/progress';
    }


    Modernizr.load([{
        load : ['loader!scripts/lib/my-impress.js']
    }, {
        complete : function() {
            directToRootURL();

            progressUpdater();

            var progress = document.getElementById('progress');
            progress.style.display = 'block';

            impress().init();
            
            console.log('complete 1');
        }
    }]);

    Modernizr.load([{
        load : [
        'loader!scripts/lib/kinetic-v3.10.2.min.js',
        'loader!scripts/lib/jquery-1.7.2.min.js', 
        'loader!scripts/lib/bootstrap.js',
        'loader!scripts/lib/underscore-min.js',
         
        'loader!img/wei3hua2.png', 
        'loader!img/wei3hua2_eyes_normal.png', 
        'loader!img/mouth_open.png', 
        'loader!img/mouth_plain.png', 
        'loader!img/glyphicons-halflings.png', 
        'loader!img/glyphicons-halflings-white.png', 
         
        'loader!scripts/avatar/canvas_main.js', 
        'loader!scripts/avatar/wei3hua2_layer.js', 
        'loader!scripts/avatar/wei3hua2_converse.js', 
        'loader!scripts/avatar/wei3hua2_eyes.js', 
        'loader!scripts/avatar/wei3hua2_body.js', 
        'loader!scripts/avatar/util.js',
        
        
        'loader!scripts/chat/mapper/direct_mapping.js',
        'loader!scripts/chat/mapper/answer_mapping.js',
        'loader!scripts/chat/mapper/similar_suggest_mapping.js',
        
        'loader!scripts/chat/suggest_data_list.js', 
        'loader!scripts/chat/suggest_data.js',
        'loader!scripts/chat/suggests_resolver.js', 
        'loader!scripts/chat/chat_box.js',
         
        'loader!scripts/full_dom_operations.js']
    }, {
        complete : function() {
            try {

                var avatar = new wei3hua2.avatar({});
                avatar.init();

                var chatBox = new wei3hua2.chat_box(avatar);
                chatBox.initEvents();

                performImpressOperation.apply(this, []);

                //TODO
                //wei3hua2.general_dom.initEvents();

                switchLoadingToNormalScreen.apply(this);
            } catch(err) {
                console.log('err : ' + err.stack);
                $('#progress').text('Oh oh... an error has occurred while loading, Please reload the browser');
            }

            console.log('complete 2');
        }
    }]);

    var performImpressOperation = function() {
        wei3hua2.impress_api.removeFirstStep();
        wei3hua2.impress_api.goToFirstStep(1000);
    }
    var switchLoadingToNormalScreen = function() {
        $('#main_avatar_container').show();
        $('#chat_text').focus();
    }
}, false);
