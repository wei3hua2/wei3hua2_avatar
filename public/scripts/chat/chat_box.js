wei3hua2.chat_box = (function(avatar){
    var solution = wei3hua2.suggest;

    $('#chat_text').typeahead({
        source : solution.getAllSuggests()
    });

    this.initEvents = function() {
        $('#chat_text').keyup(function(event) {
            switch(event.keyCode) {
                case 13 : talkToMe();break;
                case 27 : _clearChatText();break;
                default : break;
            }
        });
    }
    var talkToMe = function() {
        var qn = event.srcElement.value;
        qn = _textSanitizer(qn);
        
        if(!qn){
            event.srcElement.value = '';
            return;
        }
        
        var resp = solution.resolve(qn);
        performAvatarActionsConditions(resp);
        
        wei3hua2.addAnalyticsEvent('chat', resp.dir_qn, qn);
        
        _setPlaceHolderText(event.srcElement.value);
        _clearChatText();
    }
    
    var performAvatarActionsConditions = function(resp){
        if(resp.ans_type==='answer' && resp.action==='show:map'){
            avatar.showWordCloud();
        }else if(resp.ans_type==='answer' && resp.action==='me:naked'){
            avatar.turnNaked();
        }else if(resp.ans_type==='answer' && resp.action==='site:source'){
            window.open('https://github.com/wei3hua2/wei3hua2_avatar');
        }
        else if(resp.action==='angry'){
            avatar.turnAngry();
        }else if(resp.ans_type==='thank'){
            avatar.turnCute();
        }
        else if(resp.ans_type==='none'){
            avatar.turnPuzzled();
        }
        else avatar.talk(resp.ans);
    }
    
    var _clearChatText = function(){
        $('#chat_text').val('');
    }
    var _setPlaceHolderText = function(txt){
        $('#chat_text').attr('placeholder',txt);
    }
    var _textSanitizer = function(str){
        return _trimString(str);
    }
    
    var _trimString = function(str){
        str = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        return str;
    }
    
    
});
