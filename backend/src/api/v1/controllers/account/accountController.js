const { Account } = require("../../models/Account.model");
const accountService = require("../../services/account/account.service");

module.exports.getDataUser = async (req, res) => {
  try {
    const result = await accountService.profile(req.params.id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.searchByQuery = async (req, res) => {
  try {
    const result = await accountService.searchService(req.query.query);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error("Lỗi khi tìm kiếm:", err);
    return res.status(500).json({ error: "Đã xảy ra lỗi khi tìm kiếm." });
  }
};
