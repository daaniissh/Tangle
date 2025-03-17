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
export const deleteComment = async (req, res) => {
  console.log("delete");
  try {
    // Find the post containing the comment
    const post = await Post.findOne({ "comments._id": req.params.id });

    if (!post) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Find the specific comment
    const comment = post.comments.id(req.params.id);

    // Check if the user is authorized to delete the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "User not authorized to delete this comment" });
    }

    // Remove the comment from the array
    // comment.remove();
    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== req.params.id
    );

    // Save the updated post
    await post.save();

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      comment: comment.text,
      post,
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
      res.status(200).json("like");
    } else {
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();

      const notification = new Notification({
        from: userId,
        post: post,
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
    const post = await Post.find({
      is_story: false,
      img: { $exists: true, $ne: "" },
    })
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

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const following = user.following;
    const feedPosts = await Post.find({
      user: { $in: following },
      is_story: false,
      img: { $exists: true, $ne: "" },
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
    const posts = await Post.find({
      user: user._id,
      is_story: false,
      img: { $exists: true, $ne: "" },
    })
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
export const getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) return;
    const post = await Post.findOne({ _id: postId })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const getSavePost = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    const posts = await Post.find({
      user: user._id,
      img: { $exists: true, $ne: "" },
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
export const getSavedPosts = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const savedPosts = await Post.find({
      _id: { $in: user.savedPosts },
    }).populate({
      path: "user.savedPosts",
    });

    res.status(200).json(savedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const savePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.is_save) {
      await User.updateOne({ _id: userId }, { $pull: { savedPosts: postId } });
    } else {
      await User.updateOne(
        { _id: userId },
        { $addToSet: { savedPosts: postId } }
      );
    }

    post.is_save = !post.is_save;
    await post.save();

    const message = post.is_save
      ? "Post removed from saved posts"
      : "Post saved successfully";
    return res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteStory = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id.toString();

    // Find the post to be deleted
    const story = await Post.findOne({
      _id: postId,
      is_story: true,
      user: userId,
    });

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    // Remove the story from the user's usersStories array
    await User.updateOne({ _id: userId }, { $pull: { usersStories: postId } });

    // Check if the user has any remaining stories in the usersStories array
    const user = await User.findById(userId);

    // If usersStories is empty, set is_story to false
    if (user.usersStories.length === 0) {
      await User.updateOne({ _id: userId }, { is_story: false });
    }

    // Delete the story
    await Post.deleteOne({ _id: postId });

    res.status(200).json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    // Update the user's is_story and push the post ID into usersStories
    user.is_story = true;
    user.usersStories.push(newPost._id); // Assuming usersStories is an array in the User model
    await user.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStory = async (req, res) => {
  try {
    const now = new Date();

    // Find users with active stories
    const usersWithStories = await User.find({ is_story: true }).populate({
      path: "usersStories",
      match: { is_story: true, expiresAt: { $gt: now } },
      options: { sort: { createdAt: -1 } },
      select: "-password",
    });

    // Collect users with active stories
    const activeStories = usersWithStories.filter(
      (user) => user.usersStories.length > 0
    );

    // Find users whose all stories have expired
    const usersToUpdate = usersWithStories.filter(
      (user) => user.usersStories.length === 0
    ).map((user) => user._id);

    // Update users whose stories have expired
    if (usersToUpdate.length > 0) {
      await User.updateMany(
        { _id: { $in: usersToUpdate } },
        { $set: { is_story: false } }
      );
    }

    // Delete expired stories
    await Post.deleteMany({ is_story: true, expiresAt: { $lt: now } });

    if (activeStories.length === 0) {
      return res.status(404).json([]);
    }

    res.json(activeStories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getUserStory = async (req, res) => {
  try {
    const { username } = req.params;
    const now = new Date();

    const user = await User.findOne({ username }).populate([
      {
        path: "usersStories",
        match: { is_story: true, expiresAt: { $gt: now } },
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "likes", // Populate the `user` field inside `usersStories`
          select: "username profileImg", // Select the fields you want to include
        },
        select: "-password", // Exclude the password field
      },
      {
        path: "likedPosts",
        populate: {
          path: "user",
          select: "username id",
        },
      },
    ]);

    if (!user || user.usersStories.length === 0) {
      return res.status(404).json({ error: "No stories found for this user" });
    }

    // Remove duplicate users from likedPosts
    const uniqueLikedPosts = user.likedPosts.reduce((acc, post) => {
      const userId = post.user._id.toString();
      if (!acc[userId]) {
        acc[userId] = post;
      }
      return acc;
    }, {});

    user.likedPosts = Object.values(uniqueLikedPosts);

    return res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};