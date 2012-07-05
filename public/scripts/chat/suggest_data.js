wei3hua2.suggest_data = (function() {
    var history = [];
    var suggestNotFound = {
        ans : 'Huh? i don\'t understand what ya mean..',
        action : 'normal'
    };
    var suggestions = {
        'who are you?' : {
            ans : 'wei3hua2',
            action : 'normal',
            category : ['general']
        },
        'you are cute!' : {
            ans : 'thank you',
            action : 'normal',
            category : ['general']
        },
        'why am i here?' : {
            ans : 'probably looking for my alter ego, James Chong',
            action : 'normal',
            category : ['general']
        },
        'what can you do?' : {
            ans : 'i can do many things',
            action : 'normal',
            category : ['general']
        },
        'hi' : {
            ans : 'wassup..',
            action : 'normal',
            category : ['general']
        },
        'i love you' : {
            ans : 'you don\'t know what love means',
            action : 'normal',
            category : ['general']
        },
        'poor thing' : {
            ans : 'nah, i\'m not the self-pity kinda guy',
            action : 'normal',
            category : ['general'],
            dunShowInSuggest : true
        },
        'nevermind' : {
            ans : 'Alrighty, cool..',
            action : 'normal',
            category : ['general'],
            dunShowInSuggest : true
        },
        'boring' : {
            ans : 'Want me to recommend some interesting site?',
            action : 'normal',
            category : ['general'],
            dunShowInSuggest : true
        },
        'any sites to recommend?' : {
            ans : '9gag.com... Let me show you some interesting stuff?',
            action : 'question',
            category : ['general']
        },
        'who is James Chong' : {
            ans : 'He\'s my alter ego. We been sharing a body for decades years. Sharing shit with asshole is never easy, nature had it that both are meant for each other. so i decided to divorce his body & lease a body from sp-studio.de & manifest myself in cyber space',
            action : 'normal',
            category : ['general']
        },
        'which country are you from?' : {
            ans : 'Singapore. Wanna find out more?',
            action : 'question',
            category : ['general']
        }
    };


    return {
        history : history,
        suggestNotFound : suggestNotFound,
        suggestions : suggestions
    };

})();
