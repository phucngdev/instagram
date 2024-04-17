const RoomService = require("../../services/roomchat/room.service");

// tạo room mới
module.exports.createRoom = async (req, res) => {
  try {
    const result = await RoomService.createRoomService(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json("Lỗi server");
  }
};

// lấy thông tin room
module.exports.getRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await RoomService.getRoomService(id);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json("Lỗi server");
  }
};

// xoá room
module.exports.deleteRoom = async (req, res) => {
  try {
    const result = await RoomService.deleteRoomService(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json("Lỗi server");
  }
};

// sửa tên room
module.exports.updateRoomName = async (req, res) => {
  try {
    const result = await RoomService.updateRoomNameService(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json("Lỗi server");
  }
};

// thêm user vào room
module.exports.addUserToRoom = async (req, res) => {
  try {
    const result = await RoomService.addToRoom(req);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json("Lỗi server");
  }
};

// xoá user khỏi room
module.exports.removeUserFromRoom = async (req, res) => {
  try {
    const result = await RoomService.removeFromRoom(req);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json("Lỗi server");
  }
};
