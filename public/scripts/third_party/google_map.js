wei3hua2.third_party_google_map = (function() {

    var static_map;
    var map;

    var initGoogleMap = function() {
        if(!map) {
            var myOptions = {
                center : new google.maps.LatLng(1.351, 103.834),
                zoom : 10,
                mapTypeId : google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("map_content"), myOptions);
        }
    }
    var defaultMapConfig = {
        zoom : 10,
        size : {
            width : 500,
            height : 300
        },
        maptype : 'roadmap',
        center : 'Singapore',
        sensor : 'false',
        apiKey : 'AIzaSyDXX2gF2RT5rGFsgqyTj9C3UuuXWjVW_po'
    }
    var initStaticMapImage = function() {

        if(!img) {
            static_map = _genImageElement();
            // img.addEventListener('click',function(){
            // window.open('http://maps.google.com.sg');
            // });

            document.getElementById('map_content').appendChild(static_map);
        }
    }
    var _genImageElement = function() {
        var img = new Image();
        var url = _genStaticMapUrl(defaultMapConfig);
        img.src = url;

        return img;
    }
    var _genStaticMapUrl = function(config) {
        var url = 'http://maps.googleapis.com/maps/api/staticmap?';

        var key = 'key=' + config.apiKey;
        var sensor = '&sensor=' + config.sensor;

        var zoom = (config.zoom) ? '&zoom=' + config.zoom : '';
        var size = (config.size) ? '&size=' + config.size.width + 'x' + config.size.height : '';
        var maptype = (config.maptype) ? '&maptype=' + config.maptype : '';
        var center = (config.center) ? '&center=' + config.center : '';

        return url.concat(key, sensor, zoom, size, maptype, center);
    }
    return {
        initGoogleMap : initGoogleMap,
        initStaticMapImage : initStaticMapImage
    }
})();
