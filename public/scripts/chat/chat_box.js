wei3hua2.chat_box = (function(avatar){


    var solution = new wei3hua2.suggest();

    $('#chat_text').typeahead({
        source : solution.getAllSuggests()
    });

    this.initEvents = function() {
        $('#chat_text').keyup(function(event) {
            switch(event.keyCode) {
                case 13 : talkToMe();break;
                case 27 : clearChatText();break;
                default : break;
            }
        });
    }
    var talkToMe = function() {
        var qn = event.srcElement.value;
        qn = qn.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        
        if(!qn){
            event.srcElement.value = '';
            return;
        }
        
        var resp = solution.resolve(qn);
        
        avatar.talk(resp.ans);
        
        setPlaceHolderText(event.srcElement.value);
        clearChatText();
    }
    var clearChatText = function(){
        $('#chat_text').val('');
    }
    var setPlaceHolderText = function(txt){
        $('#chat_text').attr('placeholder',txt);
    }
    
    
});
