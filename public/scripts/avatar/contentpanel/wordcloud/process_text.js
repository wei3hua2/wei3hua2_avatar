wei3hua2.word_cloud_process_text = (function(rawText) {
    
    if(!d3)throw new Error('d3 is undefined');

    // From Jonathan Feinberg's cue.language, see lib/cue.language/license.txt.
    var STOPWORDS = /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)$/,
        PUNCTUATION = /[!"&()*+,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g,
        WORD_SEPARATORS = /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g,
        DISCARD = /^(@|https?)/,
        HTML_TAGS = /(<[^>]*?>|<script.*?<\/script>|<style.*?<\/style>|<head.*?><\/head>)/g,
        TWITTER_SPECIFIC = /^(rt)$/,
        MATCH_TWITTER = /^https?:\/\/([^\.]*\.)?twitter\.com/;
        
    var TAG_MAX_LENGTH = 30;

    this.processText = function(corpus) {
        return processTextWithAlgo(simpleWordCountRanking,corpus);
    }
    var processTextWithAlgo = function(algo,corpus){
        return algo(corpus);
    }    
    
    this.isWordExistInText = function(text,processedWord){
        return _.any(splitText(text),function(word){
            return processedWord===preprocessWord(word.toLowerCase());
        });
    }
    
    var simpleWordCountRanking = function(corpus){
        var tags = {};
        splitText(corpus).forEach(function(word) {
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
    var splitText = function(txt){
        return txt.split(WORD_SEPARATORS);
    }
    var preprocessWord = function(word){
        var w = word.replace(PUNCTUATION, "");
        if(STOPWORDS.test(w.toLowerCase()))return;
        else if(DISCARD.test(w.toLowerCase()))return;
        else if(TWITTER_SPECIFIC.test(w.toLowerCase()))return;
        else if(isDigitOrSingleChar(w))return;
        
        return w.substr(0, TAG_MAX_LENGTH);
    }
    var isDigitOrSingleChar = function(word){
        if(word.length<=1 || !isNaN(word))return true;
        else return false;
    }
});
