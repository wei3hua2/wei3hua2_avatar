wei3hua2.ui_me = (function(options){
    
    var canvasSize = options.canvasSize;
    
    var util = wei3hua2.ui_util;
    var converseItemClass = wei3hua2.ui_converse;
    var eyesItemClass = wei3hua2.ui_eyes;
    var bodyItemClass = wei3hua2.ui_body;
    
    var widthBuffer = -80;
    var heightBuffer = -60;
    
    var layer = new Kinetic.Layer();
    
    var converse_item;
    var eyes_item;
    
    var myPosition = {
        x : canvasSize.width / 2 + widthBuffer,
        y : canvasSize.height / 2 + heightBuffer
    }
    
    var body_item = new bodyItemClass(myPosition);

    this.getLayer = function() {
        return layer;
    }
    this.updateMouseMovementReaction = function(mousePos){
        eyes_item.trackMouseLocation(mousePos);
    }
    this.updateBackToCanvasReaction = function(){
        eyes_item.trackMouseLocation();
    }
    this.updateOutOfCanvasReaction = function(){
        eyes_item.trackMouseLocation();
    }
    
    this.talk = function(txt){
        var handler = setTimeout(function(){
            converse_item.talk.apply(this,[txt]);
        },300);
        
        wei3hua2.pushTimeoutHandler(handler,true);
    }
    
    this.turnAngry = function(){
        var starthandler = setTimeout(function(){
            body_item.changeEmotion('angry');
            converse_item.hideMouth();
            eyes_item.hideEyes();
            layer.draw();
        },300);
        
        var endhandler = setTimeout(function() {
            body_item.changeEmotion('normal');
            converse_item.showMouth();
            eyes_item.showEyes();
            layer.draw();
        }, 2000);
        
        wei3hua2.pushTimeoutHandler(starthandler,true);
        wei3hua2.pushTimeoutHandler(endhandler);
    }
    
    
    var _addItemToLayer = function(item){
        layer.add(item);
        
    }
    
    var _setConverseItem = function(imgPos){
        converse_item = new converseItemClass(imgPos);
        converse_item.init(layer);
    }
    
    var _setEyesItem = function(imgPos){
        eyes_item = new eyesItemClass(imgPos);
        eyes_item.init(layer);
    }
    
    body_item.init(layer);
    
    var pos = {x:myPosition.x, y:myPosition.y};
    _setConverseItem(pos);
    _setEyesItem(pos);

});
