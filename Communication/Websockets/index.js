const express = require('express')
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

// http server
const app = express();

// socket server
const server = createServer(app);

// attaching http server to socket server
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat msg", (msg) => {
    console.log("recieved message", msg);
    //broadcast message to evryone
     io.emit("chat msg", msg);
  });
  
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
}); 

const port = process.env.PORT || 3000

// socket.io is attached to server and not app.
server.listen(port, () => {
  console.log("server running on port", port);
}) 