const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

// Server logic from here

let count = 0;

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.emit("countUpdated");

  socket.on("increment", () => {
    count++;
    // socket.emit("countUpdated", count);
    io.emit("countUpdated", count);
  });

  socket.on("sendMessage", (msg) => {
    socket.broadcast.emit("message", `A user sent: ${msg}`);
  });
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
