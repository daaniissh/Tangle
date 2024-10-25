import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { followOrUnfollow, getFollowersUnfollowers, getProfile, getSuggestedUsers, updateProfile } from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/profile/:username", protectRoute, getProfile);
router.get("/followers/:username", protectRoute, getFollowersUnfollowers);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followOrUnfollow);
router.post("/update", protectRoute, updateProfile);

export default router;
