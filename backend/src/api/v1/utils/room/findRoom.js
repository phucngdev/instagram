const { RoomChat } = require("../../models/RoomChat.medel");

module.exports.findRoomById = async (id) => {
  const findRoom = await RoomChat.findById(id);
  if (!findRoom) {
    return {
      status: 404,
      message: "room not found",
    };
  }
  return {
    findRoom: findRoom,
  };
};
