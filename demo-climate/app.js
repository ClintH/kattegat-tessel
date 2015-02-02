// Emits climate data, sampled every second
// Check README.md for more
var tessel = require('tessel'),
	climateLib = require('climate-si7020'),
  climate = climateLib.use(tessel.port['B']);


var sampleRateMs = 1000;

climate.on('ready', function() {
  console.log("Climate module ready");
  setInterval(function() {
    climate.readTemperature('c', function(err, temp) {
      climate.readHumidity(function(err, humidity) {
        console.log("Temp: " + temp + " Humidty: " + humidity);
        
        // Send data off
        process.send({temp:temp,humidity:humidity});
      })
    });

  }, sampleRateMs);
});


// Keep the event loop alive
process.ref();