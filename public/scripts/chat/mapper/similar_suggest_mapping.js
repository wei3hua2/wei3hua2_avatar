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
        var result = 'hi';
        
        return _mapResult(ar,result)(qn);
    }
    var nvmMapping = function(qn) {
        var ar = ['nvm'];
        var result = 'nevermind';
        
        return _mapResult(ar,result)(qn);
    }
    var boringMapping = function(qn) {
        var ar = ['bored', 'i\'m bored'];
        var result = 'boring';
        
        return _mapResult(ar,result)(qn);
    }
    
    var _mapResult = function(list, result) {
        return function(question) {
            return ( (_.include(list, question)) ? result : undefined );
        };
    }

    
    var similarQnMappers = [helloMapping, nvmMapping, boringMapping];
});
