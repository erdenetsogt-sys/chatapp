const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`joined room: ${data}: ID:${socket.id}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected ", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server running");
});
