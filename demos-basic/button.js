// Emits an event when the button is pressed
// Check README.md for more

var tessel = require('tessel');

tessel.button.on('press', function(time) {
 process.send({evt: 'press', time: time}); 
})

tessel.button.on('release', function(time) {
  process.send({evt: 'release', time: time});
});

// Keep the event loop alive
process.ref();