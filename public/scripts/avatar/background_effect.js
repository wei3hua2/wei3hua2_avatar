wei3hua2.ui_background_effect = (function(canvasSize){
    var that = this;
    var bglayer;
    var bgPlane = new Kinetic.Rect({
            x : 0,
            y : 0,
            width : canvasSize.width,
            height : canvasSize.height,
            fill : "#15324E"
    });
    
    bglayer = new Kinetic.Layer();
    bglayer.add(bgPlane);
    
    
    this.changeBackground = function(){
        bglayer.draw();
    }
    
    this.resetToDefault = function(){
        bgPlane.setFill('rgba(0,0,0,0)');
        bglayer.draw();
    }
    
    var generateRandomX = function(){
        return parseInt(Math.random()*canvasSize.width);
    }
    var generateRandomY = function(){
        return parseInt(Math.random()*canvasSize.height);
    }
    var generateRandomFontSize = function(){
        return parseInt(Math.random()*120) + 10;
    }
    
    var setRadiusAroundMe = function(){
        var radiusPos = {
            x : canvasSize.width / 2 + 10,
            y : canvasSize.height / 2 + 50
        };
        
        bgPlane.setFill({
            start: {x: radiusPos.x, y: radiusPos.y, radius:0},
            end: {x: radiusPos.x, y: radiusPos.y, radius:250},
            colorStops: [0, 'yellow', 1.0, 'rgba(0,0,0,0)']
          });
        bglayer.draw();
    }
    
    this.addLayerstoStage = function(stage){
        stage.add(bglayer);
        //stage.add(puzzledLayer);
    }
    
    this.getMainBackgroundLayer = function(){
        return bglayer;
    }
    
    
    /*var puzzledLayer = new Kinetic.Layer();
    var qnMarks = [];
    
    this.showPuzzledBackground = function(){
        var TRANSIT_INTERVAL = 50;
        var length = qnMarks.length;
        
        var i = 0;
        qnMarks.forEach(function(mark){
            var handler = setTimeout(
                function(){transitQnMark(mark);}, 
                i*TRANSIT_INTERVAL);
            
            wei3hua2.pushTimeoutHandler(handler);
            i++;
        });
        
        setTimeout(function() {
            resetQnMark();
        }, (TRANSIT_INTERVAL+1)*length);

    }
    
    var initQnMark = function(){
        _(30).times(function(){
            var txt = new Kinetic.Text({
                x : generateRandomX(),
                y : generateRandomY(),
                fontSize : 10,
                alpha : 0.0,
                textFill : '#ddd',
                text : '?'
            });
            puzzledLayer.add(txt);
            qnMarks.push(txt);
        });
    }
    var transitQnMark = function(mark){
        mark.transitionTo({
            alpha : 1.0,
            scale : 10,
            duration : 0.1
        });
        puzzledLayer.draw();
    }
    var resetQnMark = function(){
        qnMarks.forEach(function(mark){
            mark.setScale(1);
            mark.setAlpha(0.0);
        });
    }
    initQnMark();*/
      
});