const { Account } = require("../../models/Account.model");
const accountService = require("../../services/account/account.service");

module.exports.getDataUser = async (req, res) => {
  try {
    const result = await accountService.profile(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// module.exports.getInboxUser = async (req, res) => {
//   try {
//     const inbox = await accountService.getInbox(req.params.id);
//     res.status(200).json(inbox);
//   } catch (error) {
//     console.error("Error retrieving inbox messages:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports.sendInboxUser = async (req, res) => {
//   try {
//     const { senderId, receiverId, content } = req.body;
//     const sender = await Account.findById(senderId);
//     if (!sender) {
//       return res.status(404).json({ message: "Sender not found" });
//     }
//     const receiver = await Account.findById(receiverId);
//     if (!receiver) {
//       return res.status(404).json({ message: "Receiver not found" });
//     }
//     // tìm kiếm userchat trong list chat, lưu trong inbox
//     let senderChat = sender.inbox.find((item) =>
//       item.userchat.equals(receiver._id)
//     );
//     // nếu ko có userchat trong list ngừoi gửi tin thì tạo mới ngừoi nhận
//     if (!senderChat) {
//       senderChat = {
//         userchat: receiver._id,
//         avatar: receiver.avatar,
//         username: receiver.username,
//         contentInbox: [],
//       };
//       sender.inbox.unshift(senderChat);
//     }
//     let receiverChat = receiver.inbox.find((item) =>
//       item.userchat.equals(sender._id)
//     );
//     //tạo message
//     const newMessage = new Message({
//       sender: sender._id,
//       receiver: receiver._id,
//       content: content,
//     });
//     // lưu tin nhắn
//     await newMessage.save();
//     // nếu ngừoi gửi đã click nhắn tin, và ngừoi nhận chưa có thông tin ng gửi
//     if (senderChat && !receiverChat) {
//       // tạo mới ngừoi gửi
//       receiverChat = {
//         userchat: sender._id,
//         avatar: sender.avatar,
//         username: sender.username,
//         contentInbox: [newMessage],
//       };
//       receiver.inbox.unshift(receiverChat);
//     }
//     // lưu tin nhắn vào contentInbox của 2 ngừoi chat
//     senderChat.contentInbox.push(newMessage);
//     receiverChat.contentInbox.push(newMessage);

//     await sender.save();
//     await receiver.save();

//     res.status(200).json({ message: "Message sent successfully" });
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
