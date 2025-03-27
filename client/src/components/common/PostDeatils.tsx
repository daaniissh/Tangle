import React, { ReactNode, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart, MessageCircle, Send, X } from "lucide-react";
import Comment from "./Comment";
import UserAvatar from "./UserAvatar";
import ShareDialog from "./Share";
import { useMutation, useQuery, } from "@tanstack/react-query";
import { QueryKey } from "@/types/QueryKey/key";
import { AuthUser, CommentPost, PostDetails as post } from "@/types/QueryTypes/queary";

import { Skeleton } from "../ui/skeleton";

import SpinnerIcon from "../loaders/LoadingSpinner";
import { formatPostDate } from "@/lib/utils/dateFunction";
import LikeHeart from "./LikeHeart";
import MoreOptions from "./MoreOptions";
import useFollow from "@/hooks/useFollow";
import { Socket } from "socket.io-client";



interface PostDetailsProps {
  children?: ReactNode;
  isDialogOpen: boolean;
  onClose: () => void;
  username?: string;
  postId?: string;
  socket:Socket | null
}

const PostDetails: React.FC<PostDetailsProps> = ({ children, isDialogOpen, onClose, postId, socket }) => {
 ;

  if (!isDialogOpen) return null;
  const APIURL = import.meta.env.VITE_API_URL;


  const [isAnima, setIsAnime] = useState(false);
  const [comment, setComment] = useState("");
  const [_, setIslike] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { follow, isFollowing, followData } = useFollow(socket)
  console.log(postId, "====postID");

  const inpRef = useRef<HTMLInputElement | null>(null);

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

  const { mutate: likePost, isPending: isLiking, data: likeData } = useMutation({
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
      if (updatedLikes?.length === 0) {
        setIsAnime(false);
      }
      if (updatedLikes == "like") {
        setIslike(true)
      }
      console.log("Liked post", updatedLikes);

    },
  });

  const { mutate: savePost } = useMutation({
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
    onSuccess: () => {
      refetch();


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
  const { mutate: commentPost, isPending: isCommenting } = useMutation({
    mutationFn: async () => {
      try {
        if (!comment) return
        const res = await fetch(`${APIURL}/posts/comment/${postId}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: comment }),
        });
        const data = await res.json();
        setComment("");

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        console.log(error)
      }
    },
    onSuccess: () => {
      setComment("");
      refetch()


    },

    onError: () => {

    },
  });
  const { mutate: deleteComment } = useMutation({
    mutationFn: async (commentID: string) => {
      try {

        const res = await fetch(`${APIURL}/posts/comment/${commentID}`, {
          method: "DELETE",
          credentials: "include",

        });
        const data = await res.json();
        if (!res.ok) {
          console.log("error")
        }
        return data;

      } catch (error) {
        console.log(error)
      }
    },
    onSuccess: () => {

      refetch()



    },


  });
  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      try {

        const res = await fetch(`${APIURL}/posts/${postId}`, {
          method: "DELETE",
          credentials: "include",

        });
        const data = await res.json();
        if (!res.ok) {
          console.log("error")
        }
        return data;

      } catch (error) {
        console.log(error)
      }
    },
    onSuccess: () => {

      onClose()



    },


  });



  const postOwner = authUser?.username == post?.user?.username;
  const isLiked = post?.likes?.includes(authUser?._id);
  const amIFollowing = authUser?.following.includes(post?.user?._id.toString()!);

  const [localLike, setLocalLike] = useState(isLiked);
  const [editInp, setEditInp] = useState("");
  const [btn, setBtn] = useState(true);

  const formattedDate = formatPostDate(post?.createdAt.toString()!)


  // useEffect(() => {
  //   if (authUser?._id) {
  //     socket.emit("addUser", authUser._id); // Emit once when authUser is available
  //   }
  // }, [authUser]);


  const handleLikePost = async () => {
    console.log(likeData, "like====")
    if (isLiking) return;
    if (likeData == "like" || likeData == undefined) {
      // Only send notification when likeData is "like"
      try {
        await socket?.emit("sendNotification", {
          from: authUser?._id,
          to: post?.user?._id,
          type: "like",
        });
        setIslike(false)


      } catch (error) {
        console.log("Error while sending like notification:", error);
      }
    }
    setIsAnime(false);
    likePost();
  };

  const handleDouble = async () => {
    if (!isLiked) {
      setLocalLike(localLike);
      if (likeData == "like" || likeData == undefined) {
        setIsAnime(true);
        try {
          await socket?.emit("sendNotification", {
            from: authUser?._id,
            to: post?.user?._id,
            type: "like",
          });
          likePost();
        } catch (error) {
          console.log("Error while liking the post", error);
        }
      }
    }
  };
  async function commentOnPost() {

    commentPost()
    await socket?.emit("sendNotification", {
      from: authUser?._id,
      to: post?.user?._id,
      type: "comment",
    });
  }
  async function followUser() {
    follow(post?.user?._id.toString()!)
    console.log(followData?.type, "===follow")
   
  }
  function handleEdit() {
    setIsEdit(true);
    setEditInp(post?.text!);

  }

  function handleChangeEdit(e: any) {
    setEditInp(e.target.value)
    if (editInp?.length !== post?.text?.length) {
      setBtn(false)
    } else {
      setBtn(true)
    }
  }

  function submitEdit() {
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
                  <LikeHeart />
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
                <div className="flex items-center gap-2  px-2 py-1 border-b dark:border-gray-800">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-20 h-2" />
                    <Skeleton className="w-14 h-2" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between px-2 py-1 border-b dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <UserAvatar
                      className="w-10 h-10"

                      image={post?.user?.profileImg}
                      storyId={post?._id}
                      isStory={post?.user?.is_story}
                      username={post?.user?.username}
                    />
                    {!postOwner && <div className="flex gap-2  ">
                      <span className="text-sm" >•</span>
                      <span onClick={followUser} className="text-sm text-insta-link font-bold cursor-pointer hover:text-insta-primary" >
                        {isFollowing && <SpinnerIcon />}
                        {!isFollowing && amIFollowing && "Unfollow"}
                        {!isFollowing && !amIFollowing && "Follow"}
                      </span>


                    </div>}
                  </div>
                  {postOwner && (
                    <MoreOptions deleting={isDeleting} deletePost={deletePost} setEdit={setIsEdit} />
                  )}
                </div>
              )}

              <div className={`p-4 ${!post?.text && !isEdit && "hidden"}`}>
                {!isLoading ?
                  <div className=" flex gap-1 items-center flex-col md:flex-row flex-1 w-full max-w-full">
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
                        <span className={` text-sm text-insta-link text-center cursor-pointer pl-4`} onClick={handleEdit}>
                          Edit
                        </span>
                      ) : (
                        <button disabled={btn} onClick={submitEdit} className={`${btn && "text-insta-link/60"}  text-sm text-insta-link cursor-pointer pl-4`}>{isPending ? <SpinnerIcon /> : "Done"}</button>
                      )
                    )}
                  </div>
                  :
                  <div className="flex items-center gap-2  ">

                    <div className="flex flex-col gap-2">
                      <Skeleton className="w-40 h-4" />

                    </div>
                  </div>
                }
              </div>

              <div className={`py-2 px-2 ${post?.text && "border-t"} flex flex-col gap-4 scrollbar-none dark:border-gray-800 overflow-y-auto flex-1`}>
                {post?.comments?.map((data: CommentPost) => (
                  !isLoading ? <Comment key={data._id} deleteComment={deleteComment} data={data} /> :
                    <div className="flex items-center gap-2 ">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="flex flex-col gap-2">
                        <Skeleton className="w-20 h-2" />

                      </div>
                    </div>
                ))}
              </div>
              {!isLoading ? <div className="flex gap-2 flex-col items-center px-4 py-2 border-t dark:border-gray-800">
                <div className="px-2 w-full md:px-0 py-2 text-black dark:text-white space-y-2">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex gap-4 items-center justify-center">
                      <Heart
                        onClick={handleLikePost}
                        className={`${isLiked && "fill-red-700 text-red-700"
                          } w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-red-700`}
                      />
                      <MessageCircle onClick={() => inpRef?.current?.focus()} className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
                      <ShareDialog id={post?._id} username={post?.user?.username}>
                        <button>
                          <Send className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
                        </button>
                      </ShareDialog>
                    </div>
                    <Bookmark
                      onClick={() => savePost()}
                      className={`${post?.is_save && "dark:fill-white fill-black text-black dark:text-white"
                        } w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`}
                    />
                  </div>
                  <p className="text-xs md:text-sm font-bold">{post?.likes?.length} Likes</p>
                  <p className="text-xs text-gray-400">{formattedDate}  </p>
                </div>
                <div className="w-full border-t dark:border-gray-900/90 py-3 flex">
                  <Input
                    ref={inpRef}
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-100 dark:bg-black dark:text-white rounded-lg px-4 py-2 outline-none"
                  />
                  <Button disabled={isCommenting} onClick={commentOnPost} variant="ghost" className="ml-3 text-insta-link">
                    {isCommenting ? <SpinnerIcon /> : "Post"}
                  </Button>
                </div>
              </div> :
                <div className="flex gap-2 flex-col items-center px-4 py-2 border-t dark:border-gray-800">
                  <div className="px-2 w-full md:px-0 py-2 space-y-2">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex gap-4 items-center">
                        <Skeleton className="w-5 h-5 md:w-6 md:h-6 rounded-full" />
                        <Skeleton className="w-5 h-5 md:w-6 md:h-6 rounded-full" />
                        <Skeleton className="w-5 h-5 md:w-6 md:h-6 rounded-full" />
                      </div>
                      <Skeleton className="w-5 h-5 md:w-6 md:h-6 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-16 md:w-20 rounded" />
                    <Skeleton className="h-3 w-24 md:w-28 rounded" />
                  </div>
                  <div className="w-full border-t dark:border-gray-900/90 py-3 flex gap-2">
                    <Skeleton className="flex-1 h-10 rounded-lg" />
                    <Skeleton className="w-12 h-10 rounded-lg" />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;