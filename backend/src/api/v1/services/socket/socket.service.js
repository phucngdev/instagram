module.exports.socketConnect = () => {
  return (socket) => {
    // gửi tin nhắn
    socket.on("sendDataClient", (data) => {
      // emit để gửi đến client
      _io.emit("sendDataServer", { data });
    });

    // gửi thông báo
    socket.on("newNotification", (data) => {
      // Sau đó gửi tin nhắn đến tất cả các người dùng kết nối
      _io.emit("notification", { data });
    });

    // disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  };
};
