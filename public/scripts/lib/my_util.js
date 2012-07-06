wei3hua2.util = (function(){

    var parseTimeDifference = function(dateTime){
        var cur = new Date();
        var diff = cur.getTime() - dateTime;
        
        diff /= 1000; //seconds
        
        var day = parseInt(diff / (60*60*24));

        diff = diff % (60*60*24);
        
        hr = parseInt(diff / (60*60));
        diff = diff % (60*60);
        
        min = parseInt(diff / 60);
        diff = parseInt(diff % 60);
        
        var sec = diff;
        
        if(day!==0){
            if(day===1)return 'a day ago';
            else return 'a few days ago';
        } 
        else if(hr!==0){
            if(hr===1)return 'an hour ago';
            else return hr+' hours ago';
        }else if(min!==0){
            if(min===1)return 'a minute ago';
            else return min+' minutes ago';
        }else{
            return 'most recent';
        }
    }


    return {
        parseTimeDifference : parseTimeDifference
    }
})();
