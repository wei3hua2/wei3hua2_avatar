wei3hua2.third_party_twitter_search = (function() {
    var twitUrl = 'http://search.twitter.com/search.json?';

    var defaultConfig = {
        query : 'singapore'
    };

    var twitterWidget;


    var makeTwitterWidget = function() {
        
        $.getScript('http://widgets.twimg.com/j/2/widget.js', function (data,txt,q) {
            console.log('scripted'+data);
            console.log('scripted'+txt);
            console.log('scripted'+q.status);
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
        // if(!twitterWidget)
            /*twitterWidget = new TWTR.Widget({
                version : 2,
                type : 'search',
                search : 'singapore',
                interval : 30000,
                title : '',
                subject : 'Singapore',
                width : 'auto',
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
            }).render().start();*/
    }

    
    var retrieveSGTwits = function(cb) {
        var url = _parseUrl(twitUrl, defaultConfig);

        _submitQuery(url, function(raw) {
            console.log('json : ' + JSON.stringify(raw));
            //if(cb)cb(_transformNewsInfo(raw));
        });
    }
    var _transformTwitsInfo = function(rawResults) {
        if(rawResults.responseStatus !== 200)
            return undefined;

        var results = rawResults.responseData.results;

        var filteredResult = _.map(results, function(result) {
            var image = (result.image) ? result.image.url : '';
            return {
                title : result.title,
                url : result.url,
                content : result.content,
                date : result.publishedDate,
                imgUrl : image
            }
        });
        return filteredResult;
    }
    var _submitQuery = function(url, cb) {
        $.getJSON(url, function(resp) {
            if(cb)
                cb(resp);
        }).success(function() {
            console.log('success');
        }).error(function(data) {
            console.log('error : ' + JSON.stringify(data));
        });
    }
    var _parseUrl = function(url, config) {
        var query = 'q=' + config.query;
        var cb = '&callback=?';

        return url.concat(query, cb);
    }
    return {
        makeTwitterWidget : makeTwitterWidget
    }
})();
