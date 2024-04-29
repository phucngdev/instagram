const routerRoomChat = require("express").Router();
const roomController = require("../../controllers/roomChat/roomChatController");
const roomValidation = require("../../validations/room/roomValidation");
// tạo room chat mới
routerRoomChat.post("/createroom", roomController.createRoom);

// tạo room chat 1 vs 1 mới
routerRoomChat.post(
  "/createroomsingle/:id",
  roomValidation.validationCreateRoom,
  roomController.createRoomSingle
);

// lấy tất cả phòng chat
routerRoomChat.get("/direct/:id", roomController.getAllRoom);

// lấy thông tin phòng chat
routerRoomChat.get("/direct/:userId/:roomId", roomController.getRoom);

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

routerRoomChat.post("/leaveroom/:id", roomController.leaveRoom);

module.exports = routerRoomChat;
