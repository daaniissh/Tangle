import React, { ReactNode, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Bookmark, Heart, MessageCircle, Send, X } from "lucide-react";
import Comment from "./Comment";

import UserAvatar from "./UserAvatar";
import ShareDialog from "./Share";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/types/QueryKey/key";
import { AuthUser, PostDetails as post } from "@/types/QueryTypes/queary";
import PostSkeleton from "../skeletons/PostSkeleton";
import PostDetailsSkeleton from "../skeletons/PostDetailSkelton";
import { Skeleton } from "../ui/Skeleton";

interface PostDetailsProps {
  children?: ReactNode;
  isDialogOpen: boolean;
  onClose: () => void;
  username?: string;
  postId?: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({ children, isDialogOpen, onClose, postId }) => {


  if (!isDialogOpen) return null; // Don't render if the dialog is not open
  const APIURL = import.meta.env.VITE_API_URL;

  // const { username, postId } = useParams<{ username: string; postId: string }>();



  console.log(postId, "====postID")
  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });

  // const { data: post } = useQuery<AuthUser>({ queryKey: ["posts"] });


  const { data: Post, isLoading } = useQuery<post>({
    queryKey: ["posts"] as QueryKey,
    queryFn: async () => {
      try {
        const res = await fetch(`${APIURL}/posts/post/${postId}`, {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json()
        if (data.error) return null
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong")
        }
        console.log(data, "===user data")
        return data
      } catch (error) {

      }
    },
    enabled: !!postId,
  })

  const isLiked = Post?.likes?.includes(authUser?._id);

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
            {isLoading ? 
            <div className="w-full  bg-black">
              <Skeleton className="h-full w-full object-cover" />
            </div> 
            : 
            <div className="w-full bg-black">
              <img
                src={Post?.img || "https://i.pinimg.com/736x/d3/14/d7/d314d796a18a4f4e37fa94a0314c5762.jpg"}
                alt="Post Content"
                className="h-full w-full object-cover"
              />
            </div>}

            {/* Right: Content */}
            <div className="flex flex-col w-full">
              {/* Post Header */}
           {isLoading ? <div className="flex items-center  justify-between px-2 py-1 border-b dark:border-gray-800">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div> :   <div className="flex items-center justify-between px-2 py-1 border-b dark:border-gray-800">
                <UserAvatar className="w-10 h-10" createdAt={Post?.createdAt} image={Post?.user?.profileImg} storyId={Post?._id} isStory={authUser?.is_story} username={Post?.user?.username} />
              </div>}

              {/* Post Description */}
             {Post?.text && <div className="p-4">
                <div className="flex gap-1 flex-col md:flex-row flex-1 w-full max-w-full">
                  <span className="font-normal text-sm md:text-[14px] text-center md:text-left whitespace-wrap overflow-hidden text-ellipsis text-black dark:text-white block w-full">
                    {Post?.text}
                  </span>
                </div>
              </div>}

              {/* Comments Section */}
              <div className="p-4 border-t flex flex-col gap-4 scrollbar-none dark:border-gray-800 overflow-y-auto flex-1">
                {Post?.comments?.map((data) => <Comment data={data} />)}
                {/* Repeat as needed */}
              </div>

              {/* Add Comment */}
              <div className="flex gap-2 flex-col items-center px-4 py-2 border-t dark:border-gray-800">
                <div className="px-2 w-full md:px-0 py-2 text-black dark:text-white space-y-2">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex gap-4 items-center justify-center">
                      <Heart className={`${isLiked && "fill-red-700 text-red-700"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`} />
                      <MessageCircle className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
                      <ShareDialog id={Post?._id} username={Post?.user?.username} ><button> <Send className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" /></button></ShareDialog>
                    </div>
                    <Bookmark className={`${Post?.is_save && "fill-white text-white"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`} />
                  </div>

                  <p className="text-xs md:text-sm font-bold">{Post?.likes?.length} Likes</p>
                  <p className="text-xs text-gray-400" >{Post?.createdAt}</p>
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
