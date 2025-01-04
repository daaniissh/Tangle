

import ShareDialog from '@/components/common/Share'
import UserAvatar from '@/components/common/UserAvatar'

import { type Post } from '@/lib/mock/post'
import { AuthUser, PostDetails } from '@/types/QueryTypes/queary'
import { useQuery } from '@tanstack/react-query'
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
interface PostProps {
  data: PostDetails; // Assuming PostDetails is the correct type
}
const Post = ({data}:PostProps) => {
  // const {comments,content,isLiked,isSaved,isStory,likesCount,postImg,profileImg,timeAgo,username,stories,id}:Post = data
  const [more, setMore] = useState(false)
  
  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });
  // const text = "Somethin’ spooky settlin’ in ‘round these parts this fine Halloween. Locals startin’ to call it some kinda…Undead Nightmare Reckon some tips’ll help ya. Just click on the #RedDeadRedemption link in that there bio"
  const isLiked = data?.likes?.includes(authUser?._id);
  return (
    <div className="w-full md:w-8/12 mx-auto mt-2 md:dark:border-b    md:dark:border-gray-600/50 rounded-lg overflow-hidden">

      {/* Post Header */}
      <div className="flex items-center py-3 md:py-2 px-3 md:px-0">
      <UserAvatar className="w-9 h-9" createdAt={data?.createdAt} image={data?.user?.profileImg} storyId={data?.user?._id} isStory={data?.user?.is_story} username={data?.user?.username} />
       
      </div>

      {/* Post Image */}
      <div className="flex justify-center rounded-[6px] z-0 border-[0.5px] border-insta-darkPrimary/20">
        <img
          draggable="false"
          className="w-full h-auto object-cover rounded-[2px] md:rounded-[6px]"
          src={data?.img}
          alt={data?.text}
        />
      </div>


      {/* Post Actions and Caption */}
      <div className="px-2 md:px-0 py-2 text-black dark:text-white space-y-2">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex gap-4 items-center justify-center">
            <Heart  className={`${isLiked && "fill-red-700 text-red-700"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`} />
          <Link to={`/post/${data?.user?.username}/${data?._id}`} ><MessageCircle className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" /></Link>  
            <ShareDialog username={data?.user?.username} id={data?._id} ><Send className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" /></ShareDialog>
          </div>
          <Bookmark className={`${data?.is_save && "fill-white text-white"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`} />
        </div>

        <p className="text-xs md:text-sm font-bold">{data?.likes?.length.toString()} Likes</p>

        {/* Post Text with Show More */}
        <div className="flex gap-1  flex-col md:flex-row flex-1">
          <span className={`font-normal text-sm md:text-[14px] ${more ? 'text-left' : 'md:text-center mb-2 whitespace-nowrap overflow-hidden text-ellipsis'} text-black dark:text-white max-w-[95%]`}>
            <span className="font-semibold text-sm md:text-[15px] mr-1">{data?.user?.username}</span> {data?.text}
          </span>
          {!more && data?.text?.length > 50 && (
            <span onClick={() => setMore(true)} className="text-insta-darkPrimary dark:text-gray-400  hidden md:block text-sm md:text-[14px] cursor-pointer ml-1">more</span>
          )}
        </div>

        <Link to={`/post/${data?.user?.username}/${data?._id}`}><p className="text-xs md:text-sm cursor-pointer text-gray-400 ">View all {data?.comments?.length} comments</p></Link>
      </div>
    </div>
  )
}

export default Post
