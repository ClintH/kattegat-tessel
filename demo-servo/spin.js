// Rotates the servo at one of three speeds.
// Check README.md for more info

var tessel = require('tessel'),
	servoLib = require('servo-pca9685'),
  servo = servoLib.use(tessel.port['C']); // Servo module plugged in port 'C'

// Servo plugged in at position 1 on the servo module board
var servo1 = 1;
var position = 0.0;
var vector = 0.1; // Move in 10% increments
var updateSpeed = 500; // 500ms

servo.on('ready', function() {
  // Servo module is ready
  
  // Configure servo (see README for what these numbers are about)
  servo.configure(servo1, 0.05, 0.12, function() {
    console.log("Servo " + servo1 + " configured.");
    
    // Move to initial position
    servo.move(servo1, position);

    // Start interval so 'run' is executed every 'updateSpeed' milliseconds
    setInterval(run, updateSpeed);
  });
})

// User can change speed by pressing button on the Tessel
tessel.button.on('press', function() {
  var newVector = vector;
  
  if (Math.abs(vector) == 0.01) {
    newVector = 0.1;
  } else if (Math.abs(vector) == 0.1) {
    newVector = 0.25;
  } else {
    newVector = 0.01;
  }

  // Make a negative vector if it was before
  if (vector < 0.0) newVector *= -1.0;
  vector = newVector; // This change will be picked up next time 'run' runs
});

// This is periodically called according to 'updateSpeed' milliseconds
function run() {
  var newPos = position + vector;
  if (vector > 0 && newPos > 1.0) {
    // Incrementing, and we went past the maximum
    // therfore start decrementing down to zero
    newPos = 1.0;
    vector = vector * -1.0; // Convert to a negative
  } else if (vector < 0 && newPos < 0.0) {
    // Decrementing, and we went past the minimum
    // therefore start incrementing up to 1
    newPos = 0.0;
    vector = vector * -1.0; // Convert to a positive 
  }

  // Final sanity check
  if (newPos > 1.0) newPos = 0.0;
  if (newPos < 0.0) newPos = 1.0;
  
  // Print a debug message, move the servo, and keep track of position
  console.log("Moving to: " + newPos + " vector: " + vector);
  servo.move(servo1, newPos);
  position = newPos;
}

// Keep the event loop alive
process.ref();