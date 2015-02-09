var socket = null;

$(document).ready(function() {
	// Connect realtime stuff up
	socket = io.connect("http://" + window.location.host);

	// Join the Tessel room
	socket.emit("join", {room:"tessel"});

	// Listen for data coming in
	socket.on("say", onSay);
})

function onSay(e) {
	console.dir(e);

	// Show the latest card id
	$("#lastId").text(e.id);

	// If the id is something special...
	if (e.id == "001") { // My id card
		$("#specialResult").html(
			'Hi there!'
		);
	} else if (e.id == "002") { // My rejsekort
		$("#specialResult").html(
			"Metro!"
		);
	} else {
		$("#specialResult").html("");
	}
}
