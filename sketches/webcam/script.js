var socket = null;

$(document).ready(function() {

	// Connect realtime stuff up
	socket = io.connect("http://" + window.location.host);
	
	// Listen for data from the Tessel
	socket.on("say", onSay);

	// Join the Tessel room
	socket.emit("join", {room:"tessel"});

})

function onSay(e) {
	// Hide the intro text because everything seems to be working
	$("#intro").hide();
	$("#webcam").attr("src", "data:image/jpeg;base64," + e.image);

}
