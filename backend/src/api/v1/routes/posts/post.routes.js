const routerPost = require("express").Router();
const postValidation = require("../../validations/post/postValidation");
const postController = require("../../controllers/post/postController");

// tạo mới bài viết
routerPost.post(
  "/createpost",
  postValidation.createPostValidation,
  postController.createPost
);

module.exports = routerPost;
