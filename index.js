const pid = process.pid;
const cluster = require('cluster');
const os = require('os');
const cpus = os.cpus().length;
const withChat = require('./routes/chat/chat');

require("dotenv").config();
const server = require("./server");
const PORT = process.env.PORT || 5000;

if (cluster.isMaster){
	console.log(`
	
    ____________________________________________
   |    ___                                     |
   |   (^0^)  < Running CoachMe Server workers  |
   |  /(___)                                    |
   |    ^ ^		                        |
   |____________________________________________|
	`)
	for (let i = 0; i<cpus; i++){
		cluster.fork()
	}
} else { 
	server.get("/", (req, res) => {
		res.send(`
			<h1>This is a test!</h1>
		`);
	});

	if (process.env.NODE_ENV != "test") {
		withChat(server.listen(PORT, () =>
			console.log(`Listening on port ${PORT} PID: ${process.pid}`)
		));
	}
}

// Export for test
module.exports = server;
