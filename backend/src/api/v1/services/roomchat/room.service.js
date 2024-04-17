const { Account } = require("../../models/Account.model");
const { RoomChat } = require("../../models/RoomChat.medel");

module.exports.createRoomService = async (room) => {
  const { idMemberCreate, roomname } = room;
  const findMemberCreate = await Account.findById(idMemberCreate);
  if (!findMemberCreate) {
    return {
      status: 404,
      message: "user not found",
    };
  }
  const newRoom = new RoomChat({
    roomname: roomname,
    roomAdmin: [findMemberCreate._id],
    member: [findMemberCreate._id],
    contentInbox: [],
  });
  const newRoomUser = await newRoom.save();
  findMemberCreate.roomchat.unshift(newRoomUser);
  await findMemberCreate.save();
  return {
    status: 201,
    message: "Tạo mới thành công",
    room: newRoom,
  };
};

// lấy thông tin phòng
module.exports.getRoomService = async (id) => {
  const roomChat = await RoomChat.findById(id).populate({
    path: "member",
    select: "_id username", // chỉ lấy _id và username trong member
  });
  if (!roomChat) {
    return {
      status: 404,
      message: "Roomchat not found",
    };
  }
  return {
    status: 200,
    roomChat,
  };
};

// hàm xoá roomchat
module.exports.deleteRoomService = async (id) => {
  const { userId, roomId } = id;
  const findUser = await Account.findById(userId);
  if (!findUser) {
    return {
      status: 404,
      message: "user not found",
    };
  }
  // tìm roomchat muón xoá
  const deletedRoom = await RoomChat.findById(roomId);
  if (!deletedRoom) {
    return res.status(404).json({ message: "RoomChat not found" });
  }
  // kiểm tra có phải admin ko
  const isAdmin = deletedRoom.roomAdmin.includes(userId);
  if (!isAdmin) {
    return {
      status: 403,
      message: "Bạn không có quyền xoá RoomChat",
    };
  }
  // lặp qua các member và xoá id roomchat trong Account đó
  for (const memberId of deletedRoom.member) {
    await Account.findByIdAndUpdate(memberId, { $pull: { roomchat: roomId } });
  }
  // xoá phòng
  await RoomChat.findByIdAndDelete(roomId);
  return {
    status: 200,
    message: "Xoá thành công",
  };
};

// sửa tên room chat
module.exports.updateRoomNameService = async (req) => {
  const { roomId, newName } = req;
  const updatedRoom = await RoomChat.findByIdAndUpdate(
    roomId, // id của phòng chat cần sửa
    { $set: { roomname: newName } }, // Dữ liệu mới cần cập nhật
    { new: true } // Tùy chọn new để trả về đối tượng sau khi cập nhật
  );
  // Kiểm tra xem phòng chat có tồn tại không
  if (!updatedRoom) {
    return {
      status: 404,
      message: "Phòng chat không tồn tại",
    };
  }
  return {
    status: 200,
    message: "Sửa tên phòng chat thành công",
    updatedRoom: updatedRoom,
  };
};

// thêm user vào room
module.exports.addToRoom = async (req) => {
  const { roomId, userId } = req.body;
  const user = await Account.findById(userId);
  const room = await RoomChat.findById(roomId);
  // kiểm tra tồn tại
  if (!user) {
    return {
      status: 404,
      message: "Người dùng không tồn tại",
    };
  }
  if (!room) {
    return {
      status: 404,
      message: "Phòng chat không tồn tại",
    };
  }
  // Kiểm tra xem người dùng đã tồn tại trong phòng chat chưa
  if (room.member.includes(userId)) {
    return {
      status: 400,
      message: "Người dùng đã tồn tại trong phòng chat",
    };
  }
  // Thêm userId vào mảng member của phòng chat
  room.member.push(userId);
  await room.save();
  // Thêm roomId vào mảng roomchat của người dùng
  user.roomchat.push(roomId);
  await user.save();
  return {
    status: 200,
    message: "Thêm người dùng vào phòng chat thành công",
  };
};

// xoá user khỏi room
module.exports.removeFromRoom = async (req) => {
  const { roomId, userId, adminId } = req.params;
  const user = await Account.findById(userId);
  const room = await RoomChat.findById(roomId);
  const isAdmin = room.roomAdmin.includes(adminId);
  // kiểm tra phải là admin mới đc xoá
  if (!isAdmin) {
    return {
      status: 403,
      message: "Bạn không có quyền xoá RoomChat",
    };
  }
  // kiểm tra tồn tại
  if (!user) {
    return {
      status: 404,
      message: "Người dùng không tồn tại",
    };
  }
  if (!room) {
    return {
      status: 404,
      message: "Phòng chat không tồn tại",
    };
  }
  // Kiểm tra xem người dùng đã tồn tại trong phòng chat chưa
  if (!room.member.includes(userId)) {
    return {
      status: 400,
      message: "Người dùng không ở trong trong phòng chat",
    };
  }
  await RoomChat.findByIdAndUpdate(
    roomId, // ID của phòng chat cần sửa
    { $pull: { member: userId } } // Sử dụng $pull để xoá userId khỏi mảng member
  );
  // Xoá roomId khỏi mảng roomchat của người dùng
  await Account.findByIdAndUpdate(
    userId, // ID của người dùng cần sửa
    { $pull: { roomchat: roomId } } // Sử dụng $pull để xoá roomId khỏi mảng roomchat
  );
  return {
    status: 200,
    message: "Xoá người dùng khỏi phòng chat thành công",
  };
};
