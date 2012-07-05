wei3hua2.similar_suggest_mapping = (function(data) {
    this.findAnswer = function(qn) {
        var ans;
        _.find(similarQnMappers, function(mapper) {
            var mappedSug = mapper(qn);
            if(mappedSug) {
                ans = data.suggestions[mappedSug];
                return true;
            }
        });
        return ans;
    }
    var helloMapping = function(qn) {
        var ar = ['hello', 'hey', 'wassup'];
        var resultID = 'hi';
        
        return _mapResult(ar,resultID)(qn);
    }
    var nvmMapping = function(qn) {
        var ar = ['nvm'];
        var resultID = 'nvm';
        
        return _mapResult(ar,resultID)(qn);
    }
    var boringMapping = function(qn) {
        var ar = ['bored', 'i\'m bored'];
        var resultID = 'bored';
        
        return _mapResult(ar,resultID)(qn);
    }
    
    var _mapResult = function(list, resultID) {
        return function(question) {
            return ( (_.include(list, question)) ? resultID : undefined );
        };
    }

    
    var similarQnMappers = [helloMapping, nvmMapping, boringMapping];
});
