wei3hua2.chat_box = (function(avatar){


    var solution = wei3hua2.suggest;

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
        qn = trimString(qn);
        
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
    
    var trimString = function(str){
        str = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        return str;
    }
    
    
});
