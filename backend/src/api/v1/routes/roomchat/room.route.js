const routerRoomChat = require("express").Router();
const roomController = require("../../controllers/roomChat/roomChatController");
// tạo room chat mới
routerRoomChat.post("/createroom", roomController.createRoom);

// lấy thông tin phòng chat
routerRoomChat.get("/:id", roomController.getRoom);

// xoá roomchat
routerRoomChat.delete("/deleteroom/:id", roomController.deleteRoom);

// sửa tên roomchat
routerRoomChat.post("/updateroomname/:id", roomController.updateRoomName);

// thêm user vào roomchat
routerRoomChat.post("/addtoroom/:roomId/:userId", roomController.addUserToRoom);

// xoá user khỏi room chat
routerRoomChat.delete(
  "/deletefromroom/:roomId/:userId':adminId",
  roomController.removeUserFromRoom
);

module.exports = routerRoomChat;
