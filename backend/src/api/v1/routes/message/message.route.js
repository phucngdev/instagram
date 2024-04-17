const routerMessage = require("express").Router();

// dự định lấy thông tin các phòng chat
routerMessage.get("/inbox");

// dự định lấy tin nhắn theo id room
routerMessage.get("/:id");

// dự định gửi tin nhắn theo id room
routerMessage.post("/:id");

module.exports = routerMessage;
