const path = require("path");
const http = require("http");
const express = require("express");
const ejsMate = require("ejs-mate");
const socketio = require("socket.io");
const router = require("./routes/jwtAuth");

//create the server
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.json());
app.use(router);

const PORT = process.env.PORT;
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

//Login and register

app.get("/auth/register", (req, res) => {
  res.render("register");
});

app.get("/auth/login", (req, res) => {
  res.render("login");
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
