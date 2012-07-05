wei3hua2.suggest = (function(data, mappingClasses){

    var answerer = new mappingClasses.answer_mapping(data);
    var similar = new mappingClasses.similar_suggest_mapping(data);

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
        
        answer = data.suggestions[qn];
        
        if(!answer)
            answer = similar.findSimilarQuestion(qn);
        if(!answer)
            answer = answerer.replyAnswerFromPlayer(qn);
        if(!answer)
            answer = data.suggestNotFound;
        
        //TODO: heuristic resolver

        return answer;
    }

    return {
        getAllSuggests : getAllSuggests,
        resolve : resolve
    };

})(wei3hua2.suggest_data,{
    answer_mapping : wei3hua2.answer_mapping,
    similar_suggest_mapping : wei3hua2.similar_suggest
});
