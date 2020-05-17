require("dotenv").config();
const server = require("./server");
const PORT = process.env.PORT || 5000;

server.get("/", (req, res) => {
	res.send(`
          <h1>This is a test!</h1>
      `);
});

if (process.env.NODE_ENV != "test") {
	server.listen(PORT, () =>
		console.log(`Listening on port http://localhost:${PORT}`)
	);
}

// Export for test
module.exports = server;
