wei3hua2.ui_body = (function(myPosition,stg) {
    var that = this;
    var util = wei3hua2.ui_util;
    var stage = stg;
    
    var imgurl = {
        normal : 'img/wei3hua2.png',
        angry : 'img/wei3hua2_angry.png',
        cute : 'img/wei3hua2_cute.png',
        naked : 'img/wei3hua2_naked.png',
        puzzled : 'img/wei3hua2_puzzled.png',
        shiok : 'img/wei3hua2_shiok.png'
    };
    var kineticImage = {};
    
    var bodyLayer = new Kinetic.Layer();
    var currentEmotion;
    
    this.init = function(cb){
        currentEmotion = 'normal';
        
        for(var x in imgurl){
            kineticImage[x] = util.initImgItemWithoutCallback( 
                wei3hua2.images[imgurl[x]] , myPosition );

            bodyLayer.add(kineticImage[x]);
            kineticImage[x].setAlpha(0.0);
        }
        kineticImage[currentEmotion].setAlpha(1.0);
        kineticImage[currentEmotion].setZIndex(99);
        
        stage.add(bodyLayer);
        
        if(cb)cb();
    }
    
    this.changeEmotion = function(emotion,transit){
        
        if(currentEmotion===emotion)return;
        
        currentEmotion = emotion;
        hideAllBodies();
        changeBody(kineticImage[currentEmotion],transit);
    }
    
    this.getLayer = function(){
        return bodyLayer;
    }
    
    this.getCurrentEmotion = function(){
        return currentEmotion.concat('');
    }
    
    var hideAllBodies = function(){
        for(var x in kineticImage)
            kineticImage[x].setAlpha(0.0);
    }
    var changeBody = function(body,isTransition){
        if(isTransition)
            body.transitionTo({
                alpha : 1.0,
                duration : 0.1
            });
        else{
            body.setAlpha(1.0);
            bodyLayer.draw();
        }
            
    }
    
    
    
});
