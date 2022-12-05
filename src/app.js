const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("<h1>Hello World<h1>");
    res.end();
  }
});

server.on("connection", (socket) => {
  console.log("New connection...");
});

const portNo = 5000;
server.listen(portNo);
console.log("Listening on port " + portNo);
