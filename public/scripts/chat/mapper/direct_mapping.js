wei3hua2.direct_mapping = (function(data) {
    
    this.findAnswer = function(qn){
        var item = _.find(data.suggestions,function(sug){
            return qn===sug.dir_qn;
        });
        
        return item;
    }
});