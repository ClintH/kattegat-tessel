// Moves the servo to a random position every second
// Check README.md for more info

var tessel = require('tessel'),
	servoLib = require('servo-pca9685'),
  servo = servoLib.use(tessel.port['C']); // Servo module plugged in port 'C'

// Servo plugged in at position 1 on the servo module board
var servo1 = 1;
var updateSpeed = 1000;

servo.on('ready', function() {
  // Servo module is ready
  
  // Configure servo (see README for what these numbers are about)
  servo.configure(servo1, 0.05, 0.12, function() {
    console.log("Servo will move randomly every " + updateSpeed + "ms.");

    // Start interval so 'run' is executed every 'updateSpeed' milliseconds
    setInterval(run, updateSpeed);
  });
})

// This is periodically called according to 'updateSpeed' milliseconds
function run() {
  var newPos = Math.random();

  // Print a debug message, move the servo, and keep track of position
  console.log(" new position: " + newPos);
  servo.move(servo1, newPos);
}

// Keep the event loop alive
process.ref();