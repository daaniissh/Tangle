import React, { ReactNode, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Bookmark, Heart, MessageCircle, Send, X } from "lucide-react";
import Comment from "./Comment";
import SubHeader from "./SubHeader";
import { Post, PostData } from "@/lib/mock/post";
import UserAvatar from "./UserAvatar";

interface PostDetailsProps {
  children?: ReactNode;
  isDialogOpen: boolean;
  onClose: () => void;
  username?: string;
  postId?: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({ children, isDialogOpen, onClose, username, postId }) => {
  const postData = PostData.find((data) => data.id === Number(postId))

  if (!isDialogOpen) return null; // Don't render if the dialog is not open

  return (
    <div className="bg-gray-100 dark:bg-black dark:text-white">
      {/* Render Children */}
      <div
        onClick={onClose} // Close dialog when clicking children
        className="cursor-pointer bg-white dark:bg-black"
      >
        {children}
      </div>
      <div className="md:absolute md:flex hidden py-3 z-[99999] px-5 cursor-pointer top-0 right-0" onClick={onClose}>
        <X strokeWidth={4} />
      </div>
      {/* Post Dialog */}
      {isDialogOpen && (
        <div
          className={`md:fixed inset-0 bg-black bg-opacity-70 z-50 md:flex items-center justify-center`}
          onClick={onClose} // Close dialog when clicking outside
        >

          <div
            className="bg-white dark:bg-black shadow-lg max-w-5xl h-[96%] w-full flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation inside dialog
          >
            {/* Left: Image */}
            <div className="w-full bg-black">
              <img
                src={postData?.postImg}
                alt="Post Content"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Right: Content */}
            <div className="flex flex-col w-full">
              {/* Post Header */}
              <div className="flex items-center justify-between px-2 py-1 border-b dark:border-gray-800">
               <UserAvatar className="w-10 h-10" createdAt={postData?.timeAgo} image={postData?.profileImg} storyId={postData?.id} isStory={postData?.isStory} username={postData?.username} />
              </div>

              {/* Post Description */}
              <div className="p-4">
                <div className="flex gap-1 flex-col md:flex-row flex-1 w-full max-w-full">
                  <span className="font-normal text-sm md:text-[14px] text-center md:text-left whitespace-wrap overflow-hidden text-ellipsis text-black dark:text-white block w-full">
                    {postData?.content}
                  </span>
                </div>
              </div>

              {/* Comments Section */}
              <div className="p-4 border-t flex flex-col gap-4 scrollbar-none dark:border-gray-800 overflow-y-auto flex-1">
                {postData?.comments.map((data)=><Comment data={data}  />)}
                {/* Repeat as needed */}
              </div>

              {/* Add Comment */}
              <div className="flex gap-2 flex-col items-center px-4 py-2 border-t dark:border-gray-800">
                <div className="px-2 w-full md:px-0 py-2 text-black dark:text-white space-y-2">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex gap-4 items-center justify-center">
                      <Heart  className={`${postData?.isLiked && "fill-red-700 text-red-700"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`}/>
                      <MessageCircle className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
                      <Send className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
                    </div>
                    <Bookmark className={`${postData?.isSaved && "fill-white text-white"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`}/>
                  </div>

                  <p className="text-xs md:text-sm font-bold">{postData?.likesCount} Likes</p>
                  <p className="text-xs text-gray-400" >{postData?.timeAgo}</p>
                </div>
                <div className="w-full border-t dark:border-gray-900/90 py-3 flex">
                  <Input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-100 dark:bg-black dark:text-white rounded-lg px-4 py-2 outline-none"
                  />
                  <Button variant="ghost" className="ml-3 text-insta-link">
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
