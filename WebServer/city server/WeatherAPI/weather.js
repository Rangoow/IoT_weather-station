
var http = require('http');

module.exports.retrieveWeather = function (cityName, callback){
    if (typeof cityName === 'string') {
        link = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&lang=fr&appid=a28aa797e78814860d441a08242c554b'
        var options = {
            host: 'api.openweathermap.org',
            port: 80,
            path: '/data/2.5/weather?q=' + cityName + '&units=metric&lang=fr&appid=a28aa797e78814860d441a08242c554b',
            method: 'GET',
          };
        
          var httpreq = http.request(options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
              chunk = JSON.parse(chunk);
              callback({ name: chunk.name });
            });
            
          });
          httpreq.end();
            //.then(jsonRespsonse => callback({ name: jsonRespsonse.name, temperature: jsonRespsonse.main.temp, humidity: jsonRespsonse.main.humidity }));
    }else{
        console.log("Not a string");
    }

}



