import PageNotAvailable from '@/components/common/BrokenLink';
import EmptyPost from '@/components/common/EmptyPost';

import SmallPost from '@/components/common/SmallPost';

import FollowersModal from '@/components/followrsPeepsModel/FollowPeeps';
import SpinnerIcon from '@/components/loaders/LoadingSpinner';
import ProgressLoader from '@/components/progressLoader/ProgressLoader';
import { Button } from '@/components/ui/button';
import useFollow from '@/hooks/useFollow';

import VerifyTick from '@/logos/VerifyTick';
import { QueryKey } from '@/types/QueryKey/key';
import { AuthUser, Post } from '@/types/QueryTypes/queary';
import { useQuery } from '@tanstack/react-query';
import { Bookmark, Grid3x3, Link as WebLink } from 'lucide-react';
import  { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';

interface ProfilePageProps {
  socket: Socket | null;
}

const ProfilePage = ({ socket }: ProfilePageProps) => {
  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
  const APIURL = import.meta.env.VITE_API_URL;
  const { username } = useParams();

  const { follow, isFollowing } = useFollow(socket)

  const { data: profileData, isRefetching, isLoading } = useQuery<AuthUser>({
    queryKey: ["profile", username] as QueryKey,
    queryFn: async () => {
      try {
        const res = await fetch(`${APIURL}/users/profile/${username}`, {
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
    retry: false

  })
  const { data: postData } = useQuery<Post[]>({
    queryKey: ["posts", username] as QueryKey,
    queryFn: async () => {
      try {
        const res = await fetch(`${APIURL}/posts/user/${username}`, {
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
    retry: false,



  })
  const { data: saveData } = useQuery<Post[]>({
    queryKey: ["posts", [activeTab, username]] as QueryKey,
    queryFn: async () => {
      try {
        const res = await fetch(`${APIURL}/posts/save/${username}`, {
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
    retry: false,
    enabled: !!username,



  })

  const alreadyFollowed = authUser?.following?.includes(profileData?._id!)
  const isEdit = authUser?.username === username
  return (
    <>

      {(isLoading || isRefetching) ? (
        <ProgressLoader />
      ) : profileData ? (
        <div className="min-h-screen max-h-screen scrollbar-thin dark:scrollbar-track-black scrollbar-thumb-white dark:scrollbar-thumb-stone-800 w-full overflow-y-scroll bg-white text-black dark:bg-black dark:text-white flex flex-col items-center md:mt-0 py-8 mt-10">
          {/* Profile Header */}
          <div className="w-full max-w-xl text-center">
            <div className="relative mb-4">
              {/* Profile Picture Placeholder */}
              <Link   to={profileData.is_story ? `/story/${profileData?.username}/${profileData?._id} ` : `/profile/${profileData?.username}`}
              
                className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center ${profileData?.is_story
                    ? "p-1 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500"
                    : "bg-gray-200 dark:bg-gray-700"
                  }`}
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-1">
                  <img
                    src={
                      profileData?.profileImg ||
                      "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"
                    }
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </Link>
            </div>

            {/* Username and Details */}
            <div className="text-xl font-semibold mb-4 flex justify-center gap-1 items-center">{profileData?.username}     {profileData?.username == "danish" && <VerifyTick className='' />} </div>
            {isEdit ? (
              <Link
                to={`/edit/${authUser?.username}`}
                className="px-4 py-1 border hover:bg-gray-200 dark:hover:bg-stone-900 border-gray-600 dark:border-gray-400 rounded-md text-gray-700 dark:text-gray-300"
              >
                Edit profile
              </Link>
            ) : (
              <Button
                onClick={() => follow(profileData?._id!)}
                size="sm"
                className={`rounded-lg ${alreadyFollowed && "!bg-neutral-700"
                  } hover:bg-insta-darkLink px-5 dark:bg-insta-primary dark:text-white dark:hover:bg-insta-link bg-insta-primary`}
              >
                {isFollowing && <SpinnerIcon />}
                {!isFollowing && alreadyFollowed && "Following"}
                {!isFollowing && !alreadyFollowed && "Follow"}
              </Button>
            )}

            <div className="mt-3 flex justify-center space-x-8">
              <div className="text-center ">
                <span className="font-bold">{postData?.length}</span> posts
              </div>
              <FollowersModal type='FOLLOWERS' username={username} >
                <div className="text-center  cursor-pointer">
                  <span className="font-bold">{profileData?.followers?.length}</span> followers
                </div>
              </FollowersModal>
              <FollowersModal type='FOLLOWING' username={username} >
                <div className="text-center cursor-pointer">
                  <span className="font-bold">{profileData?.following?.length}</span> following
                </div>
              </FollowersModal>
            </div>
            <div className="mt-2 text-gray-500 dark:text-gray-400">{profileData?.fullName}</div>
            <div className="">{profileData?.bio}</div>
            {profileData?.link && (
              <a
                href={profileData?.link}
                about="*/"
                className="flex justify-center items-center gap-1 hover:underline text-insta-link font-semibold text-sm"
              >
                <WebLink
                  className="size-3 text-insta-darkPrimary dark:text-zinc-600"
                  strokeWidth={3}
                />
                {profileData?.link}
              </a>
            )}
          </div>

          {/* Tabs Section */}
          <div className="w-full max-w-5xl mt-8 border-t border-gray-300 dark:border-gray-600">
            <div className="flex justify-around text-gray-500 dark:text-gray-400 text-sm py-2">
              <div
                onClick={() => setActiveTab("posts")}
                className={`relative cursor-pointer hover:text-black flex items-center gap-2 dark:hover:text-white ${activeTab === "posts"
                  ? 'text-black dark:text-white font-bold after:content-[""] after:absolute after:top-0 after:left-0 after:right-0 after:border-t after:border-black dark:after:border-white after:-translate-y-2'
                  : ""
                  }`}
              >
                <Grid3x3 className="size-4" /> POSTS
              </div>

              <div
                onClick={() => setActiveTab("saved")}
                className={`relative cursor-pointer hover:text-black flex items-center gap-2 dark:hover:text-white ${activeTab === "saved"
                  ? 'text-black dark:text-white font-bold after:content-[""] after:absolute after:top-0 after:left-0 after:right-0 after:border-t after:border-black dark:after:border-white after:-translate-y-2'
                  : ""
                  }`}
              >
                <Bookmark className="size-4" /> SAVED
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full max-w-5xl md:py-10 py-5 *:
          
          
          ">
            {activeTab === "posts" ? (
              <>
                {(postData && postData.length < 1) ? (
                  <EmptyPost profileData={profileData._id} />
                ) : (
                  <div className="grid gap-1 grid-cols-3 md:grid-rows-8 lg:grid-rows-3 text-gray-500 dark:text-gray-400">
                    {postData?.map((post: Post) => (
                      <SmallPost
                        comments={post?.comments?.length?.toString()}
                        img={post?.img}
                        likes={post?.likes?.length?.toString()}
                        link={`${username}/${post?._id}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {(saveData && saveData.length < 1) ? (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <p className="font-extrabold">No Saved Posts Yet</p>
                  </div>
                ) : (
                  <div className="grid gap-1 grid-cols-3 md:grid-rows-8 lg:grid-rows-3 text-gray-500 dark:text-gray-400">
                    {saveData?.map((post: Post) => (
                      <SmallPost
                        comments={post?.comments?.length?.toString()}
                        img={post?.img}
                        likes={post?.likes?.length?.toString()}
                        link={`${username}/${post?._id}`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <PageNotAvailable />
      )}
    </>

  );
};

export default ProfilePage;
