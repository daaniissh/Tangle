import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react'
import React, { useState } from 'react'

const Post = () => {
  const [more, setMore] = useState(false)
  const text = "Somethin’ spooky settlin’ in ‘round these parts this fine Halloween. Locals startin’ to call it some kinda…Undead Nightmare Reckon some tips’ll help ya. Just click on the #RedDeadRedemption link in that there bio"

  return (
    <div className="w-full md:w-8/12 mx-auto mt-2 md:dark:border-b   md:dark:border-gray-600/50 rounded-lg overflow-hidden">

      {/* Post Header */}
      <div className="flex items-center py-3 md:py-2 px-3 md:px-0">
        <div className="  bg-gradient-to-tr from-insta-gradientStart via-insta-gradientMid to-insta-gradientEnd p-[1.5px]  rounded-full ">
          <div className="  bg-white p-[1px]  rounded-full ">
            <Avatar className="w-8 h-8 cursor-pointer">
              <AvatarImage
                className="rounded-full select-none object-cover"
                src="https://i.pinimg.com/736x/0a/2f/68/0a2f68448ab64c7fb67e75ef410de163.jpg"
              />
              <AvatarFallback>DN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="ml-2 flex-1">
          <h1 className="text-sm md:text-[14px] font-[500] cursor-pointer whitespace-nowrap overflow-hidden text-black dark:text-white text-ellipsis">
            daniish • <span className="font-poppins text-center text-sm md:text-[14px] ml-1 text-gray-400">1h</span>
          </h1>
        </div>
      </div>

      {/* Post Image */}
      <div className="flex justify-center rounded-[6px] z-0 border-[0.5px] border-insta-darkPrimary/20">
        <img
          draggable="false"
          className="w-[1080px] h-auto object-cover rounded-[2px] md:rounded-[6px]"
          src="https://i.pinimg.com/736x/4e/c5/f8/4ec5f8be7802fd9676c341f6cbab1d8d.jpg"
          alt="Post Image"
        />
      </div>


      {/* Post Actions and Caption */}
      <div className="px-2 md:px-0 py-2 text-black dark:text-white space-y-2">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex gap-4 items-center justify-center">
            <Heart className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
            <Send className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
          </div>
          <Bookmark className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
        </div>

        <p className="text-xs md:text-sm font-normal">Liked by <span className="font-bold">user123</span> and <span className="font-bold">others</span></p>

        {/* Post Text with Show More */}
        <div className="flex gap-1 flex-col md:flex-row flex-1">
          <span className={`font-normal text-sm md:text-[14px] ${more ? 'text-left' : 'text-center whitespace-nowrap overflow-hidden text-ellipsis'} text-black dark:text-white max-w-[95%]`}>
            <span className="font-semibold text-sm md:text-[15px] mr-1">daniish</span> {text}
          </span>
          {!more && text.length > 50 && (
            <span onClick={() => setMore(true)} className="text-insta-darkPrimary text-sm md:text-[14px] cursor-pointer ml-1">more</span>
          )}
        </div>

        <p className="text-xs md:text-sm cursor-pointer text-gray-400">View all 10 comments</p>
      </div>
    </div>
  )
}

export default Post
