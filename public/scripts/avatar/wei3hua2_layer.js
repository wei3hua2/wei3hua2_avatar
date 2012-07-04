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
    
    body_item = new bodyItemClass(myPosition);
    
    body_item.init(function(kineticImg){
        _addItemToLayer(kineticImg);
        
        var pos = {x:kineticImg.getX(), y:kineticImg.getY()};
        _setConverseItem(pos);
        _setEyesItem(pos);
    });

});
