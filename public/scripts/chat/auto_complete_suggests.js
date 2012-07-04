wei3hua2.suggest = (function() {

    var history = [];
    var suggestNotFound = {
        ans : 'Huh? i don\'t understand what ya mean..',
        action : 'normal'
    };
    var suggestions = {
        'who are you?' : {
            ans : 'wei3hua2',
            action : 'normal'
        },
        'you are cute!' : {
            ans : 'thank you',
            action : 'normal'
        },
        'why am i here?' : {
            ans : 'probably looking for my alter ego, James Chong',
            action : 'normal'
        },
        'what can you do?' : {
            ans : 'i can do many things',
            action : 'normal'
        },
        'hi' : {
            ans : 'wassup..',
            action : 'normal'
        },
        'i love you' : {
            ans : 'you don\'t know what love means',
            action : 'normal'
        },
        'poor thing' : {
            ans : 'nah, i\'m not the self-pity kinda guy',
            action : 'normal'
        },
        'nvm' : {
            ans : 'Alrighty, cool..',
            action : 'normal'
        },'boring' : {
            ans : 'Want me to recommend some interesting site?',
            action : 'normal'
        },'any sites to recommend?' : {
            ans : '9gag.com... Let me show you some interesting stuff?',
            action : 'question'
        },'who is James Chong' : {
            ans : 'He\'s my alter ego. We been sharing a body for decades years. Sharing shit with asshole is never easy, nature had it that both are meant for each other. so i decided to divorce his body & lease a body from sp-studio.de & manifest myself in cyber space',
            action : 'normal'
        },'which country are you from?' : {
            ans : 'Singapore. Wanna find out more?',
            action : 'question'
        }
    };

    this.getAllSuggests = function() {
        var allSuggest = [];
        for(var s in suggestions)
        allSuggest.push(s);

        return allSuggest;
    }

    this.resolve = function(suggest) {
        var mapped = mapAnswer(suggest);
        var historyRecord = suggest;

        if(mapped === suggestNotFound)
            historyRecord = '';

        history.push(historyRecord);

        return mapped;
    }
    var mapAnswer = function(qn) {
        var answer;
        
        answer = suggestions[qn];
        
        if(!answer)
            answer = findSimilarQuestion(qn);
        if(!answer)
            answer = findResponseAnswer(qn);
        if(!answer)
            answer = suggestNotFound;

        return answer;
    }
    var findSimilarQuestion = function(qn){
        var ans;
        _.find(similarQnMappers, function(mapper) {
            var mappedSug = mapper(qn);
            if(mappedSug) {
                ans = suggestions[mappedSug];
                return true;
            }
        });
        return ans;
    }
    var findResponseAnswer = function(qn){
        var ans;
        _.find(responseMappers, function(mapper) {
            var mappedAns = mapper(qn);
            if(mappedAns){
                ans = mappedAns;
                return true;
            }
        });
        
        switch(ans){
            case('yes'):return performYesResponse();
            case('no'):return performNoResponse();
            case('dunknow'):return performDunKnowResponse();
        }
        
        return undefined;
    }
    var performYesResponse = function(){
    }
    var performNoResponse = function(){
        //TODO: check history
        return suggestions['nvm'];
    }
    var performDunKnowResponse = function(){
        //TODO: check history
        return suggestions['nvm'];
    }
    
    
    //MAPPERS BELOW
    
    var helloMapping = function(qn) {
        var ar = ['hello', 'hey', 'wassup'];
        if(_.include(ar, qn))return 'hi';
    }
    var nvmMapping = function(qn){
        var ar = ['nevermind'];
        if(_.include(ar, qn))return 'nvm';
    }
    var boringMapping = function(qn){
        var ar = ['bored','i\'m bored'];
        if(_.include(ar, qn))return 'boring';
    }
    
    var similarQnMappers = [helloMapping, nvmMapping,boringMapping];
    
    //TODO: track history, given a yes answer
    var yesMapping = function(qn){
        var ar = ['yes','sure','ok','yeah','yup','yap'];
        if(_.include(ar, qn))return 'yes';
    }
    var noMapping = function(qn){
        var ar = ['no','nah','nope'];
        if(_.include(ar, qn))return 'no';
    }
    var dunknowMapping = function(qn){
        var ar = ['i don\'t know','oh'];
        if(_.include(ar, qn))return 'dunknow';
    }
    
    var responseMappers = [yesMapping,noMapping,dunknowMapping];

});
