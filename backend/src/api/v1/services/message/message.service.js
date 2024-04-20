const { RoomChat } = require("../../models/RoomChat.medel");
const { Account } = require("../../models/Account.model");
const { Message } = require("../../models/Message.model");

// gửi tin nhắn
module.exports.sendMesSingleService = async (req) => {
  const { roomId, senderId, receiverId, content } = req;
  const findRoom = await RoomChat.findById(roomId);
  // tạo tin nhắn
  const newMessage = new Message({
    sender: senderId,
    receiver: receiverId,
    roomchatId: roomId,
    content: content,
  });
  await newMessage.save(); // lưu tin nhắn
  // lưu tin nhắn vào cả 2 user
  findRoom.contentInbox.push(newMessage);
  await findRoom.save(); // lưu thông tin room sau khi lưu tin nhắn
  return {
    status: 201,
    message: "Gửi thành công",
  };
};

// xoá tin nhắn
module.exports.deleteMesService = async (req) => {
  const { roomId, messageId } = req;
  const findRoom = await RoomChat.findById(roomId);
  // xóa tin nhắn
  await Message.findByIdAndDelete(messageId);
  // Xóa tin nhắn khỏi danh sách tin nhắn của phòng chat
  findRoom.contentInbox.pull(messageId);
  await findRoom.save();
  return {
    status: 200,
    message: "Xoá thành công",
  };
};
