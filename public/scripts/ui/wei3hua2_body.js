wei3hua2.ui_body = (function(myPosition) {
    var util = wei3hua2.ui_util;
    var imgUrl = 'img/wei3hua2.png';
    
    var bodyItem = wei3hua2.images[imgUrl];
    //var bodyItem = new Image();

    this.init = function(cb){
        util.initImgItem(bodyItem, cb, myPosition);
    }
});
