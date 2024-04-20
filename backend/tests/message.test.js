const request = require("supertest");
const app = require("../src/app");
const { Message } = require("../src/api/v1/models/Message.model");
const { RoomChat } = require("../src/api/v1/models/RoomChat.medel");
const { Account } = require("../src/api/v1/models/Account.model");

// Khởi tạo dữ liệu cần thiết trước khi chạy test
const roomId = "662117ea5a820ee052d9ca42";
const senderId = "661f909ec70d2c3743bccbc8";
const receiverId = "662113a0984cb48464a8e286";
describe("sendMesSingleService", () => {
  test("message successfully", async () => {
    // Kiểm tra dữ liệu đầu vào
    if (!roomId || !senderId || !receiverId) {
      throw new Error("Thiếu thông tin đầu vào");
    }

    // Xác nhận rằng phòng chat, người gửi và người nhận tồn tại trong cơ sở dữ liệu
    const room = await RoomChat.findById(roomId);
    if (!room) {
      throw new Error("Không tìm thấy phòng chat");
    }

    const sender = await Account.findById(senderId);
    if (!sender) {
      throw new Error("Không tìm thấy người gửi");
    }

    const receiver = await Account.findById(receiverId);
    if (!receiver) {
      throw new Error("Không tìm thấy người nhận");
    }

    // Gửi yêu cầu HTTP để gửi tin nhắn
    const response = await request(app)
      .post(`/api/v1/inbox/${roomId}/${senderId}`)
      .send({
        roomId: roomId,
        senderId: senderId,
        receiverId: receiverId,
        content: "Test message content",
      });

    // Kiểm tra xem phản hồi có mã trạng thái là 201 không
    expect(response.status).toBe(201);

    // Kiểm tra nội dung của phản hồi
    expect(response.body.message).toBe("Gửi thành công");

    // Kiểm tra xem tin nhắn đã được lưu trong cơ sở dữ liệu không
    const message = await Message.findOne({ content: "Test message content" });
    expect(message).not.toBeNull();
  }, 20000);
});
