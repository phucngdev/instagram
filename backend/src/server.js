const http = require("http");
const app = require("./app");
const server = http.createServer(app);
require("dotenv").config();
const connectDB = require("./config/connect");

// kết nối db mongodb
connectDB();

// tạo và connect socket
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

socketIo.on("connection", (socket) => {
  // console.log("New client connected" + socket.id);
  // socket.emit("getId", socket.id);
  socket.on("sendDataClient", function (data) {
    console.log(data);
    socketIo.emit("sendDataServer", { data });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server run http://localhost:${PORT}`);
});
