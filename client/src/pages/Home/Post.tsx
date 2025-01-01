

import ShareDialog from '@/components/common/Share'
import UserAvatar from '@/components/common/UserAvatar'

import { type Post } from '@/lib/mock/post'
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Post = ({data}:any) => {
  const {comments,content,isLiked,isSaved,isStory,likesCount,postImg,profileImg,timeAgo,username,stories,id}:Post = data
  const [more, setMore] = useState(false)
  const text = "Somethin’ spooky settlin’ in ‘round these parts this fine Halloween. Locals startin’ to call it some kinda…Undead Nightmare Reckon some tips’ll help ya. Just click on the #RedDeadRedemption link in that there bio"

  return (
    <div className="w-full md:w-8/12 mx-auto mt-2 md:dark:border-b   md:dark:border-gray-600/50 rounded-lg overflow-hidden">

      {/* Post Header */}
      <div className="flex items-center py-3 md:py-2 px-3 md:px-0">
      <UserAvatar className="w-9 h-9" createdAt={timeAgo} image={profileImg} storyId={id} isStory={isStory} username={username} />
       
      </div>

      {/* Post Image */}
      <div className="flex justify-center rounded-[6px] z-0 border-[0.5px] border-insta-darkPrimary/20">
        <img
          draggable="false"
          className="w-full h-auto object-cover rounded-[2px] md:rounded-[6px]"
          src={postImg}
          alt={content}
        />
      </div>


      {/* Post Actions and Caption */}
      <div className="px-2 md:px-0 py-2 text-black dark:text-white space-y-2">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex gap-4 items-center justify-center">
            <Heart  className={`${isLiked && "fill-red-700 text-red-700"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`} />
          <Link to={`/post/${username}/${id}`} ><MessageCircle className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" /></Link>  
            <ShareDialog username={username} id={id} ><Send className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" /></ShareDialog>
          </div>
          <Bookmark className={`${isSaved && "fill-white text-white"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`} />
        </div>

        <p className="text-xs md:text-sm font-bold">{likesCount} Likes</p>

        {/* Post Text with Show More */}
        <div className="flex gap-1  flex-col md:flex-row flex-1">
          <span className={`font-normal text-sm md:text-[14px] ${more ? 'text-left' : 'text-center whitespace-nowrap overflow-hidden text-ellipsis'} text-black dark:text-white max-w-[95%]`}>
            <span className="font-semibold text-sm md:text-[15px] mr-1">{username}</span> {content}
          </span>
          {!more && text.length > 50 && (
            <span onClick={() => setMore(true)} className="text-insta-darkPrimary dark:text-gray-400 hidden md:block text-sm md:text-[14px] cursor-pointer ml-1">more</span>
          )}
        </div>

        <Link to={`/post/${username}/${id}`}><p className="text-xs md:text-sm cursor-pointer text-gray-400 ">View all {comments.length} comments</p></Link>
      </div>
    </div>
  )
}

export default Post
