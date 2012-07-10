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
    
    var main_options = {
        canvasSize : {
            width : canvasWidth,
            height : canvasHeight
        },
        stage : stage
    };
    
    var wei3hua2_main;
    
    var news_panel = new NewsPanel();
    
    var bgEffect,bglayer,bodyLayer;
    
    this.init = function(){
        initBackground();
        initAvatar();
        
        that.setMainCanvasEvents();
        
        stage.add(wei3hua2_main.getLayer());
    }
    
    function initBackground() {
         bgEffect = new wei3hua2.ui_background_effect({width:canvasWidth,height:canvasHeight});
         
         bgEffect.addLayerstoStage(stage);
         bgEffect.resetToDefault();
         
         bglayer = bgEffect.getMainBackgroundLayer();
         
    }
    function initAvatar(){
        wei3hua2_main = new Me(main_options);
        bodyLayer = wei3hua2_main.getBodyLayer();
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
        
        bodyLayer.on('mouseover', function(e) {
            wei3hua2_main.turnShiok();
        });
        bodyLayer.on('mouseout', function(e) {
            wei3hua2_main.turnDefault();
        });
        
    }
    
    
    //INTERACTIVE FUNCTIONS
    
    this.talk = function(txt){
        wei3hua2_main.talk(txt);
    }
    this.turnAngry = function(){
        wei3hua2_main.turnAngry();
    }
    this.turnPuzzled = function(){
        wei3hua2_main.turnPuzzled();
    }
    this.turnNaked = function(){
        wei3hua2_main.turnNaked();
    }
    
    this.showWordCloud = function(){
        news_panel.updateWordCloud();
        wei3hua2.impress_api.next();
    }
    
});
