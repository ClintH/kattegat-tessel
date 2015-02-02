// Controls the hardware LEDs
// Check README.md for more

var tessel = require('tessel');

var timer = null;
var led1 = tessel.led[0].output(1);
var led2 = tessel.led[1].output(0);

// Fires when a message is received from Kattegat
process.on('message', function(msg) {
  if (msg.evt !== "say") return; // Ignore other packets
  var payload = msg.payload;
  if (timer !== null) clearInterval(timer);

  // Ignore if it doesn't contain a 'message' field
  if (typeof(payload.message) == 'undefined') return;
  
  if (payload.message == "off") {
    led1.output(0);
    led2.output(0);
  } else if (payload.message == "on") {
    led1.output(1);
    led2.output(1);    
  } else {
    var value = 0;
    try {
      value = parseInt(payload.message);
    } catch (e) {
      console.log("Could not parse '" + payload.message+"'");
      return;
    }
    led1.output(1);
    led2.output(0);

    timer = setInterval(function() {
      led1.toggle();
      led2.toggle();
    }, value);
  }
});

// Keep the event loop alive
process.ref();