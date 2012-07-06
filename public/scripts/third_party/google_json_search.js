wei3hua2.third_party_google_search = (function() {
    //https://developers.google.com/web-search/docs/reference#_intro_fonje

    var newsUrl = 'https://ajax.googleapis.com/ajax/services/search/news?';
    var videoUrl = 'https://ajax.googleapis.com/ajax/services/search/video?';
    var webSearchUrl = 'https://ajax.googleapis.com/ajax/services/search/web?';
    var blogsUrl = 'https://ajax.googleapis.com/ajax/services/search/blogs?';

    var defaultConfig = {
        version : '1.0',
        cb : '?',
        rsz : 8,
        start : 0,
        query : 'singapore',
        gl : 'sg'
    }


    var retrieveSGNews = function(cb) {
        var url = _parseUrl(newsUrl,defaultConfig);
        
        _submitQuery(url, function(raw){
            if(cb)cb(_transformNewsInfo(raw));
        });
    }
    var _transformNewsInfo = function(rawResults){
        if(rawResults.responseStatus!==200)return undefined;
        
        var results = rawResults.responseData.results;
        
        var filteredResult = _.map(results,function(result){
            var image = (result.image)? result.image.url : ''; 
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
            if(cb)cb(resp);
        })
        .success(function(){console.log('success');})
        .error(function(data){console.log('error : '+JSON.stringify(data));});
    }
    var _parseUrl = function(url,config) {
        var key = 'v=' + config.version;
        var rsz = '&rsz'+ config.rsz;

        var start = (config.start) ? '&start=' + config.start : '';
        var gl = (config.gl) ? '&gl=' + config.query : '';
        var query = (config.query) ? '&q=' + config.query : '';
        var cb = '&callback=?';

        return url.concat(key, rsz, start, query,cb);
    }
    return {
        retrieveSGNews:retrieveSGNews
    }

})();
