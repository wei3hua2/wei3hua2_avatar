wei3hua2.ui_util = (function() {

    var _loadImg = function(imgObj, cb, myPosition, buffer) {
        
        var buf = buffer || {x:0,y:0};
        
        var image = new Kinetic.Image({
            x : myPosition.x + buf.x,
            y : myPosition.y + buf.y,
            image : imgObj
        });

        cb(image);
    }
    var initImgItem = function(imgObj, cb, imgUrl , myPosition, buffer) {
        imgObj.onload = function() {
            _loadImg(imgObj, cb, myPosition,buffer);
        };
        imgObj.src = imgUrl;
    }
    return {
        initImgItem : initImgItem
    }

})();
