wei3hua2.similar_suggest = (function(data) {
    this.findSimilarQuestion = function(qn) {
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
        if(_.include(ar, qn))
            return 'hi';
    }
    var nvmMapping = function(qn) {
        var ar = ['nvm'];
        if(_.include(ar, qn))
            return 'nevermind';
    }
    var boringMapping = function(qn) {
        var ar = ['bored', 'i\'m bored'];
        if(_.include(ar, qn))
            return 'boring';
    }
    var similarQnMappers = [helloMapping, nvmMapping, boringMapping];
});
