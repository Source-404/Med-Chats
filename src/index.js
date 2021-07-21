//acquire the libraries
const path = require("path");
const http = require("http");
const express = require("express");
const ejsMate = require("ejs-mate");
const socketio = require("socket.io");

//create the server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT;
const publicDirectoryPath = path.join(__dirname, "../public");

//middleware
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(publicDirectoryPath));

//rounting
app.get("/demo", (req, res) => {
  res.render("demo");
});

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

//start the server
server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
