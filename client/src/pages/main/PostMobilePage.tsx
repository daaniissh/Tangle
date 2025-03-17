
import Comment from '@/components/common/Comment'
import LikeHeart from '@/components/common/LikeHeart'
import MoreOptions from '@/components/common/MoreOptions'
import UserAvatar from '@/components/common/UserAvatar'
import PostDetailsSkeleton from '@/components/skeletons/PostDetailSkelton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Post, PostData } from '@/lib/mock/post'
import { formatPostDate } from '@/lib/utils/dateFunction'
import { useDoubleTap } from 'use-double-tap';
import { QueryKey } from '@/types/QueryKey/key'
import { AuthUser, CommentPost, PostDetails } from '@/types/QueryTypes/queary'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Skeleton } from '@/components/ui/Skeleton'
import ShareDialog from '@/components/common/Share'
import SpinnerIcon from '@/components/loaders/LoadingSpinner'
import useFollow from '@/hooks/useFollow'
interface PostDetailsProps {

  username?: string;
  postId?: string;
}
const PostMobilePage = ({ postId, socket }: any) => {
  const queryClient = useQueryClient();


  const APIURL = import.meta.env.VITE_API_URL;
  const [isAnima, setIsAnime] = useState(false);
  const [comment, setComment] = useState("");
  const { follow, isFollowing,followData } = useFollow(socket)
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate()
  console.log(postId, "====postID");
  const inpRef = useRef()

  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });

  const { data: postData, isLoading, refetch } = useQuery<PostDetails>({
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
      if (updatedLikes.length === 0) {
        setIsAnime(false);
      }

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
  const { mutate: commentPost, data: cmData, isPending: isCommenting } = useMutation({
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
    onSuccess: (data) => {
      setComment("");
      if(!comment) return
      refetch()


    },

    onError: (error) => {

    },
  });
  const { mutate: deleteComment, isPending: isCommentDeleteing } = useMutation({
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
      navigate("/")




    },


  });
  const postOwner = authUser?.username == postData?.user?.username;
  const isLiked = postData?.likes?.includes(authUser?._id);
  const amIFollowing = authUser?.following.includes(postData?.user?._id.toString()!);

  const [localLike, setLocalLike] = useState(isLiked);
  const [editInp, setEditInp] = useState("");
  const [btn, setBtn] = useState(true);

  const formattedDate = formatPostDate(postData?.createdAt.toString()!)

  const handleLikePost = async () => {
    console.log(likeData, "like====")
    if (isLiking) return;
    if (likeData == undefined || likeData == "like") {
      // Only send notification when likeData is "like"
      try {
        await socket.emit("sendNotification", {
          from: authUser?._id,
          to: postData?.user?._id,
          type: "like",
        });



      } catch (error) {
        console.log("Error while sending like notification:", error);
      }
    }
    setIsAnime(false);
    likePost();
  };

  const handleDouble = async () => {

  };

  function handleEdit() {
    setIsEdit(true);
    setEditInp(postData?.text!);

  }
  async function handleComment() {
    
    commentPost()
    if(!comment) return
    await socket.emit("sendNotification", {
      from: authUser?._id,
      to: postData?.user?._id,
      type: "comment",
    });

  }
  function handleChangeEdit(e) {
    setEditInp(e.target.value)
    if (editInp?.length !== postData?.text?.length) {
      setBtn(false)
    } else {
      setBtn(true)
    }
  }
  function submitEdit(e) {
    editPost()

  }
  async function followUser() {
    follow(postData?.user?._id.toString()!)
    console.log(followData?.type, "===follow")
   
  }
  const bind = useDoubleTap(async (event) => {
    console.log(likeData, "like====")
    if (!isLiked) {
      setLocalLike(localLike);
      if (likeData == "like" || likeData == undefined) {
        setIsAnime(true);
        try {
          await socket.emit("sendNotification", {
            from: authUser?._id,
            to: postData?.user?._id,
            type: "like",
          });
          likePost();
        } catch (error) {
          console.log("Error while liking the post", error);
        }
      }
    }
  });

  return (
    <div className="w-full min-h-screen mx-auto max-h-screen mt-12 overflow-y-scroll md:dark:border-b md:dark:border-gray-600/50 rounded-lg overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between px-2 py-3 border-b dark:border-gray-800">

        {isLoading ? (
          <div className="flex items-center gap-2  px-2 py-1 w-full">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-2" />
              <Skeleton className="w-14 h-2" />
            </div>
          </div>
        ) : (<>
          <UserAvatar className="w-10 h-10" image={postData?.user?.profileImg} storyId={postData?._id} isStory={postData?.user?.is_story} username={postData?.user?.username}

          />
          {!postOwner && <div className="flex gap-2  ">
            <span className="text-sm md:block hidden" >•</span>
            <span onClick={followUser} className="text-sm text-insta-link font-bold cursor-pointer hover:text-insta-primary" >
              {isFollowing && <SpinnerIcon />}
              {!isFollowing && amIFollowing && "Unfollow"}
              {!isFollowing && !amIFollowing && "Follow"}
            </span>


          </div>}
          {postOwner && <MoreOptions deletePost={deletePost} deleting={isDeleting} setEdit={setIsEdit} />}</>)}
      </div>

      {/* Post Image */}
      {isLoading ? (
        <div className="w-full bg-black flex justify-center">
          <Skeleton className="h-[500px] w-[1000px]  object-cover" />
        </div>
      ) : (
        <div className="w-full flex h-full justify-center relative rounded-[6px] z-0 border-[0.5px] border-insta-darkPrimary/20">
          {isAnima && <LikeHeart />}
          <img
            onDoubleClick={handleDouble}
            {...bind}
            draggable="false"
            className="w-full h-full object-cover rounded-[2px] md:rounded-[6px]"
            src={postData?.img || "https://i.pinimg.com/736x/d3/14/d7/d314d796a18a4f4e37fa94a0314c5762.jpg"}
            alt={postData?.text}
          />
        </div>
      )}

      {/* Post Actions and Caption */}
      {isLoading ? <div className="flex gap-2 relative flex-col items-center py-2 border-t dark:border-gray-800">
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

      </div> : <div className="px-2 md:px-0 py-2 text-black dark:text-white space-y-2">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex gap-4 items-center">
            <Heart onClick={handleLikePost} className={`${isLiked && "fill-red-700 text-red-700"} w-5 h-5 md:w-6 md:h-6 cursor-pointer `} />
            <MessageCircle onClick={() => inpRef?.current?.focus()} className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
            <ShareDialog id={postData?._id} username={postData?.user?.username} >
              <button>
                <Send className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
              </button>
            </ShareDialog>
          </div>
          <Bookmark onClick={() => savePost()} className={`${postData?.is_save && "dark:fill-white fill-black text-black dark:text-white"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`} />
        </div>

        <p className="text-xs md:text-sm font-bold">{postData?.likes?.length} Likes</p>
        <p className="text-xs text-gray-400">{formattedDate}</p>

        {/* Post Text with Show More */}
        <div>
          <div className="flex gap-1 flex-row items-center justify-between md:flex-row w-full">
            {!isEdit ? <span className="font-normal text-sm md:text-[14px] text-left whitespace-wrap overflow-hidden text-ellipsis text-black dark:text-white">
              {postData?.text}
            </span> :
              <div className="w-full">
                <Input
                  className="border border-insta-darkBorder !outline-none rounded-md"
                  type="text"
                  value={editInp}
                  onChange={handleChangeEdit}
                />
              </div>
            }
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
        </div>

        {/* Comment Section */}
        <div className="py-4 border-t flex flex-col gap-5 dark:border-gray-800 scrollbar-none pb-40">
          {postData?.comments?.map((data: CommentPost) => (
            <Comment deleteComment={deleteComment} data={data} />
          ))}
        </div>

        <div className="w-full absolute bottom-10 px-2 right-0 bg-white dark:bg-black py-5 flex">
          <Input
            ref={inpRef}
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-gray-100 dark:bg-black dark:text-white rounded-lg px-4 py-2 outline-none"
          />
          <Button disabled={isCommenting} onClick={handleComment} variant="ghost" className="ml-3 text-insta-link">
            {isCommenting ? <SpinnerIcon /> : "Post"}
          </Button>
        </div>
      </div>}
    </div>


  )
}

export default PostMobilePage