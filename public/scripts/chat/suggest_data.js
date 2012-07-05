wei3hua2.suggest_data = (function(){
    var history = [];
    var suggestNotFound = { 
        dir_qn : '',
        ans : 'Huh? i don\'t understand what ya mean..',
        ans_type : 'normal',
        category : ['general']
    };
    var suggestions = {
         'whoyou': {
            dir_qn : 'who are you?',
            ans : 'wei3hua2',
            ans_type : 'normal',
            expression : 'normal',
            action : 'none',
            category : ['general']
        },
        'thank' : {
            dir_qn : 'you are cute!',
            ans : 'thank you',
            ans_type : 'normal',
            category : ['general']
        },
        'whyhere' : {
            dir_qn : 'why am i here?',
            ans : 'probably looking for my alter ego, James Chong',
            ans_type : 'normal',
            category : ['general']
        },
        'cani' : {
            dir_qn : 'what can you do?',
            ans : 'i can do many things',
            ans_type : 'normal',
            category : ['general']
        },
        'hi' : {
            dir_qn : 'hi',
            ans : 'wassup..',
            ans_type : 'normal',
            category : ['general']
        },
        'love' : {
            dir_qn : 'i love you',
            ans : 'you don\'t know what love means',
            ans_type : 'normal',
            category : ['general']
        },
        'poorme' : {
            dir_qn : 'poor thing',
            ans : 'nah, i\'m not the self-pity kinda guy',
            ans_type : 'normal',
            category : ['general'],
            dunShowInSuggest : true
        },
        'nvm' : {
            dir_qn : 'nevermind',
            ans : 'Alrighty, cool..',
            ans_type : 'normal',
            category : ['general'],
            dunShowInSuggest : true
        },
        'bored' : {
            dir_qn : 'boring',
            ans : 'Want me to recommend some interesting site?',
            ans_type : 'normal',
            category : ['general'],
            dunShowInSuggest : true
        },
        'siterec' : {
            dir_qn : 'any sites to recommend?',
            ans : '9gag.com... Let me show you some interesting stuff?',
            ans_type : 'question',
            category : ['general']
        },
        'whojames' : {
            dir_qn : 'who is James Chong',
            ans : 'He\'s my alter ego. We been sharing a body for decades years. Sharing shit with asshole is never easy, nature had it that both are meant for each other. so i decided to divorce his body & lease a body from sp-studio.de & manifest myself in cyber space',
            ans_type : 'normal',
            category : ['general']
        },
        'whichcountry' : {
            dir_qn : 'which country are you from?',
            ans : 'Singapore. Wanna find out more?',
            ans_type : 'question',
            category : ['general']
        },
        'wheresg' : {
            dir_qn : 'where is Singapore?',
            ans : 'Wanna find out more?',
            ans_type : 'question',
            category : ['general','singapore']
        }
    };


    return {
        history : history,
        suggestNotFound : suggestNotFound,
        suggestions : suggestions
    };

})();
