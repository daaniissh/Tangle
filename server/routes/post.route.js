import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPost,
  getFollowingPosts,
  getLikedPosts,
  savePost,
  uploadStory,
  getUserPosts,
  likeUnlikePost,
  getSavePost,
  getStory,
  getUserStory,
} from "../controllers/post.controller.js";
import { editPost } from "../controllers/post.controller.js";

const router = express.Router();
console.log("router");

router.get("/all", protectRoute, getAllPost);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/user/:username", protectRoute, getUserPosts);

router.post("/create", protectRoute, createPost);

router.post("/save/:id", protectRoute, savePost);
router.get("/save", protectRoute, getSavePost);

router.post("/story", protectRoute, uploadStory);
router.get("/story", protectRoute, getStory);
router.get("/story/:username", protectRoute, getUserStory);



router.post("/edit/:id", protectRoute, editPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

export default router;
