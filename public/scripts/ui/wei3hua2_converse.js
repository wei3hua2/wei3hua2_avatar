wei3hua2.ui_converse = (function(myPosition) {
    var util = wei3hua2.ui_util;

    var mouthPlain = 'img/mouth_plain.png';
    var mouthOpen = 'img/mouth_open.png';

    var xBuffer = 190;
    var yBuffer = 50;

    var textItem = new Kinetic.Text({
        x : myPosition.x - xBuffer,
        y : myPosition.y - yBuffer,
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

    var mouthImg = new Image();
    var mouthItem;
    var mouthBuffer = {
        x : 83,
        y : 125
    }

    var mainLayer;

    this.init = function(layer) {
        mainLayer = layer;

        util.initImgItem(mouthImg, function(kImage) {
            if(!mouthItem){
                mouthItem = kImage;
                
                textItem.hide();
                layer.add(textItem);
                layer.add(mouthItem);
            }
            layer.draw();
            

        }, mouthPlain, myPosition, mouthBuffer);
    }

    this.talk = function(txt, cb) {
        textItem.setText(txt);
        mouthImg.src = mouthOpen;

        textItem.show();
        mainLayer.draw();

        console.log('this.talk');
        setTimeout(function() {
            if(textItem) {
                console.log('text hide');
                textItem.hide();
                mouthImg.src = mouthPlain;
                mainLayer.draw();
            }
        }, 2000);
        if(cb)
            cb();
    }
});
