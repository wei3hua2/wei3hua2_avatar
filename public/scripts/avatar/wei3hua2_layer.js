wei3hua2.ui_me = (function(options){
    var that = this;
    var canvasSize = options.canvasSize;
    var stage = options.stage;
    
    var util = wei3hua2.ui_util;
    var converseItemClass = wei3hua2.ui_converse;
    var eyesItemClass = wei3hua2.ui_eyes;
    var bodyItemClass = wei3hua2.ui_body;
    
    var widthBuffer = -80;
    var heightBuffer = -40;
    
    var layer = new Kinetic.Layer();
    
    var converse_item;
    var eyes_item;
    
    var myPosition = {
        x : canvasSize.width / 2 + widthBuffer,
        y : canvasSize.height / 2 + heightBuffer
    }
    
    var body_item = new bodyItemClass(myPosition,stage);

    this.getLayer = function() {
        return layer;
    }
    this.getBodyLayer = function(){
        return body_item.getLayer();
    }
    this.isBodySensitiveArea = function(x,y){
        var s = body_item.sensitiveArea;
        return (s.startx < x && s.endx > x && s.starty < y && s.endy > y);
    }
    this.updateMouseMovementReaction = function(mousePos){
        eyes_item.trackMouseLocation(mousePos);
    }
    this.updateBackToCanvasReaction = function(mousePos){
        eyes_item.trackMouseLocation();
    }
    this.updateOutOfCanvasReaction = function(){
        eyes_item.trackMouseLocation();
    }
    
    this.talk = function(txt){
        if(body_item.getCurrentEmotion()==='normal'){
            var handler = setTimeout(function(){
                converse_item.talk.apply(this,[txt]);
            },300);
            
            wei3hua2.pushTimeoutHandler(handler,true);    
        }
    }
    
    this.turnAngry = function(){
        var starthandler = setTimeout(function(){
            body_item.changeEmotion('angry');
            converse_item.hideMouth();
            eyes_item.hideEyes();
            layer.draw();
        },300);
        
        var endhandler = setTimeout(function() {
            that.turnDefault();
        }, 3000);
        
        wei3hua2.pushTimeoutHandler(starthandler,true);
        wei3hua2.pushTimeoutHandler(endhandler);
    }
    
    this.turnPuzzled = function(){
        var starthandler = setTimeout(function(){
            body_item.changeEmotion('puzzled');
            converse_item.hideMouth();
            eyes_item.hideEyes();
            layer.draw();
        },300);
        
        var endhandler = setTimeout(function() {
            that.turnDefault();
        }, 2000);
        
        wei3hua2.pushTimeoutHandler(starthandler,true);
        wei3hua2.pushTimeoutHandler(endhandler);
    }
    
    this.turnShiok = function(){
        body_item.changeEmotion('shiok');
        converse_item.hideMouth();
        eyes_item.hideEyes();
        layer.draw();
    }
    this.turnNaked = function(){
        var starthandler = setTimeout(function() {
            body_item.changeEmotion('naked',true);
            converse_item.hideMouth();
            eyes_item.hideEyes();
            layer.draw();
        },300);
        wei3hua2.pushTimeoutHandler(starthandler,true);
        
        var endhandler = setTimeout(function() {
            that.turnDefault();
        }, 3000);
        wei3hua2.pushTimeoutHandler(endhandler);
    }
    this.turnDefault = function(){
        body_item.changeEmotion('normal');
        converse_item.showMouth();
        eyes_item.showEyes();
        layer.draw();
    }
    
    var _setConverseItem = function(imgPos){
        converse_item = new converseItemClass(imgPos);
        converse_item.init(layer);
    }
    
    var _setEyesItem = function(imgPos){
        eyes_item = new eyesItemClass(imgPos);
        eyes_item.init(layer);
    }
    
    body_item.init();
    
    var pos = {x:myPosition.x, y:myPosition.y};
    _setConverseItem(pos);
    _setEyesItem(pos);

});
