/* 
This "service" waits for packet with a "message" field,
and then sends a response back with random letters changed.

It demonstrates how to use input from another service and send a response.

Check README.md for more
*/
var tessel = require('tessel');

// Fires when a message is received from Kattegat
process.on('message', function(msg) {
  if (msg.evt !== "say") return; // Ignore other packets
  var payload = msg.payload;
  
  // Ignore if it doesn't contain a 'message' field
  if (typeof(payload.message) == 'undefined') return;
  
  var text = "";

  // Randomly convert some characters
  // to uppercase or an * character
  for (var i=0;i<payload.message.length;i++) {
  	var r = Math.random(); 
  	if (r > 0.8) {
  		text += payload.message[i].toUpperCase();
  	} else if (r >0.5) {
  		text += "*";
  	} else {
  		text += payload.message[i];
  	}
  }
	
  // Send back the response
  process.send({message: text});
});

// Keep the event loop alive
process.ref();