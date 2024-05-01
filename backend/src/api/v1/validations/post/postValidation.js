module.exports.createPostValidation = async (req, res, next) => {
  const { image, content, status } = req.body;
  if (!image && !content && !status) {
    return res.status(400).json({ message: "Bad request" });
  }
  next();
};
