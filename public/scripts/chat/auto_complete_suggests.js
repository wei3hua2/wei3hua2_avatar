wei3hua2.suggest = (function(){
    
    var suggestNotFound = 'Huh? i don\'t understand what ya mean..';
    
    var suggestions = {
        'who are you?' : 'i am wei3hua2',
        'you are cute!' : 'thank you',
        'why am i here?' : 'probably looking for my alter ego, James Chong',
        'what can you do?' : 'i can do many things',
        'hello' : 'hi ya',
        'i love you' : 'you don\'t know what love means'
    };
    
    this.getAllSuggests = function(){
        var allSuggest = [];
        for(var s in suggestions)allSuggest.push(s);
        
        return allSuggest;
    }

    this.resolve = function(suggest){
        //TODO
        /*{
            action : 'angry',
            answer : 'hi ya'
        }*/
        
        
        return mapper(suggest);
    }
    
    var mapper = function(suggest){
        var answer;
        switch(suggest){
            case 'hi':case 'hey':
            answer = suggestions['hello'];
            break;
            
            default:
            answer = suggestions[suggest];
        }
        
        if(answer===undefined)answer = suggestNotFound;
        
        return answer;
    }
    
});
