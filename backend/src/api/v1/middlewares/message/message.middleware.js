const { Account } = require("../../models/Account.model");
const { Message } = require("../../models/Message.model");
const { RoomChat } = require("../../models/RoomChat.medel");

module.exports.checkUserSendMes = async (req, res, next) => {
  const { roomId, senderId, receiverId } = req.body;
  const findRoom = await RoomChat.findById(roomId);
  const findSender = await Account.findById(senderId);
  const findReceiver = await Account.findById(receiverId);
  if (!findRoom) return res.status(404).json({ message: "room not found" });
  if (!findSender || !findReceiver)
    return res.status(404).json({ message: "user not found" });
  // Kiểm tra xem cả người gửi và người nhận có trong phòng chat không
  const isSenderMember = findRoom.member.some((member) =>
    member._id.equals(senderId)
  );
  const isReceiverMember = findRoom.member.some((member) =>
    member._id.equals(receiverId)
  );
  if (!isSenderMember || !isReceiverMember) {
    return res.status(400).json({ message: "Lỗi không ở trong phòng chat" });
  }
  const isInTheRoom = findReceiver.roomchat.some((room) =>
    room._id.equals(roomId)
  );
  if (!isInTheRoom) {
    findReceiver.roomchat.unshift(roomId);
    await findReceiver.save();
  }
  next();
};

// kiểm tra chưc năng xoá mes
module.exports.checkUserAndMesIdAndRoonId = async (req, res, next) => {
  const { userId, roomId, messageId } = req.body;
  const findUser = await Account.findById(userId);
  if (!findUser) {
    return res.status(404).json({ message: "User not found" });
  }
  const findRoom = await RoomChat.findById(roomId);
  if (!findRoom) {
    return res.status(404).json({ message: "Room not found" });
  }
  const findMess = await Message.findById(messageId);
  if (!findMess) {
    return res.status(404).json({ message: "Message not found" });
  }
  // Kiểm tra xem người dùng có trong phòng chat không
  const userInRoom = findRoom.member.some((member) =>
    member._id.equals(userId)
  );
  if (!userInRoom) {
    return res.status(403).json({ message: "User not in room" });
  }
  // Kiểm tra tin nhắn trong phòng chat
  const messageInRoom = findRoom.contentInbox.some((inbox) =>
    inbox._id.equals(messageId)
  );
  if (!messageInRoom) {
    return res.status(404).json({ message: "Message not found in room" });
  }
  next();
};
