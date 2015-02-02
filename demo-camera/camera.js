// Takes a photo when you press the Tessel button
// Make sure you README.md first
var tessel = require('tessel'),
	camera = require('camera-vc0706').use(tessel.port['A']);

tessel.button.on('release', function(time) {
	console.log("Taking picture");  
  // Assume camera is ready
  camera.takePicture(function(err, image) {
  	if (err) {
  		return console.log("Error taking picture: " + err);
  	}

  	// Name the image
  	var name = "img-" + Math.floor(Date.now()/1000) + '.jpg';
  	console.log("Saving: " + name);
  	process.sendfile(name, image);
  });
});

camera.on('error', function(err) {
	console.log("Error: " + err);
})

// Keep the event loop alive
process.ref();