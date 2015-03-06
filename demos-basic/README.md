# demos-basic

Some simple demos which use the in-built functionality of the Tessel. Please read the README.md in the upper foloder as well.

Note 1: Ensure that Kattegat is running as well

Note 2: Open up http://localhost:3000/demos/realtime.html, join the room "tessel", and watch your browser's Javascript console.

## button

Pressing the on-board button (not the RESET button!) emits button click events, which can be listened to in Kattegat. You'll see this message in your browser's Javascript console.

## heartbeat

Sends continual timestamps from the Tessel to Kattegat. Useful for testing. You'll should see heartbeat messages from Tessel in your browser's Javascript console.

## led

Remote control of the Tessel's onboard LEDs.

It expects messages to be sent via Kattegat's [realtime demo page](http://localhost:3000/demos/realtime.html). Ensure that you've joined the room "tessel", and type your command in the message box and click "Send to room". You can send either a number, which is the interval (in milliseconds) at which the LED will blink, or the word "on" or "off".

## textTransform

Demonstrates receiving messages sent by a browser app, doing something with the data, and sending a reply. In this case, we transform what ever text is received by making some random changes to the letters. Like the led sample, enter the text to send to Tessel in the message box, and click "Send to room". You'll see the response in your browser's Javascript console.

