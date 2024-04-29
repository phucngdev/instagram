module.exports.validationCreateRoom = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Lỗi server không thể nhận id" });
  }
  const { senderId, receiverId } = req.body;
  if (!senderId || !receiverId) {
    return res.status(400).json({ message: "Lỗi server không thể nhận body" });
  }
  next();
};
