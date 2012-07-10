wei3hua2.avatar_news_panel = (function(options) {

    var mainID = '#content';
    var mapID = '#map_content', newsID = '#news_content', twitterID = '#twitter_content', videoID = '#video_content';
    
    var wordCloudPanel;

    this.updateWordCloud = function(){
        if(!wordCloudPanel){
            wordCloudPanel = wei3hua2.word_cloud_main;
            
            wordCloudPanel.startWordCloud(function(){
                $('#wordcloud_control').show(1000);
                
                var curDate = new Date();
                $('#last_wordcloud_update').html(curDate.toLocaleTimeString()+' '+curDate.toLocaleDateString());
                $('#wordcloud_topic_search').focus();
                $('#wordcloud_topic_search').keyup(function(event){
                    if(event.keyCode===13){ //enter
                        var keyword = $('#wordcloud_topic_search').val();
                        if(keyword){
                            
                            
                            wei3hua2.addAnalyticsEvent('wordcloud','search',keyword);
                            
                            $('#topic_title').html('What Singaporeans say about '+keyword);
                            
                            wordCloudPanel.requery(keyword);
                            $('#wordcloud_topic_search').val('');
                            
                            var curDate = new Date();
                            $('#last_wordcloud_update')
                                .html(curDate.toLocaleTimeString()+' '+curDate.toLocaleDateString());
                        }
                    }
                });
            });
        }else{
            //if($('#wordcloud_control').is(':hidden')){}
        }
    }

    this.initMap = function() {
        wei3hua2.third_party_google_map.initGoogleMap(mapID);
    }
    this.updateNews = function() {
        $('.carousel').carousel();
        wei3hua2.third_party_google_search.retrieveSGNews(function(newsList) {
            _updateNewsDiv(newsList);
        });
    }
    this.updateTwitterWidget = function() {
        $(function($) {
            $(twitterID).tweet({
                avatar_size: 32,
                count : 6,
                query : "singapore",
                loading_text : "searching twitter..."
            });
        });
        //$(twitterID).append('<script>wei3hua2.third_party_twitter_search.makeTwitterWidget();</script>');
    }
    var _updateNewsDiv = function(news) {
        $('.carousel-inner').empty();

        var firstItem = true;
        _.each(news, function(n) {
            var item = _generateNewsItemDOM(n, firstItem);

            $('.carousel-inner').append(item);
            firstItem = false;
        });
    }
    var _generateNewsItemDOM = function(data, isactive) {
        var item = document.createElement('div');
        if(isactive)
            item.setAttribute('class', 'news_item item active');
        else
            item.setAttribute('class', 'news_item item');

        var title = document.createElement('div');
        title.setAttribute('class', 'news_title');
        title.innerHTML = data.title;

        $(title).popover({
            placement : 'bottom',
            content : data.content,
            delay : 100
        });

        var date = document.createElement('div');
        date.setAttribute('class', 'news_date');
        date.innerHTML = wei3hua2.util.parseTimeDifference(Date.parse(data.date));

        if(data.imgUrl) {
            item.style.backgroundImage = "url(\'" + data.imgUrl + "\')";
            item.style.backgroundRepeat = 'no-repeat';
            item.style.backgroundSize = '100%';
        }

        item.appendChild(title);
        item.appendChild(date);

        return item;
    }
});
