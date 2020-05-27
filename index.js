const pid = process.pid;
const cluster = require('cluster');
const os = require('os');
const cpus = os.cpus().length

require("dotenv").config();
const server = require("./server");
const PORT = process.env.PORT || 5000;

if (cluster.isMaster){
	console.log(`
	
	____________________________
   |    ___
   |   (^0^)  <
   |  /(___)
   |    ^ ^
   |____________________________
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

	server.listen(PORT, () =>
		console.log(`Listening on port ${PORT} PID: ${process.pid}`)
	);
}
}

// Export for test
module.exports = server;
