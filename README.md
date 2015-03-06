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

You should now connect the Tessel to your computer with the USB cable. You might need to wait a moment or two for your computer to configure itself.

If you have a new board, it's also worth updating to the latest firmware:

```
tessel update
```

Let's presume you want to install kattegat-tessel as part of a new Kattegat project (and assuming you've already [installed Kattegat](https://github.com/ClintH/kattegat/blob/master/INSTALL.md))

First make a new directory for your project, enter it, and generate a project:

```
mkdir module02
cd module02
yo kattegat
```

Now install kattegat-tessel:

```
npm install kattegat-tessel
```

This places the package under `node_modules/kattegat-tessel`, and what we want to do is make a copy so we can edit it. We also want to copy the included Kattegat sketches to the public directory so they can be opened in the browser:

```
cp -R node_modules/kattegat-tessel/ tessel/
cp -R tessel/sketches/ public/tessel/
```

Start Kattegat (`node app`), and open a new command prompt / terminal. This way Kattegat can run while we do stuff with kattegat-tessel. Make sure the new terminal is in the same directory as your Kattegat project. Now, enter the 'tessel' directory (`cd tessel`), and you are ready to run scripts as per the next section.

The included Kattegat sketches can be opened in your browser. For example: http://localhost:3000/tessel/rfid/

# Running

(Make sure you have Kattegat running in another terminal tab)

```
node app.js *your script*
```

Eg:

```
node app.js demos-basic/heartbeat.js
```

Hit CTRL+C to exit the sketch.

Some demos require additional packages to be installed, so if you get an error about a missing library, `cd` into the directory, run `npm install`, and then `cd ..` to go back up a level. Eg:

```
cd demos-servo
npm install
cd ..
```


# Demos

There are some demos included. Some of which also have an accompanying "sketch" folder which should be placed in your Kattegat "public" folder.

Please check out the README.md included in each demo directory.

Use Kattegat's realtime demo page (/demos/realtime.html) as a simple way of testing that it's working. Load the demo, scroll down to the "Rooms" section, put in "tessel" as the room, click "Join", and then send messages to the Tessel by typing in the "Message" box and hitting "Send to room". Make sure you view the console to see the responses - nothing will appear in the web page itself.


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

# Read more

* [Modules for the Tessel](https://tessel.io/modules)
* [Tessel documentation](https://tessel.io/docs/home)
* [Tessel forums](https://forums.tessel.io/)

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
* Loading the script will sometimes not work, and you'll get the command prompt straight away. Just re-run 'node app ....' and it should work.
