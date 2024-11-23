import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import React from 'react'
import { Link } from 'react-router-dom'
type Pros = {
  username: string,
  img:string,
  name:string,
  id:number
}
const Story = ({username,img,id,name}:Pros) => {
  return (
 
      <Link
        to={`/story/${username}/${id}`}
        className=" cursor-pointer dark:text-insta-darkText h-auto flex"
      >

        <div className="flex gap-1 items-center  flex-col justify-center">
          <div className="flex  justify-center items-center   bg-gradient-to-tr from-insta-gradientStart via-insta-gradientMid to-insta-gradientEnd p-[2px] rounded-full ">
          <div className=" dark:bg-black  bg-white p-[1px]  rounded-full ">
            <Avatar className="md:w-16 md:h-16 w-14 h-14  duration-150">
              <AvatarImage
                draggable="false"
                className="rounded-full select-none  object-cover"
                src={img != "" ? img : "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
              />
              {/* <AvatarFallback className='capitalize' >{name.charAt(1)}</AvatarFallback> */}
            </Avatar>
            </div>
          </div>
          <h3 className=' text-[12px] font-normal font-poppins truncate w-[70px] text-center' >{name}</h3>
        </div>
      </Link>

  )
}

export default Story