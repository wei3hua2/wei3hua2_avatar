wei3hua2.ui_converse = (function(myPosition) {
    var util = wei3hua2.ui_util;

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
        cornerRadius : 10
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
                
            textItem.hide();
            layer.add(textItem);
            layer.add(mouthItem);
            
        }, myPosition, mouthBuffer);
    }

    this.talk = function(txt, cb) {
        textItem.setText(txt);
        
        mouthItem.setImage(mouthOpenImg);
        //mouthImg.src = mouthOpen;

        textItem.show();
        mainLayer.draw();

        var handler = setTimeout(function() {
            if(textItem) {
                textItem.hide();
                mouthItem.setImage(mouthPlainImg);
                mainLayer.draw();
            }
        }, 2000);
        
        wei3hua2.pushTimeoutHandler(handler);
        
        if(cb)
            cb();
    }
});
