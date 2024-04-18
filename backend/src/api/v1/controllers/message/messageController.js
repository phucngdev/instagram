const MesService = require("../../services/message/message.service");

module.exports.sendMesSingle = async (req, res) => {
  try {
    const result = await MesService.sendMesSingleService(req);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json("Lỗi server");
  }
};
