import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPost,
  getFollowingPosts,

  savePost,
  uploadStory,
  getUserPosts,
  likeUnlikePost,
 
  getStory,
  getUserStory,
  getSinglePost,
  deleteComment,
  getSavedPosts,
  deleteStory,
  
} from "../controllers/post.controller.js";
import { editPost } from "../controllers/post.controller.js";

const router = express.Router();
console.log("router");

router.get("/all", protectRoute, getAllPost);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/save/:username", protectRoute, getSavedPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.get("/post/:postId", protectRoute, getSinglePost);

router.post("/create", protectRoute, createPost);

router.post("/save/:id", protectRoute, savePost);
// router.get("/save/:username", protectRoute, getSavePost);

router.post("/story", protectRoute, uploadStory);
router.delete("/story/:postId", protectRoute, deleteStory);
router.get("/story", protectRoute, getStory);
router.get("/story/:username", protectRoute, getUserStory);




router.post("/edit/:id", protectRoute, editPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);
router.delete("/comment/:id", protectRoute, deleteComment);

export default router;
