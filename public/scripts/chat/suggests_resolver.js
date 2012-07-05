wei3hua2.suggest = (function(data, suggestMapperClasses){
     
    var mappers = [];
    _.each(suggestMapperClasses,function(clazz){
        mappers.push(new clazz(data));
    });
    

    var getAllSuggests = function(){
        var allSuggest = [];
        for(var s in data.suggestions){
            var answer = data.suggestions[s];
            if(!answer.dunShowInSuggest)allSuggest.push(s);
        }
        
        return allSuggest;
    }

    var resolve = function(suggest) {
        var mapped = _mapAnswer(suggest);
        var historyRecord = suggest;

        if(mapped === data.suggestNotFound)
            historyRecord = '';

        data.history.push(historyRecord);

        return mapped;
    }
    var _mapAnswer = function(qn) {
        var answer;
        
        //find the first answer
        _.find(mappers,function(mapper){
            var a = mapper.findAnswer(qn);
            if(a){
                answer = a;
                return true;
            }
        });
        
        if(!answer)
            answer = data.suggestNotFound;

        return answer;
    }

    return {
        getAllSuggests : getAllSuggests,
        resolve : resolve
    };


})(wei3hua2.suggest_data, 
    [wei3hua2.direct_mapping,
    wei3hua2.user_answer_mapping, 
    wei3hua2.similar_suggest_mapping]);
