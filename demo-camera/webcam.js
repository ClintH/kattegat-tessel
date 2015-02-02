// Takes continual images, sending them out via Kattegat
// Make sure you README.md first
var tessel = require('tessel'),
	camera = require('camera-vc0706').use(tessel.port['A']);

// It's not possible to go much faster than this without
// clogging the Tessel. To go faster, reduce the size
// of captured images (see the Tessel docs)
var intervalMs = 2000;

// Only start timer if the camera reports it is ready
camera.on("ready", function() {
  // Call 'takePicture' every intervalMs
  setInterval(takePicture, intervalMs);

})


function takePicture() {
  // Note: sometimes you'll get the "Taking picture..." message
  // but nothing happens. In this case, unplug the Tessel and try again.
	console.log("Taking picture...");  
  camera.takePicture(function(err, image) {
  	if (err) {
  	 console.log("Error taking picture: " + err);
  	 return;
    }
    
    // We have to be a bit tricky to send the data via Kattegat
    // because it is too slow to process the images on the 
    // Tessel itself. By prefixing the name of the image with "kat-"
    // instead of image, the kattegat-tessel helper will do the
    // hardwork for us. Note that the image is not actually saved to disk.
  	var name = "kat-" + Math.floor(Date.now()/1000) + '.jpg';
    process.sendfile(name, image);
  });
}

camera.on('error', function(err) {
	console.log("Camera error: " + err);
})

// Keep the event loop alive
process.ref();