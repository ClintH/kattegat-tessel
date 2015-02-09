# demo-rfid

A basic demo of using the RFID module.

Read more:
 * http://start.tessel.io/modules/rfid
 * http://tessel.io/docs/rfid

# Installing

* Unplug the Tessel from your computer
* Plug the RFID module into port 'A' and 'B' of the Tessel, making sure the hexagon icon faces upward.
* In the demo-rfid directory, run `npm install`

# Demo

There is just one demo of the RFID module, which you can upload to your Tessel via:

```
node app demo-rfid/
```

The demo prints a message when a card is read, blinks the LEDs, and emits the ID of the card to Kattegat.

A companion Kattegat sketch shows you how to use this message in a web app.