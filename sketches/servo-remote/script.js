var socket = null;

$(document).ready(function() {
	$("#position").on("change", onPositionChange);

	// Connect realtime stuff up
	socket = io.connect("http://" + window.location.host);

})

function onPositionChange(e) {
	// Get value from slider
	var v = $(e.target).val();

	// Convert 0-100 to 0.0-1.0
	v = parseFloat(v) / 100.0;

	// Send to server, which in turn pipes it to
	// the Tessel
	socket.emit("say", {
		command: "position",
		room: "tessel",
		value: v
	});

	console.log("Value: " + v);
}