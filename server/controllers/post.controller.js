import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text, "text from post controller");
    let { img } = req.body;
    const userId = req.user._id.toString();
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!text && !img) {
      return res.status(400).json({ error: "Post must have text or image" });
    }
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }
    const newPost = new Post({
      user: userId,
      text,
      img,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "user not authorized for to delete this post" });
    }
    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }
    if (post.video) {
      const videoId = post.video.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(videoId);
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "deleted successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
};
export const editPost = async (req, res) => {
  try {
    console.log(req.params.id);
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "user not authorized for to delete this post" });
    }
    if (!text) return res.status(400).json({ error: "Text is required" });
    post.text = text;
    await post.save();
    res.json({ message: "Edited successfully", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id.toString();
    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }

    const post = await Post.findById(postId).populate("comments.user");

    // Add the new comment
    const comment = { user: userId, text };
    post.comments.push(comment);

    await post.save();

    const updatedPost = await Post.findById(postId).populate("comments.user");
    const notification = new Notification({
      from: userId,
      to: post.user._id,
      type: "comment",
    });
    await notification.save();

    return res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

      const updatedLikes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      res.status(200).json(updatedLikes);
    } else {
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();

      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });
      await notification.save();

      const updatedLikes = post.likes;
      res.status(200).json(updatedLikes);
    }
  } catch (error) {
    console.log("Error in likeUnlikePost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPost = async (req, res) => {
  console.log("get");
  try {
    const post = await Post.find({ is_story: false })
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    if (post.length === 0) {
      return res.status(404).json([]);
    }
    res.json(post);
  } catch (error) {
    res.json(error.message);
  }
};

export const getLikedPosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    res.json(likedPosts);
  } catch (error) {
    res.json(error);
  }
};

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const following = user.following;
    const feedPosts = await Post.find({
      user: { $in: following },
      is_story: false,
    })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "user",
        select: "-password",
      });

    res.json(feedPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    const posts = await Post.find({ user: user._id, is_story: false })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    return res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getSavePost = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const posts = await Post.find({
      user: user._id,
      is_save: true,
      is_story: false,
    });
    if (!user) return res.status(404).json({ message: "user not found" });
    if (!posts) return res.status(404).json({ message: "post not found" });
    return res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const savePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    if (!user) return res.status(404).json({ message: "user not found" });
    if (!post) return res.status(404).json({ message: "post not found" });
    post.is_save = !post.is_save;
    await post.save();
    return res.status(200).json({ message: "saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadStory = async (req, res) => {
  try {
    const { text } = req.body;
    let { img, video } = req.body;
    const userId = req.user._id.toString();
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!text && !img && !video) {
      return res
        .status(400)
        .json({ error: "Story must have text, image, or video" });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    if (video) {
      const uploadedResponse = await cloudinary.uploader.upload(video, {
        resource_type: "video",
      });
      video = uploadedResponse.secure_url;
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);


    const newPost = new Post({
      user: userId,
      is_story: true,
      text,
      img,
      video,
      expiresAt,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStory = async (req, res) => {
  try {
    const now = new Date();

    let posts = await Post.find({ is_story: true, expiresAt: { $gt: now } })
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" });

    await Post.deleteMany({ is_story: true, expiresAt: { $lt: now } });

    if (posts.length === 0) {
      return res.status(404).json([]);
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserStory = async (req, res) => {
  try {
    const { username } = req.params;
    const now = new Date();
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({
      user: user._id,
      is_story: true,
      expiresAt: { $gt: now },
    })
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" });

    if (posts.length === 0) {
      return res.status(404).json([]);
    }

    return res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

