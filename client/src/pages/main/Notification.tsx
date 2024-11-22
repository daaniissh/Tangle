import { SearchSkelton } from '@/components/skeltons/search_skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Notification = () => {
  const [loading, setLoading] = useState(true)
  return (
    <div className="w-full lg:mt-auto mt-16 flex justify-center">
  <div className="w-full h-screen flex justify-center dark:border-r-insta-darkBorder bg-white dark:bg-black">
    <div className="w-full flex flex-col items-center"> {/* Center the content vertically */}
      <div className="w-full">
        <div className=" flex justify-center overflow-auto max-h-[700px] w-full pr-3">
          <div className="w-[500px]"> {/* Enable vertical scrolling */}
            {/* notifications */}
            {loading ? (
              <ul className="h-full mt-3 flex flex-col items-center"> {/* Center items horizontally */}
                <Link
                  to="/notifications"
                  className="w-full cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex justify-start gap-1 px-4 mb-2 items-center"
                >
                  <div className="flex flex-row justify-between  gap-10 w-full">
                    <div className="flex gap-3 justify-center items-center">
                      <Avatar className="group-hover:scale-110 duration-150 !z-40">
                        <AvatarImage
                          className="rounded-full size-11"
                          src="https://github.com/shadcn.png"
                        />
                        <AvatarFallback>DN</AvatarFallback>
                      </Avatar>
                      <div className="flex gap-2 items-start max-w-52 break-words">
                        <span className="flex flex-col">
                          <h1 className="text-[16px] font-[600] whitespace-nowrap overflow-hidden text-ellipsis">
                            daniish
                          </h1>
                          <p className="font-instagram font-normal text-[13px]">
                            liked your post.
                            <span className="font-poppins text-[13px] ml-1 text-insta-darkPrimary">23h</span>
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-10 h-10 mr-1 rounded-xl items-center text-[12px]">
                      <img className="rounded-[6px]" src="https://res.cloudinary.com/dhcke4e7l/image/upload/v1724823317/zn0rl3rwnltvqfctwxjx.jpg" alt="" />
                    </div>
                  </div>
                </Link>
                <Link
                  to="/notifications"
                  className="w-full cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex justify-start gap-1 px-4 mb-2 items-center"
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
                          <h1 className="text-[16px] font-[600] whitespace-nowrap overflow-hidden text-ellipsis">
                            daniish
                          </h1>
                          <p className="font-instagram font-normal text-[13px]">
                            started following you.
                            <span className="font-poppins text-[13px] ml-1 text-insta-darkPrimary">23h</span>
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-[12px]">
                      <Button size="sm" className="rounded-xl hover:bg-insta-darkLink px-5 dark:bg-insta-primary dark:text-white dark:hover:bg-insta-link bg-insta-primary">Follow</Button>
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