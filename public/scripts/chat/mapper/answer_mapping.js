wei3hua2.user_answer_mapping = (function(data) {

    this.findAnswer = function(qn) {
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
                return performYesResponse(qn);
            case('no'):
                return performNoResponse(qn);
            case('dunknow'):
                return performDunKnowResponse(qn);
        }

        return undefined;
    }
    var performYesResponse = function(qn) {
        var lastID = _.last(data.history);

        var last = data.suggestions[lastID];
        if(last && last.ans_type==='question'){
            return _createResponse('yes','Here you go',last.action);
        }else{
            return _whatResponse(qn, 'yes');    
        }
    }
    var performNoResponse = function(qn) {
        return _whatResponse(qn, 'no');
    }
    var performDunKnowResponse = function(qn) {
        return _whatResponse(qn, 'dunno');
    }
    var _whatResponse = function(qn, sugID) {
        var answer = qn + ' what?';
        return _createResponse(sugID,answer);
    }
    var _createResponse = function(sugID,answer,action){
        var response = data.suggestions[sugID];
        response.ans = answer || '';
        response.action = action ||'';

        return response;        
    }
    
    var yesMapping = function(qn) {
        var ar = ['yes', 'sure', 'ok', 'yeah', 'yup', 'yap'];
        if(_.include(ar, qn))
            return 'yes';
    }
    var noMapping = function(qn) {
        var ar = ['no', 'nah', 'nope', 'never'];
        if(_.include(ar, qn))
            return 'no';
    }
    var dunknowMapping = function(qn) {
        var ar = ['i don\'t know'];
        if(_.include(ar, qn))
            return 'dunno';
    }
    var responseMappers = [yesMapping, noMapping, dunknowMapping];
});
