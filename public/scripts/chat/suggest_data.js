wei3hua2.suggest_data = (function() {
    var history = [];
    
    var suggestions = wei3hua2.suggest_data_list;
    var suggestNotFound = {
        'dir_qn' : '',
        ans : 'Huh? i don\'t understand what ya mean..',
        ans_type : 'normal',
        category : ['general']
    };

    return {
        history : history,
        suggestNotFound : suggestNotFound,
        suggestions : suggestions
    };

})();
