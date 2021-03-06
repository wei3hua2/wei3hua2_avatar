wei3hua2.word_cloud = (function() {
    
    var wordCloudID = '#word_cloud_content';
    
    var w = 960,
    h = 600;
    
    var svg, background, vis;
    
    var startWordCloud = function(wordsList){
        initWordCloud();
        var fontSize = d3.scale.log().range([10, 100]);

        var layout = d3.layout.cloud()
              .size([960, 600])
              .timeInterval(10)
              .text(function(d) { return d; })
              .font("Impact")
              .fontSize(function(d) { console.log('dr:'+d.value+' , '+fontSize(+d.value)); return fontSize(+d.value); })
              .rotate(function(d) { return ~~(Math.random() * 5) * 30 - 60; })
              .padding(1)
              .on("word", progress)
              .on("end", draw)
              .words(wordsList)
              .start();
    }
    
    var initWordCloud = function(){
        svg = d3.select(wordCloudID).append("svg")
                    .attr("width", w)
                    .attr("height", h);
        
        background = svg.append("g"),
        vis = svg.append("g")
            .attr("transform", "translate(" + [w >> 1, h >> 1] + ")");
            
        background.append('rect')
            .attr('width', '100%').attr('height', '100%')
            .style('fill','rgba(0,0,0,0.2)');
    }
    
    function draw(data, bounds) {
          scale = bounds ? Math.min(
              w / Math.abs(bounds[1].x - w / 2),
              w / Math.abs(bounds[0].x - w / 2),
              h / Math.abs(bounds[1].y - h / 2),
              h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;
          words = data;
          
          var text = vis.selectAll("text")
              .data(words, function(d) { return d.text.toLowerCase(); });
          
          /*text.transition()
              .duration(1000)
              .attr("transform", function(d) { console.log('rot : '+d.rotate); return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
              .style("font-size", function(d) { return '12px';}); //console.log('size : '+d.size); return d.size + "px"; });
              */
              
          text.enter().append("text")
              .attr("text-anchor", "middle")
              .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
              .style("font-size", function(d) { console.log('font-size : '+d.size); return d.size + "px"; })
              .on("click", function(d) {
                  console.log('clicked');
                load(d.text);
              })
              .style("opacity", 0.1)
            .transition()
              .duration(1000)
              .style("opacity", 1.0);
              
          text.style("font-family", function(d) { return d.font; })
              .style("fill", function(d) { return 'rgb(233,100,190)'; })
              .text(function(d) { return d.text; });
              
          
          var exitGroup = background.append("g")
              .attr("transform", vis.attr("transform"));
          
          var exitGroupNode = exitGroup.node();
          
          text.exit().each(function() {
            exitGroupNode.appendChild(this);
          });
          
          exitGroup.transition()
              .duration(1000)
              .style("opacity", 1e-6)
              .remove();
          
          vis.transition()
              .delay(1000)
              .duration(750)
              .attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
                  
    }
    
    function progress(d) {
    }
    
    return{
       startWordCloud : startWordCloud 
    };

});
