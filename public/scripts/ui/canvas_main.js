wei3hua2.ui = (function(options) {
    var Me = wei3hua2.ui_me,
    canvasWidth = wei3hua2.settings.canvasWidth,
    canvasHeight = wei3hua2.settings.canvasHeight;
    
    var that = this;
    
    var stage = new Kinetic.Stage({
        container : "canvas_container",
        width : canvasWidth,
        height : canvasHeight,
        fill : "#FFD2FF"
    });
    
    var wei3hua2_main = new Me({
        width : canvasWidth,
        height : canvasHeight
    });
    
    this.init = function(){
        initBackground();
        stage.add(wei3hua2_main.getLayer());
        
    }
    
    function initBackground() {
         var bglayer = new Kinetic.Layer();
         bglayer.add(new Kinetic.Rect({
            x : 0,
            y : 0,
            width : canvasWidth,
            height : canvasHeight,
            fill : "#15324E"
        }));
         stage.add(bglayer);
         
         setMainCanvasEvents(bglayer,stage);
    }
    function setMainCanvasEvents(bglayer,stage){
        
        bglayer.on('mousemove', function() {
            wei3hua2_main.updateMouseMovementReaction(stage.getMousePosition());
        });
        
        bglayer.on('mouseover', function() {
            wei3hua2_main.updateBackToCanvasReaction(stage.getMousePosition());
        });
        
        bglayer.on('mouseout', function() {
            wei3hua2_main.updateOutOfCanvasReaction(stage.getMousePosition());
        });

    }
    
    
});
