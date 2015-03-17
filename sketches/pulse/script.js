var socket = null;
var lastBpm = 0;
var displayClear = null;

$(document).ready(function() {
	// Connect realtime stuff up
	socket = io.connect("http://" + window.location.host);
	
	// Join the Tessel room
	socket.emit("join", {room:"tessel"});

	// Listen for data coming in
	socket.on("say", onSay);
})

function clearBpm() {
	$("#bpm").text("--");
}

function onSay(e) {
	// Keep track of the last bpm
	lastBpm = e.bpm;

	// Show bpm
	$("#bpm").text(Math.floor(lastBpm));
	
	// If we don't get a new value within 5000ms,
	// run clearBpm to indicate the value is not valid
	if (displayClear != null)
		clearTimeout(displayClear);
	displayClear = setTimeout(clearBpm, 5000);
}
