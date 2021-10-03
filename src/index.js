const http = require("http");
require("./db/mongoose");
const express = require("express");
const socketio = require("socket.io");
const router = require("./routes/user");

//create the server
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.json());
app.use(router);

const PORT = process.env.PORT;

//rounting

app.get("", (req, res) => {
  return res.send("Welcome to MedChats");
});

// Server logic from here
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  //receive username and messages from client
  socket.on("messages", (msg) => {
    io.emit("response", msg);
  });
});

//start the server
server.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`);
});
