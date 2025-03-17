import React, { useState } from 'react'
import RightPanelSkeleton from '../skeletons/RightPanelSkeleton'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { users } from '@/lib/mock/user';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '@/types/QueryKey/key';
import { AuthUser } from '@/types/QueryTypes/queary';
import useFollow from '@/hooks/useFollow';
import SpinnerIcon from '../loaders/LoadingSpinner';
import VerifyTick from '@/logos/VerifyTick';
type Data = {
 profileData:AuthUser
};
const RightPanel = (socket) => {

  const APIURL = import.meta.env.VITE_API_URL;
    const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });
  
  const { data: suggestedData, isLoading } = useQuery({
    queryKey: ["suggested"] as QueryKey,
    queryFn: async () => {
      try {
        const res = await fetch(`${APIURL}/users/suggested`, {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json()
        if (data.error) return null
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong")
        }
        console.log(data, "===user data")
        return data
      } catch (error) {

      }

    },


  })

  const { follow, followData, isFollowing } = useFollow(socket)

  return (
    <div className="hidden dark:bg-black   h-auto xl:block my-8 w-80 ">
      {/* User Profile Section */}
      <div className="mb-5 px-2">
        <Link to={`/profile/${authUser?.username}`} className="flex  justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <Avatar className="transition-transform duration-150 group-hover:scale-110">
              <AvatarImage
                className="rounded-full object-cover w-11 h-11"
                src={authUser?.profileImg}
              />
              <AvatarFallback>DN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="text-base font-semibold dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
              {authUser?.username}
              </h1>
              <p className="text-sm text-insta-darkPrimary">
              {authUser?.fullName}
              </p>
            </div>
          </div>
          <Link  to={`/edit/${authUser?.username}`} className="text-xs">
            <span className="px-3 py-1 rounded-lg cursor-pointer font-semibold dark:text-insta-primary hover:text-insta-darkLink dark:hover:text-insta-link">
              Account
            </span>
          </Link>
        </Link>
      </div>

      {/* Suggested for You Section */}
      <div>
        <h1 className="text-sm text-insta-darkPrimary tracking-wide font-semibold px-2 mb-3">
          Suggested for you
        </h1>
       {isLoading ? <RightPanelSkeleton/> : <ul className="flex w-full flex-col ">
          {suggestedData?.map((user: AuthUser) => (

            <li className=''>
              <Link
                to={`/profile/${user.username}`}
                className="w-full cursor-pointer dark:text-insta-darkText rounded-md flex items-center p-2 hover:bg-insta-border dark:hover:bg-insta-text/50 transition"
              >
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-3 items-center">
                    <Avatar className="transition-transform duration-150 group-hover:scale-110">
                      <AvatarImage
                        className="rounded-full object-cover w-11 h-11"
                        src={user?.profileImg || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
                      />
                    </Avatar>
                    <div className="flex flex-col">
                      <h1 className="text-base flex font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                        {user?.username}
                        {user?.username == "danish" && <VerifyTick className='' />}
                      </h1>
                      <p className="text-sm text-insta-darkPrimary">
                        {user?.fullName}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs relative">
                    <span
                      onClick={(event) => {
                        event.stopPropagation(); // Prevents parent click
                        event.preventDefault();  // Stops link navigation
                        follow(user?._id);
                      }}
                      className="px-3 py-1 rounded-lg font-semibold cursor-pointer text-insta-primary dark:text-insta-link hover:text-insta-darkLink"
                    >
                      {isFollowing && <SpinnerIcon />}
                      {!isFollowing && "Follow"}
                    </span>
                  </div>
                </div>
              </Link>
            </li>


          ))

          }
        </ul>}
      </div>
    </div>
  )
}

export default RightPanel
