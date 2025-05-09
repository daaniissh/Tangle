import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";

export const getProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getUsers = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};
    if (search.length != 0) {
      filter.$or = [
        { username: { $regex: new RegExp(search, "i") } }, // Case-insensitive username search
        { fullName: { $regex: new RegExp(search, "i") } }, // Case-insensitive fullname search
      ];
    }
    const users = await User.find(filter);
    return res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const followOrUnfollow = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You can't follow/unfollow yourself" });
    }

    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Unfollow the user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

      res
        .status(200)
        .json({ message: "User unfollowed successfully", type: "follow" });
    } else {
      // Follow the user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      // Send notification to the user
      const newNotification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });

      await newNotification.save();

      res
        .status(200)
        .json({ message: "User followed successfully", type: "unfollow" });
    }
  } catch (error) {
    console.log("Error in followUnfollowUser: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
// export const followOrUnfollow = async (req,res) => {
//   try {
//     const { id } = req.params;
//     const userToModify = await User.findById(id);
//     const currentUser = await User.findById(req.user._id);
//     if (id === req.user.id.toString()) {
//       return res
//         .status(400)
//         .json({ error: "U can't follow/unfollow yourself" });
//     }
//     if (!userToModify || !currentUser) {
//       return res.status(404).json({ error: "user not found" });
//     }
//     const isFollowing = userToModify.following.includes(id);
//     if (isFollowing) {
//       //unfollow
//       await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
//       await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
//       res.status(200).json({ message: "User unfollowed successfully" });
//     } else {
//       //follow
//       await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
//       await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
//       const newNotification = new Notification({
//         type: "follow",
//         from: req.user_id,
//         to: userToModify._id,
//       });
//       await newNotification.save();
//       res.status(200).json({ message: "User followed successfully" });
//     }
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const usersFollowedByMe = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      { $sample: { size: 10 } },
    ]);

    // 1,2,3,4,5,6,
    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((user) => (user.password = null));

    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.log("Error in getSuggestedUsers: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getFollowersUnfollowers = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) return res.status(404).json({ message: "user not found" });
    const userData = await User.findOne({ username })
      .select("following followers")
      .populate("following followers");
    return res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ error: "server error" });
  }
};

export const updateProfile = async (req, res) => {
  const { fullName, username, email, bio, currentPassword, newPassword, link } =
    req.body;
  let { profileImg, coverImg } = req.body;
  console.log(profileImg);
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res.status(400).json({
        error: "Please provide both current password and new password",
      });
    }
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Current Password is incorrect" });
      if (newPassword.length < 6)
        return res
          .status(400)
          .json({ error: "Password must be at least 6 character long" });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedRes = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedRes.secure_url;
    }
    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedRes = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedRes.secure_url;
    }
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    user = await user.save();
    user.password = null;
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
