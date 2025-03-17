

import LikeHeart from '@/components/common/LikeHeart'
import ShareDialog from '@/components/common/Share'
import UserAvatar from '@/components/common/UserAvatar'

import { type Post } from '@/lib/mock/post'
<<<<<<< HEAD
import { AuthUser, type as PostDetails } from '@/types/QueryTypes/queary'
=======
import { AuthUser, PostDetails } from '@/types/QueryTypes/queary'
>>>>>>> main
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDoubleTap } from 'use-double-tap';

import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPostDate, formatSmallPostData } from '@/lib/utils/dateFunction'
interface PostProps {
<<<<<<< HEAD
  postData: PostDetails; // Assuming PostDetails is the correct type
}
const Post = ({ postData, socket }: PostProps) => {
  // const {comments,content,isLiked,isSaved,isStory,likesCount,postImg,profileImg,timeAgo,username,stories,id}:Post = postData
=======
  data: PostDetails; // Assuming PostDetails is the correct type
}
const Post = ({ data }: PostProps) => {
  // const {comments,content,isLiked,isSaved,isStory,likesCount,postImg,profileImg,timeAgo,username,stories,id}:Post = data
>>>>>>> main
  const [more, setMore] = useState(false)
  const queryClient = useQueryClient();
  const APIURL = import.meta.env.VITE_API_URL;
  const [isAnima, setIsAnime] = useState(false);
<<<<<<< HEAD

  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });
  const { data: follow, refetch } = useQuery<AuthUser>({ queryKey: ["following"] });

  const { mutate: likePost, isPending: isLiking, data: likeData } = useMutation({
    mutationFn: async () => {

      try {
        const res = await fetch(`${APIURL}/posts/like/${postData?._id}`, {
          method: "POST",
          credentials: "include",
        });
        const result = await res.json();
        if (result.error) return null;


        return result;
      } catch (error) { }
    },
    onSuccess: (updatedLikes) => {
      refetch();
      if (updatedLikes?.length === 0) {
        setIsAnime(false);
      }

      console.log("Liked post", updatedLikes);

    },
  });

  const { mutate: savePost, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      try {
        await fetch(`${APIURL}/posts/save/${postData?._id}`, {
          method: "POST",
          credentials: "include",
        });

      } catch (error) { }
    },
    onSuccess: () => {
      refetch();


    },
  });

  const handleLikePost = async () => {
    console.log(likeData, "like=====")
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
    if (isLiking) {
      
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
  };
  const bind = useDoubleTap(async(event) => {
    if (!isLiked) {
      
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
  // const text = "Somethin’ spooky settlin’ in ‘round these parts this fine Halloween. Locals startin’ to call it some kinda…Undead Nightmare Reckon some tips’ll help ya. Just click on the #RedDeadRedemption link in that there bio"
  const isLiked = postData?.likes?.includes(authUser?._id);
  const formattedDate = formatSmallPostData(postData?.createdAt.toString()!)
=======
>>>>>>> main

  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });
  const { data: follow, refetch } = useQuery<AuthUser>({ queryKey: ["following"] });
  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: async () => {
      if (!data?._id) return
      try {
        const res = await fetch(`${APIURL}/posts/like/${data?._id}`, {
          method: "POST",
          credentials: "include",
        });
        const result = await res.json();
        if (result.error) return null;


        return data;
      } catch (error) { }
    },
    onSuccess: (updatedLikes) => {
      refetch();
      if (updatedLikes?.length === 0) {
        setIsAnime(false);
      }
      console.log("Liked post", updatedLikes);

    },
  });

  const { mutate: savePost, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      try {
        await fetch(`${APIURL}/posts/save/${data?._id}`, {
          method: "POST",
          credentials: "include",
        });

      } catch (error) { }
    },
    onSuccess: () => {
      refetch();


    },
  });

  const handleLikePost = async () => {
    if (isLiking) return;
    setIsAnime(false);
    likePost();
  };

  const handleDouble = async () => {
    if (!isLiked) {

      if (isLiking) return;
      setIsAnime(true);
      try {
        likePost();
      } catch (error) {
        console.log("Error while liking the post", error);
      }
    }
  };
  const bind = useDoubleTap((event) => {
    if (!isLiked) {
    
      if (isLiking) return;
      setIsAnime(true);
      try {
        likePost();
      } catch (error) {
        console.log("Error while liking the post", error);
      }
    }
  });
  // const text = "Somethin’ spooky settlin’ in ‘round these parts this fine Halloween. Locals startin’ to call it some kinda…Undead Nightmare Reckon some tips’ll help ya. Just click on the #RedDeadRedemption link in that there bio"
  const isLiked = data?.likes?.includes(authUser?._id);
    const formattedDate = formatSmallPostData(data?.createdAt.toString()!)
  
  return (
<<<<<<< HEAD
    <div className="w-full md:w-8/12 mx-auto mt-2 md:dark:border-b  md:border-b  md:dark:border-gray-600/50  overflow-hidden">

      {/* Post Header */}
      <div className="flex items-center py-3 md:py-2 px-3 md:px-0">
        <UserAvatar className="w-9 h-9" createdAt={formattedDate} image={postData?.user?.profileImg} storyId={postData?.user?._id} isStory={postData?.user?.is_story} username={postData?.user?.username} />
=======
    <div className="w-full md:w-8/12 mx-auto mt-2 md:dark:border-b    md:dark:border-gray-600/50 rounded-lg overflow-hidden">

      {/* Post Header */}
      <div className="flex items-center py-3 md:py-2 px-3 md:px-0">
        <UserAvatar className="w-9 h-9" createdAt={formattedDate} image={data?.user?.profileImg} storyId={data?.user?._id} isStory={data?.user?.is_story} username={data?.user?.username} />
>>>>>>> main

      </div>

      {/* Post Image */}
      <div className="flex relative justify-center rounded-[6px] h-auto z-0 border-[0.5px] border-insta-darkPrimary/20">
        {isAnima && (
          <LikeHeart />
        )}
        <img
          {...bind}
          onDoubleClick={handleDouble}
          draggable="false"
          className="w-full md:h-[600px] select-none h-[500px] object-cover rounded-[2px] md:rounded-[6px]"
<<<<<<< HEAD
          src={postData?.img}
          alt={postData?.text}
=======
          src={data?.img}
          alt={data?.text}
>>>>>>> main
        />
      </div>


      {/* Post Actions and Caption */}
      <div className="px-2 md:px-0 py-2 text-black dark:text-white space-y-2">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex gap-4 items-center justify-center">
            <Heart onClick={handleLikePost} className={`${isLiked && "fill-red-700 text-red-700"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`} />
<<<<<<< HEAD
            <Link to={`/post/${postData?.user?.username}/${postData?._id}`} ><MessageCircle className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" /></Link>
            <ShareDialog username={postData?.user?.username} id={postData?._id} ><Send className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" /></ShareDialog>
          </div>
          <Bookmark onClick={() => savePost()} className={`${postData?.is_save && "dark:fill-white fill-black text-black dark:text-white"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`} />
        </div>

        <p className="text-xs md:text-sm font-bold">{postData?.likes?.length.toString()} Likes</p>
=======
            <Link to={`/post/${data?.user?.username}/${data?._id}`} ><MessageCircle className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" /></Link>
            <ShareDialog username={data?.user?.username} id={data?._id} ><Send className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" /></ShareDialog>
          </div>
          <Bookmark onClick={()=>savePost()} className={`${data?.is_save && "dark:fill-white fill-black text-black dark:text-white"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`} />
        </div>

        <p className="text-xs md:text-sm font-bold">{data?.likes?.length.toString()} Likes</p>
>>>>>>> main

        {/* Post Text with Show More */}
        <div className="flex gap-1  flex-col md:flex-row flex-1">
          <span className={`font-normal text-sm md:text-[14px] ${more ? 'text-left' : 'md:text-center mb-2 whitespace-nowrap overflow-hidden text-ellipsis'} text-black dark:text-white max-w-[95%]`}>
<<<<<<< HEAD
            <span className="font-semibold text-sm md:text-[15px] mr-1">{postData?.user?.username}</span> {postData?.text}
          </span>
          {!more && postData?.text?.length > 50 && (
=======
            <span className="font-semibold text-sm md:text-[15px] mr-1">{data?.user?.username}</span> {data?.text}
          </span>
          {!more && data?.text?.length > 50 && (
>>>>>>> main
            <span onClick={() => setMore(true)} className="text-insta-darkPrimary dark:text-gray-400  hidden md:block text-sm md:text-[14px] cursor-pointer ml-1">more</span>
          )}
        </div>

<<<<<<< HEAD
        <Link to={`/post/${postData?.user?.username}/${postData?._id}`}><p className="text-xs md:text-sm cursor-pointer text-gray-400 ">View all {postData?.comments?.length} comments</p></Link>
=======
        <Link to={`/post/${data?.user?.username}/${data?._id}`}><p className="text-xs md:text-sm cursor-pointer text-gray-400 ">View all {data?.comments?.length} comments</p></Link>
>>>>>>> main
      </div>
    </div>
  )
}

export default Post