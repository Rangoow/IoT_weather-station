
var http = require('http');

module.exports.retrieveESPWeather = function (callback){

        var options = {
            host: 'api.thingspeak.com',
            port: 80,
            path: '/channels/997472/feeds.json?api_key=CBO5J9VCE5IQ5EA3&results=1',
            method: 'GET',
          };
        
          var httpreq = http.request(options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
              chunk = JSON.parse(chunk);
              callback({ localName: 'actual location', localTemperature: chunk.feeds[0].field1, localHumidity: chunk.feeds[0].field2});
            });
            
          });
          httpreq.end();
  

}
