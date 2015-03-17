// Emits pulse data
// Check README.md for more
var tessel = require('tessel'),
	pulseLib = require('pulsesensor'),
  pulse = pulseLib.use(tessel.port['GPIO'].pin['A1']);

pulse.on('ready', function() {
  console.log("Pulse module ready");
  pulse.on('beat', function(time) {
    console.log("Bpm: " + pulse.BPM);
    
    // Send BPM off
    process.send({bpm:pulse.BPM});
  });
});


// Keep the event loop alive
process.ref();