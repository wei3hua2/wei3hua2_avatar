wei3hua2.word_cloud_main_display = (function(cb,options){
    
    if(!d3 || !d3.layout)throw new Error('d3 undefined');
    
    var drawCallback = cb;
    var opt = options || {};
    var fontSize = d3.scale.log().range([10, 100]);
    var svg, background, loadingText, tagPanel;
    
    var WIDTH = 860, HEIGHT = 600;
    
    var cEvent = options.click || function(tagElement){
            $('#twit_list_modal').modal({
                backdrop : false
            });
    };
    
    var config = {
        tagID : '#wordcloud_content',
        width : WIDTH,
        height : HEIGHT,
        font : 'Impact',
        bgcolor : 'rgba(100,150,0,0.2)',
        rotate : function(tag) { return ~~(Math.random() * 5) * 30 - 60; },
        fontSize : function(tag) { return fontSize(+tag.value); },
        tagPanelPos : "translate(" + [WIDTH >> 1, HEIGHT >> 1] + ")",
        tagTransform : function(d) {return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";},
        tagFill : function(d) {return 'rgb(30,30,90)';},
        clickEvent : cEvent,
        mouseOverEvent : function(tagElement){},
        moueOutEvent : function(tagElement){}
    };

    var init = function(){
        
        if($('.word_cloud_canvas'))$('.word_cloud_canvas').remove();
        
        svg = d3.select(config.tagID).append("svg")
                .attr("width", config.width).attr("height", config.height)
                .attr('class', 'word_cloud_canvas');

        background = svg.append("g");
        background.append('rect').attr('width', '100%').attr('height', '100%')
            .style('fill', config.bgcolor);
        loadingText = background.append('text')
            .attr('x', '50%').attr('y', '50%')
            .style('font-family',config.font)
            .style('text-anchor','middle')
            .style('visibility','hidden')
            .style('font-size',70).style('fill', 'rgb(0,0,0)')
            .text('loading..');
        
        tagPanel = svg.append("g").attr("transform", config.tagPanelPos);
    }
    
    
    var defaultProgress = function(d){
        loadingText.text(d.text+'');
    }

    var defaultDraw = function(data, bounds) {
        loadingText.style('visibility','hidden');
        
        var text = tagPanel.selectAll("text").data(data, function(d) {
            return d.text.toLowerCase();
        });
        
        text.enter().append("text")
            .attr("text-anchor", "middle")
            .attr("transform", config.tagTransform)
            .on("click", config.clickEvent)
            .on("mouseover",config.mouseOverEvent)
            .on("mouseout",config.moueOutEvent)
            .style("font-size", function(d) {return d.size;})
            .style("opacity", 1.0)
            .style("cursor","pointer")
            .style("font-family", function(d) {return d.font;})
            .style("fill", config.tagFill)
            .text(function(d) {return d.text;});
            
            
        drawCallback();
    }

    var fn = {
        trackWordCB : opt.trackWordCB || defaultProgress,
        drawCB : opt.drawCB || defaultDraw
    };
    
    var cloud_layout;
    var wordlist
    this.start = function(wordsList){
        init();
        loadingText.style('visibility','visible');
        wordlist = wordsList;
        
        cloud_layout = d3.layout.cloud()
              .size([config.width, config.height])
              .timeInterval(10)
              .text(function(d) { return d.key; })
              .font(config.font)
              .fontSize(config.fontSize)
              .rotate(config.rotate)
              .padding(1)
              .on("word", fn.trackWordCB)
              .on("end", fn.drawCB)
              .words(wordsList)
              .start();
    }
    this.getWordList = function(){
        return wordlist;
    }
});
