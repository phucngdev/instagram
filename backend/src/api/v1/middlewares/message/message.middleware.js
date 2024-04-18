const { Account } = require("../../models/Account.model");
const { RoomChat } = require("../../models/RoomChat.medel");

module.exports.checkUserSendMes = async (req, res, next) => {
  const { roomId, senderId, receiverId, content } = req.body;
  const findRoom = await RoomChat.findById(roomId);
  const findSender = await Account.findById(senderId);
  const findReceiver = await Account.findById(receiverId);
  if (!findRoom) return { status: 404, message: "room not found" };
  if (!findSender || !findReceiver)
    return { status: 404, message: "user not found" };
  // Kiểm tra xem cả người gửi và người nhận có trong phòng chat không
  const isSenderMember = findRoom.member.some((member) =>
    member._id.equals(senderId)
  );
  const isReceiverMember = findRoom.member.some((member) =>
    member._id.equals(receiverId)
  );
  if (!isSenderMember) {
    return {
      status: 400,
      message: "Người gửi không ở trong phòng chat",
    };
  }
  // nếu chưa có ngừoi nhận trong member thì thêm vào
  if (!isReceiverMember && findRoom.member.length === 1) {
    findRoom.member.push(receiverId);
    findReceiver.roomchat.unshift(roomId);
    await findRoom.save();
    await findReceiver.save();
  }
  next();
};
