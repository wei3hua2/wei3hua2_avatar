wei3hua2.third_party_twitter_search = (function() {
    //var twitUrl = 'http://search.twitter.com/search.json?';
    
    var SG_TWITS_URL = 'http://search.twitter.com/search.json?';
    var SG_TOPIC_URL = 'http://search.twitter.com/search.json?';

    var generalConfig = {
        q : 'singapore',
        lang : 'en',
        rpp : 100
    };
    var topicConfig = {
        geocode : '1.352083,103.819836,20mi',
        lang : 'en',
        rpp : 100
    };

    var twitterWidget;


    var makeTwitterWidget = function() {
        
        $.getScript('http://widgets.twimg.com/j/2/widget.js', function (data,txt,q) {
            TWTR.Widget({
                version : 2,
                type : 'search',
                search : 'singapore',
                interval : 30000,
                title : '',
                subject : 'Singapore',
                width : 200,
                height : 200,
                theme : {
                    shell : {
                        background : '#8ec1da',
                        color : '#ffffff'
                    },
                    tweets : {
                        background : '#ffffff',
                        color : '#444444',
                        links : '#1985b5'
                    }
                },
                features : {
                    scrollbar : true,
                    loop : true,
                    live : true,
                    behavior : 'default'
                }
            }).render().start();
        });
    }
    
    var retrieveSGTopicTwits = function(keyword,cb){
        var url = _parseUrl(SG_TOPIC_URL,topicConfig);
        var encodedKeyword = encodeURIComponent(keyword);
        
        var encodedUrl = url+'&q='+encodedKeyword;
        
        _submitQuery(encodedUrl, function(raw) {
            if(cb)cb(_transformTwitsInfo(raw));
        });
    }
    var retrieveSGTwits = function(cb) {
        var url = _parseUrl(SG_TWITS_URL,generalConfig);

        _submitQuery(url, function(raw) {
            if(cb)cb(_transformTwitsInfo(raw));
        });
    }
    
    var generateCorpus = function(cb){
        retrieveSGTwits(function(data){
            var corpus = '';
            data.forEach(function(d){
                corpus += d.text+' ';
            });
            cb(corpus,data);
        });
    }
    var generateCorpusByKeyword = function(keyword,cb){
        retrieveSGTopicTwits(keyword,function(data){
            var corpus = '';
            data.forEach(function(d){
                corpus += d.text+' ';
            });
            cb(corpus,data);
        });
    }
    
    var _transformTwitsInfo = function(rawResults) {
        if(rawResults === undefined)return undefined;

        var results = rawResults.results;

        var filteredResult = _.map(results, function(result) {
            return {
                text : result.text,
                username : result.from_user_name,
                date : result.created_at,
                imgUrl : result.profile_image_url
            }
        });
        
        return filteredResult;
    }
    var _submitQuery = function(url, cb) {
        $.getJSON(url, function(resp) {
            if(cb)
                cb(resp);
        }).success(function() {
            //console.log('success');
        }).error(function(data) {
            console.log('error : ' + JSON.stringify(data));
        });
    }
    var _parseUrl = function(url, config) {
        url = url + 'callback=?';
        for(var key in config)url = url +'&'+key+'='+config[key];
        
        return url;
    }
    return {
        makeTwitterWidget : makeTwitterWidget,
        retrieveSGTwits : retrieveSGTwits,
        generateCorpus : generateCorpus,
        generateCorpusByKeyword : generateCorpusByKeyword
    }
})();
