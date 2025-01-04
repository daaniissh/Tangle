import React, { ReactNode, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Bookmark, Edit, Heart, MessageCircle, Send, X } from "lucide-react";
import Comment from "./Comment";
import UserAvatar from "./UserAvatar";
import ShareDialog from "./Share";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/types/QueryKey/key";
import { AuthUser, PostDetails as post } from "@/types/QueryTypes/queary";
import PostSkeleton from "../skeletons/PostSkeleton";
import PostDetailsSkeleton from "../skeletons/PostDetailSkelton";
import { Skeleton } from "../ui/Skeleton";
import { spawn } from "child_process";
import SpinnerIcon from "../loaders/LoadingSpinner";
import { formatPostDate } from "@/lib/utils/dateFunction";

interface PostDetailsProps {
  children?: ReactNode;
  isDialogOpen: boolean;
  onClose: () => void;
  username?: string;
  postId?: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({ children, isDialogOpen, onClose, postId }) => {
  const queryClient = useQueryClient();

  if (!isDialogOpen) return null;
  const APIURL = import.meta.env.VITE_API_URL;
  const [isAnima, setIsAnime] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  console.log(postId, "====postID");


  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });

  const { data: post, isLoading, refetch } = useQuery<post>({
    queryKey: ["posts", postId] as QueryKey,
    queryFn: async () => {
      try {
        const res = await fetch(`${APIURL}/posts/post/${postId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log(data, "===user data");
        return data;
      } catch (error) { }
    },
    enabled: !!postId,
    retry: false,
  });

  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`${APIURL}/posts/like/${postId}`, {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log(data, "===user data");
        return data;
      } catch (error) { }
    },
    onSuccess: (updatedLikes) => {
      refetch();
      if (updatedLikes.length === 0) {
        setIsAnime(false);
      }
      console.log("Liked post", updatedLikes);
      queryClient.setQueryData(["posts", postId], (oldData: any) => {
        return oldData.map((p: any) => {
          if (p._id === postId) {
            return { ...p, likes: updatedLikes };
          }
          return p;
        });
      });
    },
  });
  
  const { mutate: savePost, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`${APIURL}/posts/save/${postId}`, {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log(data, "===user data");
        return data;
      } catch (error) { }
    },
    onSuccess: (updateSave) => {
      refetch();
    
      console.log("Liked post", updateSave);
      queryClient.setQueryData(["posts", postId], (oldData: any) => {
        return oldData.map((p: any) => {
          if (p._id === postId) {
            return { ...p, likes: updateSave };
          }
          return p;
        });
      });
    },
  });

  const { mutate: editPost, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`${APIURL}/posts/edit/${postId}`, {
          method: "POST",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: editInp }),
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log(data, "===user data");
        return data;
      } catch (error) { }
    },
    onSuccess: () => {
      refetch();
      setIsEdit(false)

    },
  });

  const postOwner = post?.user;
  const isLiked = post?.likes?.includes(authUser?._id);
  
  const [localLike, setLocalLike] = useState(isLiked);
  const [editInp, setEditInp] = useState("");
  const [btn, setBtn] = useState(true);
  
  const formattedDate = formatPostDate(post?.createdAt.toString()!)

  const handleLikePost = async () => {
    if (isLiking) return;
    likePost();
  };

  const handleDouble = async () => {
    if (!isLiked) {
      setLocalLike(localLike);
      if (isLiking) return;
      setIsAnime(true);
      try {
        likePost();
      } catch (error) {
        console.error("Error while liking the post", error);
      }
    }
  };

  function handleEdit() {
    setIsEdit(true);
    setEditInp(post?.text!);

  }
  function handleChangeEdit(e) {
    setEditInp(e.target.value)
    if (editInp !== post?.text) {

      setBtn(false)
    } else {
      setBtn(true)
    }
  }
  function submitEdit(e) {
    editPost()
    
  }

  return (
    <div className="bg-gray-100 dark:bg-black dark:text-white">
      <div onClick={onClose} className="cursor-pointer bg-white dark:bg-black">
        {children}
      </div>
      <div
        className="md:absolute md:flex hidden py-3 z-[99999] px-5 cursor-pointer top-0 right-0"
        onClick={onClose}
      >
        <X strokeWidth={4} />
      </div>
      {isDialogOpen && (
        <div
          className="md:fixed inset-0 bg-black bg-opacity-70 z-50 md:flex items-center justify-center"
          onClick={onClose}
        >
          <div
            className="bg-white dark:bg-black shadow-lg max-w-5xl h-[96%] w-full flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <div className="w-full bg-black">
                <Skeleton className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="w-full relative bg-black">
                {isAnima && (
                  <div className="absolute top-0 m-auto flex justify-center animate-shakeAndHide items-center h-full w-full">
                    <Heart className="size-36 fill-rose-600 text-rose-600" />
                  </div>
                )}
                <img
                  onDoubleClick={handleDouble}
                  src={
                    post?.img ||
                    "https://i.pinimg.com/736x/d3/14/d7/d314d796a18a4f4e37fa94a0314c5762.jpg"
                  }
                  alt="post Content"
                  draggable="false"
                  className="h-full select-none w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col w-full">
              {isLoading ? (
                <div className="flex items-center justify-between px-2 py-1 border-b dark:border-gray-800">
                  <Skeleton className="w-10 h-10 rounded-full" />
                </div>
              ) : (
                <div className="flex items-center justify-between px-2 py-1 border-b dark:border-gray-800">
                  <UserAvatar
                    className="w-10 h-10"
                    
                    image={post?.user?.profileImg}
                    storyId={post?._id}
                    isStory={post?.user?.is_story}
                    username={post?.user?.username}
                  />
                  {postOwner && (
                    <span className="text-sm text-red-500 font-medium cursor-pointer hover:text-red-900/50 dark:hover:text-red-500/60">
                      Delete
                    </span>
                  )}
                </div>
              )}
              {post?.text && (
                <div className="p-4">
                  <div className="flex gap-1 items-center flex-col md:flex-row flex-1 w-full max-w-full">
                    {!isEdit ? (
                      <span className="font-normal text-sm md:text-[14px] text-center md:text-left whitespace-wrap overflow-hidden text-ellipsis text-black dark:text-white block w-full">
                        {post?.text}
                      </span>
                    ) : (
                      <div className="w-full">
                        <Input
                          className="border border-insta-darkBorder !outline-none rounded-md"
                          type="text"
                          value={editInp}
                          onChange={handleChangeEdit}
                        />
                      </div>
                    )}
                    {postOwner && (
                      !isEdit ? (
                        <span className="text-sm text-insta-link cursor-pointer pl-4" onClick={handleEdit}>
                          Edit
                        </span>
                      ) : (
                        <button disabled={btn} onClick={submitEdit} className={`${btn && "text-insta-link/60"}  text-sm text-insta-link cursor-pointer pl-4`}>{isPending ? <SpinnerIcon/> : "Done"}</button>
                      )
                    )}
                  </div>
                </div>
              )}
              <div className="p-4 border-t flex flex-col gap-4 scrollbar-none dark:border-gray-800 overflow-y-auto flex-1">
                {post?.comments?.map((data) => (
                  <Comment data={data} />
                ))}
              </div>
              <div className="flex gap-2 flex-col items-center px-4 py-2 border-t dark:border-gray-800">
                <div className="px-2 w-full md:px-0 py-2 text-black dark:text-white space-y-2">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex gap-4 items-center justify-center">
                      <Heart
                        onClick={handleLikePost}
                        className={`${isLiked && "fill-red-700 text-red-700"
                          } w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-red-700`}
                      />
                      <MessageCircle className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
                      <ShareDialog id={post?._id} username={post?.user?.username}>
                        <button>
                          <Send className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
                        </button>
                      </ShareDialog>
                    </div>
                    <Bookmark
                    onClick={()=>savePost()}
                      className={`${post?.is_save && "fill-white text-white"
                        } w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`}
                    />
                  </div>
                  <p className="text-xs md:text-sm font-bold">{post?.likes?.length} Likes</p>
                  <p className="text-xs text-gray-400">{formattedDate}  </p>
                </div>
                <div className="w-full border-t dark:border-gray-900/90 py-3 flex">
                  <Input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-100 dark:bg-black dark:text-white rounded-lg px-4 py-2 outline-none"
                  />
                  <Button variant="ghost" className="ml-3 text-insta-link">
                    post
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