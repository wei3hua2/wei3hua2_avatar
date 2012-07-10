wei3hua2.word_cloud_process_text = (function(rawText) {
    
    var txtUtil = wei3hua2.process_text;
    var pattern = txtUtil.wordsPattern;
    
    if(!d3)throw new Error('d3 is undefined');
        
    var TAG_MAX_LENGTH = 30;

    this.processText = function(corpus) {
        return processTextWithAlgo(simpleWordCountRanking,corpus);
    }
    var processTextWithAlgo = function(algo,corpus){
        return algo(corpus);
    }    
    
    this.isWordExistInText = function(text,processedWord){
        return _.any(txtUtil.splitText(text),function(word){
            return processedWord===preprocessWord(word.toLowerCase());
        });
    }
    
    var simpleWordCountRanking = function(corpus){
        var tags = {};
        txtUtil.splitText(corpus).forEach(function(word) {
            tags = incrementTagCount(tags , preprocessWord(word));
        });
        
        tags = sortTagsDescendingly(tags);
        
        return tags;
    }

    var sortTagsDescendingly = function(tags){
        return d3.entries(tags).sort(function(a, b) {
            return b.value - a.value;
        });
    }
    var incrementTagCount = function(tags,word){
        if(word) tags[ word = word.toLowerCase()] = (tags[word] || 0) + 1;
        return tags;
    }
    
    var preprocessWord = function(word){
        var w = txtUtil.standardPreprocessWord(word);
        
        if(w===undefined)return;
        else if(pattern.TWITTER_SPECIFIC.test(w.toLowerCase()))return;
        
        return w.substr(0, TAG_MAX_LENGTH);
    }
});
