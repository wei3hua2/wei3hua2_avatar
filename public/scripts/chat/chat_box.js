wei3hua2.chat_box = (function(avatar){

    var suggest = [];
    var answer = [];

    var solution = wei3hua2.suggest;

    for(var qn in solution) {
        suggest.push(qn);
    }

    $('#chat_text').typeahead({
        source : suggest
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
        var ans = solution[event.srcElement.value]; 
        (ans === undefined) ? ans = 'Huh? i don\'t understand what ya mean..' : ans;
        
        avatar.talk(ans);
        
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
