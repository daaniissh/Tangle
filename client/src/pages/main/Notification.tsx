import CommentPost from '@/components/drawers/NotificationsTypesComp/CommentPost'
import FollowPost from '@/components/drawers/NotificationsTypesComp/FollowPost'
import LikePost from '@/components/drawers/NotificationsTypesComp/LikePost'
import { SearchSkelton } from '@/components/skeletons/SearchSkeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { QueryKey } from '@/types/QueryKey/key'
import { NotificationType } from '@/types/QueryTypes/queary'
import { useQuery } from '@tanstack/react-query'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Notification = () => {
  const [loading, setLoading] = useState(true)
  const APIURL = import.meta.env.VITE_API_URL;

  const { data, isPending, refetch, isLoading } = useQuery({
    queryKey: ["notifications"] as QueryKey,
    queryFn: async () => {
      try {
        const response = await fetch(`${APIURL}/notifications`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
      }
    },
    // refetchInterval: 10000,
  })
  return (
    <div className="w-full h-screen mt-10 mb-10 lg:mt-auto flex justify-center">
      {/* Main Container */}
      <div className="w-full h-screen flex justify-center dark:border-r-insta-darkBorder bg-white dark:bg-black">
        <div className="w-full flex flex-col items-center">
          <div className="w-full">
            {/* Notification Container */}
            <div className="flex justify-center overflow-auto  h-[calc(100vh-100px)] max-h-screen w-full">
              <div className="w-full">
                {/* Loading Check */}
                {!isLoading ? (
                  <ul className="h-full mt-3">
                    {data
                      ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((item: NotificationType) => {
                        switch (item.type) {
                          case 'like':
                            return <li key={item._id}><LikePost likePost={item} /></li>;
                          case 'follow':
                            return <li key={item._id}><FollowPost FollowPost={item} /></li>;
                          case 'comment':
                            return <li key={item._id}><CommentPost commentPost={item} /></li>;
                          default:
                            return null;
                        }
                      })}
                  </ul>
                ) : (
                  <ul className="mt-0">
                    {[...Array(10)].map((_, index) => (
                      <li key={`like-skeleton-${index}`}><SearchSkelton /></li>
                    ))}
                  </ul>
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