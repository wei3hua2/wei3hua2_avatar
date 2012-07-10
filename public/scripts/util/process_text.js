wei3hua2.process_text = (function() {
    
    if(!d3)throw new Error('d3 is undefined');

    // From Jonathan Feinberg's cue.language, see lib/cue.language/license.txt.
    var wordsPattern = {
        STOPWORDS : /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)$/,
        PUNCTUATION : /[!"&()*+,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g,
        WORD_SEPARATORS : /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g,
        DISCARD : /^(@|https?)/,
        HTML_TAGS : /(<[^>]*?>|<script.*?<\/script>|<style.*?<\/style>|<head.*?><\/head>)/g,
        TWITTER_SPECIFIC : /^(rt)$/,
        MATCH_TWITTER : /^https?:\/\/([^\.]*\.)?twitter\.com/    
    };

    var isWordExistInText = function(text,processedWord){
        return _.any(splitText(text),function(word){
            return processedWord===standardPreprocessWord(word.toLowerCase());
        });
    }

    var splitText = function(txt){
        return txt.split(wordsPattern.WORD_SEPARATORS);
    }
    var standardPreprocessWord = function(word){
        var w = word.replace(wordsPattern.PUNCTUATION, "");
        
        if(wordsPattern.STOPWORDS.test(w.toLowerCase()))return;
        else if(wordsPattern.DISCARD.test(w.toLowerCase()))return;
        else if(isDigitOrSingleChar(w))return;

        return w;
    }
    var isDigitOrSingleChar = function(word){
        if(word.length<=1 || !isNaN(word))return true;
        else return false;
    }
    
    return {
        splitText : splitText,
        standardPreprocessWord : standardPreprocessWord,
        isDigitOrSingleChar : isDigitOrSingleChar,
        isWordExistInText : isWordExistInText,
        wordsPattern : wordsPattern
    }
})();