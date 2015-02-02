# demos-basic

Some simple demos which use the in-built functionality of the Tessel. Please read the README.md in the upper foloder as well.

## button

Pressing the on-board button (not the RESET button!) emits button click events, which can be listened to in Kattegat.

## heartbeat

Sends continual timestamps from the Tessel to Kattegat. Useful for testing.

## led

Remote control of the Tessel's onboard LEDs.

It expects messages to be sent via Kattegat's realtime demo page. You can send either a number, which is the interval at which the LED will blink, or the word "on" or "off".

## textTransform

Demonstrates receiving messages sent by a browser app, doing something with the data, and sending a reply. In this case, we transform what ever text is received by making some random changes to the letters.

