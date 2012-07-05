wei3hua2.answer_mapping = (function(data) {

    this.replyAnswerFromPlayer = function(qn) {
        var ans;
        _.find(responseMappers, function(mapper) {
            var mappedAns = mapper(qn);
            if(mappedAns) {
                ans = mappedAns;
                return true;
            }
        });
        switch(ans) {
            case('yes'):
                return performYesResponse();
            case('no'):
                return performNoResponse();
            case('dunknow'):
                return performDunKnowResponse();
        }

        return undefined;
    }
    var performYesResponse = function() {
    }
    var performNoResponse = function() {
        //TODO: check history
        return data.suggestions['nvm'];
    }
    var performDunKnowResponse = function() {
        //TODO: check history
        return data.suggestions['nvm'];
    }
    //TODO: track history, given a yes answer
    var yesMapping = function(qn) {
        var ar = ['yes', 'sure', 'ok', 'yeah', 'yup', 'yap'];
        if(_.include(ar, qn))
            return 'yes';
    }
    var noMapping = function(qn) {
        var ar = ['no', 'nah', 'nope','never'];
        if(_.include(ar, qn))
            return 'no';
    }
    var dunknowMapping = function(qn) {
        var ar = ['i don\'t know'];
        if(_.include(ar, qn))
            return 'dunknow';
    }
    var responseMappers = [yesMapping, noMapping, dunknowMapping];
});
