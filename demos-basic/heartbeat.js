// Sends a heartbeat from the Tessel every second
// Check README.md for more

var tessel = require('tessel');

var counter = 0;
var interval = 1000;

// Fires when a message is received from Kattegat
process.on('message', function(msg) {
  console.log(msg);
});

setInterval(function() {
  // Send a message to the computer
 process.send({
 	heatbeat: counter++, 
 	when: new Date(), from: "Tessel!"
 });
}, interval);

// Keep the event loop alive
process.ref();