wei3hua2.word_cloud_main_display = (function(wordslist) {
    
    if(!d3 || !d3.layout)throw new Error('d3 undefined');
    
    var fontSize = d3.scale.log().range([10, 100]);
    var svg, background, tagPanel;
    
    var WIDTH = 960, HEIGHT = 600;
    
    var config = {
        tagID : '#word_cloud_content',
        width : WIDTH,
        height : HEIGHT,
        font : 'Impact',
        bgcolor : 'rgba(100,150,0,0.2)',
        rotate : function(tag) { return ~~(Math.random() * 5) * 30 - 60; },
        fontSize : function(tag) { return fontSize(+tag.value); },
        tagPanelPos : "translate(" + [WIDTH >> 1, HEIGHT >> 1] + ")",
        tagTransform : function(d) {return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";},
        tagFill : function(d) {return 'rgb(30,30,90)';},
        clickEvent : function(tagElement){}
    };

    var init = function() {
        svg = d3.select(config.tagID).append("svg")
                .attr("width", config.width).attr("height", config.height);

        background = svg.append("g");
        background.append('rect').attr('width', '100%').attr('height', '100%')
            .style('fill', config.bgcolor);
        
        tagPanel = svg.append("g").attr("transform", config.tagPanelPos);
    }
    
    var progress = function(d){}

    var draw = function(data, bounds) {
        var text = tagPanel.selectAll("text").data(data, function(d) {
            return d.text.toLowerCase();
        });
        
        text.enter().append("text")
            .attr("text-anchor", "middle")
            .attr("transform", config.tagTransform)
            .on("click", config.clickEvent)
            .style("font-size", function(d) {return d.size;})
            .style("opacity", 1.0)
            .style("font-family", function(d) {return d.font;})
            .style("fill", config.tagFill)
            .text(function(d) {return d.text;});
    }

    
    var start = function(wordsList){
        var layout = d3.layout.cloud()
              .size([config.width, config.height])
              .timeInterval(10)
              .text(function(d) { return d.key; })
              .font(config.font)
              .fontSize(config.fontSize)
              .rotate(config.rotate)
              .padding(1)
              .on("word", progress)
              .on("end", draw)
              .words(wordsList)
              .start();
    }
    
    init();
    start(wordslist);
});
