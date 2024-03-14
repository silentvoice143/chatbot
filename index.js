//index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const http = require("http");
const socketIo = require("socket.io");

const generateText = require("./openai");
const app = express();
const port = 3000;

//create http server using express app.
const Server = http.createServer(app);

//attach socker.io
const io = socketIo(Server);
// app.use(cors);
// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Serve static files from the public directory
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log("client connected");
  socket.on("message", async (data) => {
    // console.log(data);

    var res = await generateText(data);
    socket.emit("response", res);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

Server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
