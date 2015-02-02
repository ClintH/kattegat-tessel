// This is a slight modification of:
// https://github.com/tessel/docs/blob/master/tutorials/usb_messages/host.js

var io = require("socket.io-client"),
 tessel = require("tessel"),
 async = require("async"),
 fs = require("fs"),
 path = require("path"),
 argv = require("minimist")(process.argv.slice(2));

var device = null; // initialised later - Tessel device
var kconn = null;  // also init'd later for the Socket.io connection

var kattegatUrl = argv.kattegat || "http://localhost:3000";
var script = argv.script || argv._[0];
var room = argv.room || "tessel";

if (typeof(script) == 'undefined') {
  console.log("Error: Script not specified.\n\n" +
  " Specify the script to run on the Tessel, eg:\n" +
  "  node app.js --script=device/myScript.js\n" +
  " Which will run 'device/myScript.js' on the Tessel.");
  return;
}

var connectKattegat = function(cb) {
  kconn = io(kattegatUrl, {multiplex:false});

  var forwardJson = function(evt, d) {
    sendQueue.push({evt:evt, payload:d});
  }

  // Connect and listen to events from Kattegat side
  console.log("Attempting connection to Kattegat (" +  kattegatUrl + ")");
  kconn.on('connect', function() {
    console.log("...connected!, joining room '" + room +"'");
    kconn.emit("join", {room:room});

    // Listen for events to forward to the Tessel
    kconn.on('hello', function(d) { forwardJson('hello', d) });
    kconn.on('join', function(d) { forwardJson('join', d) });
    kconn.on('leave', function(d) { forwardJson('leave', d) });
    kconn.on('say', function(d) { forwardJson('say', d) });
    kconn.on('list', function(d) { forwardJson('list', d) });
    kconn.on('rooms', function(d) { forwardJson('rooms', d) });
    kconn.on('data', function(d) { forwardJson('data', d) });

    kconn.on('disconnect', function() {
      console.log("Disconnected from Kattegat");
    })
    
    // Notify success
    cb();
  });
}

var connectTessel = function(cb) {
  var opts = {
    stop: true, // Stop existing script, if any
    serial: argv.serial // If 'undefined' uses the first available
  }
  var args = [];

  if (script[0] !== "." && script[0] !== "/") {
    script = "./" + script;
  }
  if (script[script.length-1] == "/") {
    script +="app.js";
  }
  
  script = require.resolve(script);
  console.log("Script: " +  script);
  tessel.findTessel(opts, function(err, d) {
    if (err) return cb(err);
    device = d;
    device.run(script, args, {}, initDevice(cb));
  
    // Stop Tessel script if we stop
    process.on('SIGINT', function() {
      device.stop();
      setTimeout(function() {
        console.log('Tessel script aborted');
        process.exit(131);
      }, 200)
    });
  });
}

var initDevice = function(cb) {
  // Hook up Tessel's error and output so
  // it shows up in the same console streams
  device.stdout.resume();
  device.stdout.pipe(process.stdout);
  device.stderr.resume();
  device.stderr.pipe(process.stdout);

  device.on('message', function(m) {
    // Print out raw message received from the Tessel
    console.log(m);

    // Add room identifier
    m.room = room;
    
    // Send packet to Kattegat
    kconn.emit("say", m);
  });

  // Stop this script if the script on Tessel stops
  device.once('script-stop', function(code) {
    device.close(function() {
      process.exit(code);
    })
  });
  
  // Received a file (send on Tessel via process.sendfile)
  device.on('rawMessage:4113', function (data) {
    var upload_dir = argv['upload'] || ".";
    try {
      var packet = require('structured-clone').deserialize(data);
      var dest = path.resolve(upload_dir, path.basename(packet.filename));

      // If the image name we received from the Tessel starts with 'kat-'
      // don't save it to disk, but send it out via Kattegat instead
      if (packet.filename.substr(0,4) == "kat-") {
        // Encode image and send it to Kattegat
        kconn.emit("say", {
          room: room, 
          image: packet.buffer.toString("base64")
        });
        console.log("Emitted image");
      } else {
        // Write image to the filesystem
        fs.writeFileSync(dest, packet.buffer);
        console.log("File saved: " + dest);
      }
    } catch (e) {
      console.log('Invalid sendfile packet received.');
      console.dir(e);
    }
  });

  // Notify ready
  cb();
}

var sendQueue = async.queue(function(task, callback) {
  //console.log("Sending to Tessel: ", task);
  device.send(task);
  callback();
}, 1);

connectTessel(function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to Tessel, now attempting to connect to Kattegat");
  connectKattegat(function(err) {
    if (err) {
      console.log(err);
      return;
    }
  });
})

