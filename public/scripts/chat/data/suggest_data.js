wei3hua2.suggest_data = (function() {
    var history = [];

    var suggestionsList =
    [wei3hua2.suggest_data_casual,
    wei3hua2.suggest_data_qn,
    wei3hua2.suggest_data_answer,
    wei3hua2.suggest_data_casual_short,
    wei3hua2.suggest_data_jameschong,
    wei3hua2.suggest_data_vulgar];

    var mergeSuggestions = function(list){
        var combined = {};
        _.each(list,function(obj){
            for(var key in obj)
                combined[key] = obj[key];
        });
        return combined;
    }

    var suggestions = mergeSuggestions(suggestionsList);
    
    var
    suggestNotFound = {
        'dir_qn' : '',
        'ans' : 'Huh? i don\'t understand what ya mean..',
        'ans_type' : 'normal',
        'category' : ['general']
    };

    return {
        history : history,
        suggestNotFound : suggestNotFound,
        suggestions : suggestions
    };

})();
