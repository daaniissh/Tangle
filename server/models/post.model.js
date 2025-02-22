import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    is_save: {
      type: Boolean,
      default: false,
    },
    is_story: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,  // Progress percentage (0 to 100)
      default: 0,    // Start progress at 0
    },
    img: {
      type: String,
    },
    video: {
      type: String,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
