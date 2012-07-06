//difference between this and wei3hua2_layer.js lies in the scope
//this class applies to the whole canvas ecosystem, whereas wei3hua2_layer.js
//only applies to avatar 

wei3hua2.avatar = (function(options) {
    var Me = wei3hua2.ui_me,
    NewsPanel = wei3hua2.avatar_news_panel,
    canvasWidth = wei3hua2.settings.canvasWidth,
    canvasHeight = wei3hua2.settings.canvasHeight;
    
    var that = this;
    
    var stage = new Kinetic.Stage({
        container : "canvas_container",
        width : canvasWidth,
        height : canvasHeight,
        fill : "#FFD2FF"
    });
    var bglayer;
    
    var main_options = {
        canvasSize : {
            width : canvasWidth,
            height : canvasHeight
        }
    };
    
    var wei3hua2_main = new Me(main_options);
    
    var news_panel = new NewsPanel();
    
    this.init = function(){
        initBackground();
        stage.add(wei3hua2_main.getLayer());
    }
    
    function initBackground() {
         bglayer = new Kinetic.Layer();
         bglayer.add(new Kinetic.Rect({
            x : 0,
            y : 0,
            width : canvasWidth,
            height : canvasHeight,
            fill : "#15324E"
        }));
         stage.add(bglayer);
         
         that.setMainCanvasEvents();
    }
    this.setMainCanvasEvents = function(){
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
    
    /*this.removeMainCanvasEvents = function(){
        bglayer.off('mousemove');
        bglayer.off('mouseover');
        bglayer.off('mouseout');
    }*/
    
    
    //INTERACTIVE FUNCTIONS
    
    this.talk = function(txt){
        wei3hua2_main.talk(txt);
    }
    this.showSingaporeInfo = function(){
        news_panel.initMap();
        news_panel.updateNews();
        
        wei3hua2.impress_api.next();
    }
    
});
