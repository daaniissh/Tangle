export interface AuthUser {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  followers: string[]; // Array of user IDs (assumed as strings)
  following: string[]; // Array of user IDs (assumed as strings)
  profileImg: string; // URL or empty string
  coverImg: string; // URL or empty string
  bio: string;
  link: string;
  is_story: boolean;
  likedPosts: string[]; // Array of post IDs (assumed as strings)
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
export interface Search {
  _id: string;
  username: string;
  fullName: string;

  followers: string[]; // Array of user IDs (assumed as strings)
  profileImg: string; // URL or empty string
}
export type CommentPost = {
  text: string;
  _id: string;
  user: AuthUser;
};
interface Post {
  _id: string;
  user: AuthUser;
  text: string; // Post content (empty string if no text)
  is_save: boolean; // Whether the post is saved
  is_story: boolean; // Whether the post is a story
  img: string; // URL of the post image
  likes: string[]; // Array of user IDs who liked the post
  comments: string[]; // Array of comment IDs
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export type PostDetails = {
  _id: string;
  user: AuthUser; // User ID
  text: string;
  img: string;
  is_save: boolean;
  is_story: boolean;
  likes: any[]; // Assuming likes are an array of objects; adjust type accordingly
  comments: any[]; // Assuming comments are an array of objects; adjust type accordingly
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type NotificationType = {
  _id: string;
  from: {
    _id: string;
    username: string;
    profileImg: string;
  };
  post: PostDetails;
  to: string;
  type: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
