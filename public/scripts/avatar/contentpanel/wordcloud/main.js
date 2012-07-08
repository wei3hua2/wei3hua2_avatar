wei3hua2.word_cloud_main = (function(){
    
    if(!d3 || !d3.layout)throw new Error('d3 undefined');
    
    var list = [
                {key:'aaaa',value:3},
                {key:'ccc',value:2},
                {key:'eeee',value:1},
                {key:'popo',value:1},
                {key:'qwqqq',value:1},
                {key:'erttrt',value:10},
                {key:'hahaa',value:8},
                {key:'wei',value:1},
                {key:'lol',value:4}];
    
    var startWordCloud = function(){
        var display =  new wei3hua2.word_cloud_main_display(list);
    }
    
    
    return {
        startWordCloud : startWordCloud
    };
})();