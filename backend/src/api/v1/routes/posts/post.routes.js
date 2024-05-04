const routerPost = require("express").Router();
const postValidation = require("../../validations/post/postValidation");
const postController = require("../../controllers/post/postController");

// tạo mới bài viết
routerPost.post(
  "/createpost",
  postValidation.createPostValidation,
  postController.createPost
);

// lấy newfeed
routerPost.get("/newfeed/:id", postController.newFeed);

module.exports = routerPost;
