// Controls the servo from a Kattegat sketch
// Check README.md for more info

var tessel = require('tessel'),
	servoLib = require('servo-pca9685'),
  servo = servoLib.use(tessel.port['C']); // Servo module plugged in port 'C'

// Servo plugged in at position 1 on the servo module board
var servo1 = 1;

servo.on('ready', function() {
  // Servo module is ready
  
  // Configure servo (see README for what these numbers are about)
  servo.configure(servo1, 0.05, 0.12, function() {
    console.log("Servo " + servo1 + " configured.");

    process.on('message', function(msg) {
      if (msg.evt !== "say") return;
      var payload = msg.payload;
      if (payload.command == "position") {
        // Sanity-check position
        var v = payload.value;
        if (v > 1.0) v = 1.0;
        else if (v < 0.0) v = 0.0;

        // Move servo to position
        console.log("Moving to " + v);
        servo.move(servo1, v);
      }
    });
  });
})


// Keep the event loop alive
process.ref();