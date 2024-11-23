import { SearchSkelton } from '@/components/skeletons/SearchSkeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Notification = () => {
  const [loading, setLoading] = useState(true)
  return (
    <div className="w-full h-screen mt-16 lg:mt-auto  flex justify-center">
  {/* Main Container */}
  <div className="w-full h-screen flex justify-center dark:border-r-insta-darkBorder bg-white dark:bg-black">
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        {/* Notification Container */}
        <div className="flex justify-center overflow-auto max-h-[800px] w-full">
          <div className="w-[500px]"> 
            {/* Loading Check */}
            {loading ? (
              <ul className="mt-3 w-full flex flex-col items-center ">
                {/* Notification Item */}
                <Link
                  to="/notifications"
                  className="w-full cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex justify-start gap-2 px-4 mb-2 items-center"
                >
                  <div className="flex justify-between items-center w-full">
                    {/* Left Content - Avatar and Message */}
                    <div className="flex gap-3 items-center">
                      <Avatar className="group-hover:scale-110 transition duration-150">
                        <AvatarImage
                          className="rounded-full w-11 h-11"
                          src="https://github.com/shadcn.png"
                        />
                        <AvatarFallback>DN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1 items-start max-w-[200px]">
                        <h1 className="text-[16px] font-semibold truncate">
                          daniish
                        </h1>
                        <p className="text-xs md:text-[13px] font-normal">
                          liked your post.{" "}
                          <span className="ml-1 text-insta-darkPrimary">23h</span>
                        </p>
                      </div>
                    </div>
                    {/* Right Content - Thumbnail */}
                    <div className="w-10 h-10 rounded-md">
                      <img
                        className="rounded-md w-full h-full object-cover"
                        src="https://res.cloudinary.com/dhcke4e7l/image/upload/v1724823317/zn0rl3rwnltvqfctwxjx.jpg"
                        alt="Post thumbnail"
                      />
                    </div>
                  </div>
                </Link>

                {/* Another Notification Item */}
                <Link
                  to="/notifications"
                  className="w-full cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex justify-start gap-2 px-4 mb-2 items-center"
                >
                  <div className="flex justify-between items-center w-full">
                    {/* Left Content - Avatar and Message */}
                    <div className="flex gap-3 items-center">
                      <Avatar className="group-hover:scale-110 transition duration-150">
                        <AvatarImage
                          className="rounded-full w-11 h-11"
                          src="https://github.com/shadcn.png"
                        />
                        <AvatarFallback>DN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1 items-start max-w-[200px]">
                        <h1 className="text-[16px] font-semibold truncate">
                          daniish
                        </h1>
                        <p className="text-xs md:text-[13px] font-normal">
                          started following you.{" "}
                          <span className="ml-1 text-insta-darkPrimary">23h</span>
                        </p>
                      </div>
                    </div>
                    {/* Right Content - Follow Button */}
                    <div>
                      <Button
                        size="sm"
                        className="rounded-lg px-4 py-1  dark:bg-insta-primary dark:text-white dark:hover:bg-insta-link bg-insta-primary hover:bg-insta-darkLink"
                      >
                        Follow
                      </Button>
                    </div>
                  </div>
                </Link>
              </ul>
            ) : (
              <SearchSkelton />
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  )
}

export default Notification