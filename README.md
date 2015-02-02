kattegat-tessel
===============

Kattegat-tessel helps you get started for integrating a [Tessel](http://tessel.io) into a [Kattegat](https://github.com/ClintH/kattegat/) project.

Note: This code is **only** for working with a USB-connected Tessel.

# What does it do?

Kattegat-tessel is a very simple bridge between Kattegat's realtime message passing (via Socket.io), and the USB serial connection of the Tessel. For example, a bit of data you send from a Kattegat sketch running on your phone can flow to Javascript code running on your Tessel. Likewise, a sketch running on your phone can use data emitted from the Tessel.

# Install

If you haven't installed the Tessel tools, do so:

```
npm install -g tessel
```

Install kattegat-tessel:

```
npm install kattegat-tessel
```

You should plug in the Tessel via USB and ensure wait for a bit while drivers get installed.

If you have a new board, it's also worth updating to the latest firmware:

```
tessel update
```


# Running

```
node app.js *your script*
```

Eg:

```
node app.js demos-basic/heartbeat.js
```

# Demos

There are some demo sketches included.

Use Kattegat's realtime demo page (/demos/realtime.html) as a simple way of testing that it's working. Load the demo, scroll down to the "Rooms" section, put in "tessel" as the room, click "Join", and then send messages to the Tessel by typing in the "Message" box and hitting "Send to room". Make sure you view the console to see the responses - nothing will appear in the web page itself.

Please check out the README.md included in each demo directory

Overview of demos:
* demos-basic/heartbeat: Sends a timestamp every second (useful as a first test)
* demos-basic/textTransform: Messages sent from demo page will be echoed back by the Tessel a bit mangled
* demos-basic/led: Demonstrates remote controlling Tessel. You can send either a number, which becomes the rate at which the on-board LED blinks (eg '1000'), or the text commands "on" or "off" which do what you expect.
* demos-basic/button: Demonstrates doing something with input from a Tessel, press and release of the on-board button will send a message
* demo-servo/: Set the position of the servo remotely, or initiate a loop for changing the position continually
* demo-climate/: Sends the humidity and temperature values from the sensor
* demo-camera/camera: Saves an image from the camera when ever the on-board button is pressed
* demo-camera/webcam: Broadcasts images to Kattegat, includes a sketch to render in the browser 

Most of these demos built from the samples provided by Tessel.

# Communication with Kattegat via USB

In your script that runs on the Tessel, you can send data to Kattegat with:

```
process.send(*msg*); 
```

Where *msg* is the simple object you want to send.

To receive or use data that originates from Kattegat, use the following event handler:

```
process.on('message', function(msg) {
	// do something with 'msg'
});
```

# Options

--kattegat: Url of Kattegat server. Defaults to http://localhost:3000

--room: Room to join and listen to data, and destination for data from Tessel. Defaults to 'tessel'

--upload: Path to save uploaded files (eg from the camera module)

Eg:

```node app.js --kattegat=http://blah.com --room=myApp device/myScript.js```

# Gotchas

* Sometimes Tessel code will silently fail without giving an exception, particularly for code running in an event handler.
