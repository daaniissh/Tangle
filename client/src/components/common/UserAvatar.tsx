import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Link } from 'react-router-dom';
type AvatarProps = {
  username?: string
  image?: string;
  isStory?: boolean;
  storyId?: number;
  className?: string;
  createdAt?: string | null;
  padding?:string;

}
const UserAvatar = ({ createdAt, image, isStory,className, username, storyId,padding }: AvatarProps) => {
  
  return (
    <>
      <div className={`flex  items-center   md:py-1  md:px-0 ${padding} `}>
        {isStory ? <div className="  bg-gradient-to-tr  from-insta-gradientStart via-insta-gradientMid to-insta-gradientEnd p-[1px] rounded-full ">
          <Link to={`/story/${username}/${storyId}`} className="  bg-white dark:bg-black   rounded-full ">
            <Avatar className={`${className} cursor-pointer`}>
              <AvatarImage
                className="rounded-full select-none object-cover"
                src={image ? image : ""}
              />
              <AvatarFallback className='' >{username?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        </div> : <div className="    rounded-full ">
          <Avatar className="w-8 h-8 cursor-pointer">
            <AvatarImage
              className="rounded-full select-none object-cover"
              src={image ? image : ""}
            />
            <AvatarFallback className='capitalize border border-gray-600' >{username?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>}
        <div className="ml-2 flex-1">
          <Link to={`/profile/${username}`} className={`${className} cursor-pointer whitespace-nowrap overflow-hidden text-black dark:text-white text-ellipsis`}>
            {username}
            {createdAt && <span className="font-poppins text-xs ml-1 text-gray-400">1h</span>}
          </Link>
        </div>
      </div>
    </>
  )
}

export default UserAvatar