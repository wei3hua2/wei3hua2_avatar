wei3hua2.ui_body = (function(myPosition) {
    var util = wei3hua2.ui_util;
    
    var imgurl = {
        normal : 'img/wei3hua2.png',
        angry : 'img/wei3hua2_angry.png',
        cute : 'img/wei3hua2_cute.png',
        naked : 'img/wei3hua2_naked.png',
        puzzled : 'img/wei3hua2_puzzled.png',
        shiok : 'img/wei3hua2_shiok.png'
    };
    var kineticImage = {};
    
    var mainLayer;
    
    this.init = function(layer,cb){
        mainLayer = layer;
        
        for(var x in imgurl){
            kineticImage[x] = util.initImgItemWithoutCallback( 
                wei3hua2.images[imgurl[x]] , myPosition );

            mainLayer.add(kineticImage[x]);
            kineticImage[x].hide();
        }
        kineticImage['normal'].show();
        
        if(cb)cb();
    }
    
    this.changeEmotion = function(emotion){
        hideAllBodies();
        kineticImage[emotion].show();
    }
    
    var hideAllBodies = function(){
        for(var x in kineticImage)
            kineticImage[x].hide();
    }
    
    
});
