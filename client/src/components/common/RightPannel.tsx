import React, { useState } from 'react'
import RightPanelSkeleton from '../skelton/RightPanelSkeleton'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

const RightPanel = () => {
  const [isLoading, setLoading] = useState(true)
  return (
    <div className='hidden dark:bg-black  w-[360px] top-10 h-auto xl:block my-8 mx-16'>
      <div className="mb-5 px-2">
        <div className="flex flex-row justify-between gap-10 w-full">
          <div className="flex gap-3 justify-center items-center">
            <Avatar className="group-hover:scale-110 duration-150">
              <AvatarImage
                className="rounded-full size-11"
                src="https://github.com/shadcn.png"
              />
              <AvatarFallback>DN</AvatarFallback>
            </Avatar>
            <div className="flex gap-2 items-start max-w-52 break-words">
              <span className="flex flex-col">
                <h1 className="text-[16px] font-[600] dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                  daniish
                </h1>
                <p className="font-instagram font-normal text-insta-darkPrimary text-[13px]">
                     danish
                     
                    </p>
              </span>
            </div>
          </div>
          <div className="flex items-center text-[12px]">
            <span  className="rounded-xl hover:text-insta-darkLink px-5 font-bold cursor-pointer dark:text-insta-primary dark:hover:text-insta-link text-insta-primary">account</span>
          </div>
        </div>
      </div>

      <div className="">
        <h1 className=' text-[14px] text-insta-darkPrimary tracking-wide font-semibold' >Suggested for you</h1>
        <ul className="h-full mt-1 flex px-2 flex-col items-center"> {/* Center items horizontally */}

          <Link
            to="/notifications"
            className="w-full cursor-pointer dark:text-insta-darkText  rounded-[3px] h-14 flex justify-start gap-1  mb-2 items-center"
          >
            <div className="flex flex-row justify-between gap-10 w-full">
              <div className="flex gap-3 justify-center items-center">
                <Avatar className="group-hover:scale-110 duration-150">
                  <AvatarImage
                    className="rounded-full size-11"
                    src="https://github.com/shadcn.png"
                  />
                  <AvatarFallback>DN</AvatarFallback>
                </Avatar>
                <div className="flex gap-2 items-start max-w-52 break-words">
                  <span className="flex flex-col">
                    <h1 className="text-[16px] font-[600] whitespace-nowrap  overflow-hidden text-ellipsis">
                      lionalmessi
                    </h1>
                    <p className="font-instagram font-normal text-[13px]">
                      messi
              
                    </p>
                  </span>
                </div>
              </div>
              <div className="flex items-center text-[12px]">
                <span  className="rounded-xl hover:text-insta-darkLink px-5 dark:text-insta-primary dark:hover:text-insta-link font-bold text-insta-primary">Follow</span>
              </div>
            </div>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default RightPanel