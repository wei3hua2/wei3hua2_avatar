wei3hua2.ui_converse = (function(myPosition) {
    var util = wei3hua2.ui_util;
    var txtUtil = wei3hua2.process_text;

    var mouthPlain = 'img/mouth_plain.png';
    var mouthOpen = 'img/mouth_open.png';

    var mouthPlainImg = wei3hua2.images[mouthPlain];
    var mouthOpenImg = wei3hua2.images[mouthOpen];

    var chatBoxXBuffer = 230;
    var chatBoxYBuffer = 0;

    var textItem = new Kinetic.Text({
        x : myPosition.x - chatBoxXBuffer,
        y : myPosition.y - chatBoxYBuffer,
        stroke : '#555',
        strokeWidth : 3,
        fill : '#ddd',
        text : '',
        fontSize : 15,
        fontFamily : 'Calibri',
        fontStyle : 'normal',
        textFill : '#555',
        width : 220,
        padding : 20,
        align : 'center',
        fontStyle : 'italic',
        shadow : {
            color : 'black',
            blur : 1,
            offset : [10, 10],
            alpha : 0.2
        },
        cornerRadius : 10,
        alpha : 0.0
    });

    var mouthItem;
    var mouthBuffer = {
        x : 83,
        y : 125
    }

    var mainLayer;

    this.init = function(layer) {
        mainLayer = layer;

        util.initImgItem(mouthPlainImg, function(kImage) {
            mouthItem = kImage;
                
            layer.add(textItem);
            layer.add(mouthItem);
            
        }, myPosition, mouthBuffer);
    }

    this.talk = function(txt, cb) {
        var TEXT_DURATION = 4000;
        var txtInParts = breakWordsInParts(txt);
        
        for(var x=0;x<txtInParts.length;x++){
            startTalkingInPart(txtInParts[x],TEXT_DURATION*x+300);
            wei3hua2.pushTimeoutHandler(stopTalkingInPart(TEXT_DURATION*(x+1)));
        }
        
        if(cb)
            cb();
    }
    
    var breakWordsInParts = function(txt){
        var WORDS_PER_PART = 15;
        var words = txtUtil.splitText(txt);
        var parts = [];
        
        var counter = 0, content = '';
        words.forEach(function(w){
            content = content.concat(w+' ');
            counter++;
            if(counter===WORDS_PER_PART){
                counter=0;
                parts.push(content.concat(''));
                content = '';
            }
        });
        parts.push(content);
        
        return parts;
    }
    
    var startTalkingInPart = function(txt, delay){
        return setTimeout(function(){
            textItem.setText(txt);
            
            transitMouth(mouthOpenImg);
            transitTextItem(1.0);
            mainLayer.draw();    
        },delay);
    }
    
    var stopTalkingInPart = function(delay){
        return setTimeout(function(){
            if(textItem) {
                transitTextItem(0.0);
                transitMouth(mouthPlainImg);
                mainLayer.draw();
            }
        },delay);
    }

    
    
    this.showMouth = function(){
        mouthItem.show();
        mouthItem.setImage(mouthPlainImg);
        textItem.show();
        textItem.setAlpha(0.0);
    }
    this.hideMouth = function(){
        mouthItem.hide();
        textItem.hide();
    }

    var transitTextItem = function(alp){
        textItem.transitionTo({
            alpha : alp,
            duration : 0.1
        });
    }
    var transitMouth = function(img){
        mouthItem.setAlpha(0.0);
        mouthItem.setImage(img);
        mouthItem.transitionTo({
            alpha : 1.0,
            duration : 0.1
        });
    }

});
