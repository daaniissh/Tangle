import { type Comment } from '@/lib/mock/post'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import UserAvatar from './UserAvatar'

const Comment = ({ data }: any) => {
  const { content, profileImg, timeAgo, username }: Comment = data
  return (
    <div className="flex w-full h-auto space-x-3 items-start">

      <div className="flex-1 flex justify- items-center gap-2  overflow-hidden">
        <UserAvatar className='text-sm font-semibold' username={username} image={profileImg} />

        <span className="font-normal text-sm md:text-base overflow-hidden text-ellipsis text-black dark:text-white block">
       {content}
        </span>
      </div>
    </div>

  )
}

export default Comment