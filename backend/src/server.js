const http = require("http");
const app = require("./app");
const server = http.createServer(app);
require("dotenv").config();
const connectDB = require("./config/connect");
const socketService = require("./api/v1/services/socket/socket.service");

// kết nối db mongodb
connectDB();

// tạo và connect socket
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
global._io = socketIo;

global._io.on("connection", socketService.socketConnect());

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server run http://localhost:${PORT}`);
});
