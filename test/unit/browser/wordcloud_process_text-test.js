buster.testCase("WordCloud Process Text", {
    setUp: function(){
        this.corpus = "cool dude am are hey fire money http://www.google.com cool fire rich fire q 41 RT";
        
        this.findMoney = function(item){
            return item.key==='money';
        };
        
        this.findUrl = function(item){
            return item.key==='http://www.google.com';
        };
        this.findNumber = function(item){
            return item.key=='41';
        };
        this.findChar = function(item){
            return item.key==='q';
        };
        this.findRT = function(item){
            return item.key==='rt';
        };
    },
    'process text' : function(){
        var p = new wei3hua2.word_cloud_process_text();
        var tags = p.processText(this.corpus);
        
        console.log(JSON.stringify(tags));
        
        //first key should be fire
        assert.equals(tags[0].key,'fire');
        assert.equals(tags[0].value,3);
        
        assert.equals(tags[1].key,'cool');
        assert.equals(tags[1].value,2);
        
        var money = _.find(tags,this.findMoney);
        assert.equals(money.key,'money');
        assert.equals(money.value,1);
        
        refute.defined(_.find(tags,this.findUrl));
        
        refute.defined(_.find(tags,this.findNumber));
        
        refute.defined(_.find(tags,this.findChar));
        
        refute.defined(_.find(tags,this.findRT));
    }
});