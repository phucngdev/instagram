const { Account } = require("../../models/Account.model");
const { RoomChat } = require("../../models/RoomChat.medel");
const utilsAccount = require("../../utils/account/findUser");

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

// tạo phòng chat 1 vs 1 khi click lần đầu
module.exports.createRoomSingleService = async (req, id) => {
  const { senderId, receiverId } = req;
  if (id != senderId) {
    return {
      status: 500,
      message: "lỗi server",
    };
  }
  const sender = await Account.findById(senderId);
  const receiver = await Account.findById(receiverId);
  if (!sender || !receiver) {
    return {
      status: 404,
      message: "user not found",
    };
  }
  // Kiểm tra xem có phòng chứa cả hai người dùng không
  const existingRoom = await RoomChat.findOne({
    roomAdmin: { $all: [sender._id, receiver._id] },
    member: { $all: [receiver._id, receiver._id] },
  });
  // kiểm tra phòng và đkien phòng có 2 ngừoi
  if (existingRoom && existingRoom.member.length === 2) {
    return {
      status: 200,
      message: "Phòng trò chuyện đã tồn tại",
      room: existingRoom,
    };
  }
  const newRoom = new RoomChat({
    roomAdmin: [sender._id, receiver._id],
    roomname: receiver.username,
    member: [sender._id, receiver._id],
    contentInbox: [],
  });
  const newRoomUser = await newRoom.save();
  sender.roomchat.unshift(newRoomUser);
  await sender.save();
  return {
    status: 201,
    message: "Tạo mới thành công",
    room: newRoom,
  };
};

// lấy danh sách phòng chat
module.exports.getAllRoomService = async (id) => {
  const findUser = await Account.findById(id)
    .select("username _id roomchat") // chỉ lấy _id username roomchat của user
    .populate({
      path: "roomchat", // lấy thông tin của roomchat
      select: "_id member roomAdmin roomname",
      populate: { path: "member", select: "_id username avatar" }, // lấy thông tin của member trong roomchat
    });
  if (!findUser) {
    return {
      status: 404,
      message: "user not found",
    };
  }
  return {
    status: 200,
    listroom: findUser,
  };
};

// lấy thông tin phòng
module.exports.getRoomService = async (userId, roomId) => {
  const findUser = await Account.findById(userId);
  const findRoom = await RoomChat.findById(roomId).populate([
    {
      path: "member",
      select: "_id username avatar", // chỉ lấy _id và username trong member
    },
    {
      path: "contentInbox",
    },
  ]);
  if (!findUser) return { status: 404, message: "user not found" };
  const isMember = findRoom.member.some((member) => member._id.equals(userId));
  if (!isMember) {
    return {
      status: 400,
      message: "Người dùng không tồn tại trong phòng chat",
    };
  }
  if (!findRoom) {
    return {
      status: 404,
      message: "Roomchat not found",
    };
  }
  return {
    status: 200,
    findRoom: findRoom,
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

// user tự rời khỏi room
module.exports.leaveRoomService = async (req) => {
  const { userId, roomId } = req.body;
  const findUser = await Account.findById(userId);
  const findRoom = await RoomChat.findById(roomId);
  // Kiểm tra xem người dùng và phòng chat có tồn tại không
  if (!findUser || !findRoom) {
    return {
      status: 404,
      message: "User or room not found",
    };
  }
  // Kiểm tra xem người dùng có trong phòng chat không
  const isMember = findRoom.member.some((member) => member._id.equals(userId));
  if (!isMember) {
    return {
      status: 400,
      message: "Ngừoi dùng không trong room chat",
    };
  }
  // Loại bỏ người dùng khỏi phòng chat
  findRoom.member = findRoom.member.filter(
    (member) => !member._id.equals(userId)
  );
  await findRoom.save();
  // Loại bỏ phòng chat khỏi danh sách phòng chat của người dùng
  findUser.roomchat = findUser.roomchat.filter(
    (chat) => !chat._id.equals(roomId)
  );
  await findUser.save();
  return {
    status: 200,
    message: "Rời khỏi phòng thành công",
  };
};
