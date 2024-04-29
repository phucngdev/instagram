const RoomService = require("../../services/roomchat/room.service");

// tạo room mới
module.exports.createRoom = async (req, res) => {
  try {
    const result = await RoomService.createRoomService(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Lỗi server");
  }
};

// tạo room mới 1 vs 1
module.exports.createRoomSingle = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await RoomService.createRoomSingleService(req.body, id);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Lỗi server");
  }
};

// lấy tất cả room
module.exports.getAllRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await RoomService.getAllRoomService(id);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Lỗi server");
  }
};

// lấy thông tin room
module.exports.getRoom = async (req, res) => {
  try {
    const { userId, roomId } = req.params;
    const result = await RoomService.getRoomService(userId, roomId);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Lỗi server");
  }
};

// xoá room
module.exports.deleteRoom = async (req, res) => {
  try {
    const result = await RoomService.deleteRoomService(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Lỗi server");
  }
};

// sửa tên room
module.exports.updateRoomName = async (req, res) => {
  try {
    const result = await RoomService.updateRoomNameService(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Lỗi server");
  }
};

// thêm user vào room
module.exports.addUserToRoom = async (req, res) => {
  try {
    const result = await RoomService.addToRoom(req);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Lỗi server");
  }
};

// xoá user khỏi room
module.exports.removeUserFromRoom = async (req, res) => {
  try {
    const result = await RoomService.removeFromRoom(req);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Lỗi server");
  }
};

// user rời khỏi room
module.exports.leaveRoom = async (req, res) => {
  try {
    const result = await RoomService.leaveRoomService(req);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Lỗi server");
  }
};
