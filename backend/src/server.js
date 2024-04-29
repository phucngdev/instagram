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
  socket.on("sendDataClient", function (data) {
    socketIo.emit("sendDataServer", { data });
  });
  socket.on("newNotification", (data) => {
    // Sau đó gửi tin nhắn đến tất cả các người dùng kết nối
    socketIo.emit("notification", { data });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server run http://localhost:${PORT}`);
});
