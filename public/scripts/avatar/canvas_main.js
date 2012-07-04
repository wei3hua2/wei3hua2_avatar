//difference between this and wei3hua2_layer.js lies in the scope
//this class applies to the whole canvas ecosystem, whereas wei3hua2_layer.js
//only applies to avatar 

wei3hua2.avatar = (function(options) {
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
    
    var main_options = {
        canvasSize : {
            width : canvasWidth,
            height : canvasHeight
        }
    };
    
    var wei3hua2_main = new Me(main_options);
    
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
            //fill : "#15324E"
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
    
    
    //INTERACTIVE FUNCTIONS
    
    this.talk = function(txt){
        wei3hua2_main.talk(txt);
    }
    
    // wei3hua2.pushTimeoutHandler(
        // setTimeout(function(){
            // that.talk.apply(this,['Wassup...']);
        // },5000),true);
    
    
});
