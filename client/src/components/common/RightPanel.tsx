import React, { useState } from 'react'
import RightPanelSkeleton from '../skeletons/RightPanelSkeleton'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'
import { users } from '@/lib/mock/user';
type Data = {
  username: string;
  is_followed: boolean;
  image: string;
  name: string;
};
const RightPanel = () => {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className="hidden dark:bg-black   h-auto xl:block my-8 w-80 ">
      {/* User Profile Section */}
      <div className="mb-5 px-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <Avatar className="transition-transform duration-150 group-hover:scale-110">
              <AvatarImage
                className="rounded-full object-cover w-11 h-11"
                src="https://i.pinimg.com/736x/cf/74/4e/cf744e083e68347b1f3488282db98a15.jpg"
              />
              <AvatarFallback>DN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="text-base font-semibold dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                daniish
              </h1>
              <p className="text-sm text-insta-darkPrimary">
                danish
              </p>
            </div>
          </div>
          <div className="text-xs">
            <span className="px-3 py-1 rounded-lg cursor-pointer font-semibold dark:text-insta-primary hover:text-insta-darkLink dark:hover:text-insta-link">
              Account
            </span>
          </div>
        </div>
      </div>

      {/* Suggested for You Section */}
      <div>
        <h1 className="text-sm text-insta-darkPrimary tracking-wide font-semibold px-2 mb-3">
          Suggested for you
        </h1>
        <ul className="flex w-full flex-col ">
          {users.map((user:Data)=>(
             <li className='' >
            <Link
              to="/notifications"
              className="w-full cursor-pointer  dark:text-insta-darkText rounded-md flex items-center p-2 hover:bg-insta-border dark:hover:bg-insta-darkBorder transition"
            >
              <div className="flex justify-between   items-center w-full">
                <div className="flex gap-3 items-center">
                  <Avatar className="transition-transform  duration-150 group-hover:scale-110">
                    <AvatarImage
                      className="rounded-full object-cover w-11 h-11"
                      src={user.image}
                    />
                    <AvatarFallback className='capitalize' >{user.name.charAt(1)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h1 className="text-base font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                      {user.username}
                    </h1>
                    <p className="text-sm text-insta-darkPrimary">
                      {user.name}
                    </p>
                  </div>
                </div>
                <div className="text-xs">
                  <span className="px-3 py-1 rounded-lg font-semibold cursor-pointer text-insta-primary dark:text-insta-link hover:text-insta-darkLink dark:hover:text-insta-link">
                    Follow
                  </span>
                </div>
              </div>
            </Link>
          </li>
          ))
         
}
        </ul>
      </div>
    </div>
  )
}

export default RightPanel
