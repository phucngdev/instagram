const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const { RoomChat } = require("../src/api/v1/models/RoomChat.medel");
const { Account } = require("../src/api/v1/models/Account.model");
const { Message } = require("../src/api/v1/models/Message.model");

describe("Message Services", () => {
  let roomId;
  let senderId;
  let receiverId;
  let messageId;

  beforeAll(async () => {
    // Khởi tạo dữ liệu cần thiết trước khi chạy test
    // Vd: Tạo một phòng chat, người gửi và người nhận tin nhắn
    // Lưu ID của chúng để sử dụng trong các test case
    const room = new RoomChat({ roomname: "Test Room" });
    await room.save();
    roomId = room._id;

    const sender = new Account({ username: "sender" });
    await sender.save();
    senderId = sender._id;

    const receiver = new Account({ username: "receiver" });
    await receiver.save();
    receiverId = receiver._id;

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      roomchatId: roomId,
      content: "Test message content",
    });
    await message.save();
    messageId = message._id;
  }, 20000);

  afterAll(async () => {
    // Dọn dẹp dữ liệu sau khi chạy xong tất cả các test
    await RoomChat.deleteMany({});
    await Account.deleteMany({});
    await Message.deleteMany({});
  }, 20000);

  it("should send a message successfully", async () => {
    const response = await request(app).post("/api/v1/inbox").send({
      roomId: roomId,
      senderId: senderId,
      receiverId: receiverId,
      content: "Test message content",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Gửi thành công");
  });
});
