wei3hua2.avatar_news_panel = (function(options) {

    var mapID = '#map_content', newsID = '#news_content', twitterID = '#twitter_content', videoID = '#video_content';

    this.initMap = function() {
        wei3hua2.third_party_google_map.initGoogleMap(mapID);
    }
    this.updateNews = function(){
        $('.carousel').carousel();
        wei3hua2.third_party_google_search.retrieveSGNews(function(newsList) {
            _updateNewsDiv(newsList);
        });
    }
    
    
    var _updateNewsDiv = function(news){
        $('.carousel-inner').empty();
        
        var firstItem = true;
        _.each(news,function(n){
            var item = _generateNewsItemDOM(n,firstItem);
            
            $('.carousel-inner').append(item);        
            firstItem=false;
        });
    }
    
    var _generateNewsItemDOM = function(data,isactive){
        var item = document.createElement('div');
        if(isactive)item.setAttribute('class','news_item item active');
        else item.setAttribute('class','news_item item');
        
        var title = document.createElement('div');
        title.setAttribute('class','news_title');
        title.innerHTML = data.title;
        
        $(title).popover({
            placement : 'bottom',
            content : data.content,
            delay : 100
        });
        
        // var content = document.createElement('div');
        // content.setAttribute('class','news_content');
        // content.innerHTML = data.content;
        
        var date = document.createElement('div');
        date.setAttribute('class','news_date');
        date.innerHTML = wei3hua2.util.parseTimeDifference(Date.parse(data.date));
        
        if(data.imgUrl){
            item.style.backgroundImage = "url(\'"+data.imgUrl+"\')";
            item.style.backgroundRepeat = 'no-repeat';
            item.style.backgroundSize = '100%';
        }
        
        item.appendChild(title);
        //item.appendChild(content);
        item.appendChild(date);
        
        return item;
    }
});
