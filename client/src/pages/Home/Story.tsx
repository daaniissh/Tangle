import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { Link } from 'react-router-dom'
type Pros = {
  username: string,
  img:string
}
const Story = ({username,img}:Pros) => {
  return (
 
      <Link
        to="/story"
        className="mr-5 cursor-pointer dark:text-insta-darkText h-auto flex"
      >
        <div className="flex gap-1 items-center  flex-col justify-center">
          <div className="flex  justify-center items-center   bg-gradient-to-tr from-insta-gradientStart via-insta-gradientMid to-insta-gradientEnd p-[2px] rounded-full ">
          <div className="  bg-white p-[1px]  rounded-full ">
            <Avatar className="w-16 h-16  duration-150">
              <AvatarImage
                draggable="false"
                className="rounded-full select-none  object-fill"
                src={img}
              />
              <AvatarFallback>DN</AvatarFallback>
            </Avatar>
            </div>
          </div>
          <h3 className=' text-[12px] font-normal font-poppins truncate w-[70px] text-center' >{username}</h3>
        </div>
      </Link>

  )
}

export default Story