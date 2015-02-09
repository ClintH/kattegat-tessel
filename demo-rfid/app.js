// The demo prints a message when a card is read, 
// blinks the LEDs, and emits the ID of the card to Kattegat.
//
// Check README.md for more
var tessel = require('tessel'),
	rfidLib = require('rfid-pn532'),
  rfid = rfidLib.use(tessel.port['A']),
  led = tessel.led[0];

// Turn LED off
led.output(0);

rfid.on('ready', function() {
  console.log("Rfid module ready");
  
  rfid.on('data', function(card) {
    // Cards can also contain data which we might use
    // console.log(card);

    // ...but in this demo, it's just the id we care about
    var cardId = card.uid.toString('hex');
    console.log("Card: " + cardId);

    // Turn LED on and then off again in 200ms
    // to indicate a card was read
    if (cardId == "0defae09") { // Found a target card, do something
      led.output(1);
      setTimeout(function() {
        led.output(0);
      }, 200);      
    }

    // Emit card id to Kattegat
    process.send({evt: 'rfid', id: cardId});
  })
});

// Keep the event loop alive
process.ref();