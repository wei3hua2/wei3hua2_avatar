wei3hua2.word_cloud_main = (function(){
    
    if(!d3 || !d3.layout)throw new Error('d3 undefined');
    
    var MAX_WORD_SIZE = 400;
    
    var display,processor;
    var twitlist;
    
    var startWordCloud = function(cb){
        wei3hua2.third_party_twitter_search.generateCorpus(function(corpus,twitList){
            twitlist=twitList;
            processor = new wei3hua2.word_cloud_process_text();
            var list = processor.processText(corpus);
            
            list = list.slice( 0 , Math.min(MAX_WORD_SIZE,list.length) );
            
            display = new wei3hua2.word_cloud_main_display(function(){
                if(cb)cb();
            }, {click:clickEvent});
            
            display.start(list);
        });
    }
    
    var clickEvent = function(tagElement){
        if(twitlist){
            var filteredList = _.filter(twitlist,function(ele){
                return processor.isWordExistInText(ele.text,tagElement.text);    
            });
            
            $('#twit_modal_title').html('on \"'+tagElement.text+'\"');
            
            $('#twit_list').empty();
            _.each(filteredList,function(item){
                var div = document.createElement('div');
                div.setAttribute('class','twit_list_item');
                
                var itemSpan = document.createElement('img');
                itemSpan.setAttribute('class','twit_list_item_pic');
                itemSpan.setAttribute('src',item.imgUrl);
                div.appendChild(itemSpan);
                
                itemSpan = document.createElement('div');
                itemSpan.setAttribute('class','twit_list_item_text');
                itemSpan.innerHTML = item.text;
                div.appendChild(itemSpan);
                
                itemSpan = document.createElement('div');
                itemSpan.setAttribute('class','twit_list_item_username');
                itemSpan.innerHTML = item.username;
                div.appendChild(itemSpan);
                
                itemSpan = document.createElement('div');
                itemSpan.setAttribute('class','twit_list_item_created');
                itemSpan.innerHTML = item.date;
                div.appendChild(itemSpan);
                
                console.log('date ;'+item.date);
                console.log(itemSpan.innerHTML);
                
                $('#twit_list').append(div);
            });
            
            $('#twit_list_modal').modal({
                backdrop : false
            });
        }
    }
    
    var requery = function(keyword){
        wei3hua2.third_party_twitter_search.generateCorpusByKeyword(keyword,function(corpus,twitList){
            twitlist=twitList;
            var processor = new wei3hua2.word_cloud_process_text();
            var list = processor.processText(corpus);
            
            list = list.slice( 0 , Math.min(MAX_WORD_SIZE,list.length) );
            
            display.start(list);
        });
    }
    
    return {
        startWordCloud : startWordCloud,
        requery : requery
    };
})();