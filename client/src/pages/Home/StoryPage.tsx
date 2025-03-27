import ShareDialog from '@/components/common/Share';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

import { stories } from '@/lib/mock/story';
//@ts-ignore
import 'swiper/css';
//@ts-ignore

import 'swiper/css/navigation';
//@ts-ignore

import 'swiper/css/pagination';
//@ts-ignore

import 'swiper/css/scrollbar';




import Cirql from '@/logos/cirql';
import { QueryKey } from '@/types/QueryKey/key';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeftCircle, ChevronRightCircle, Heart, Send, Plus, TrashIcon, ActivityIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthUser, PostDetails } from '@/types/QueryTypes/queary';

import { Button } from '@/components/ui/button';
import useFollow from '@/hooks/useFollow';
import SpinnerIcon from '@/components/loaders/LoadingSpinner';
import VerifyTick from '@/logos/VerifyTick';
import LikesModal from '@/components/likePeepsModel/LikePeepsModel';
import { Socket } from 'socket.io-client';

const StoryPage = ({ socket }: { socket: Socket | null }) => {


  const { id, username } = useParams();
  const navigate = useNavigate();
  const user = stories.find((story) => story.id.toString() === id);
  const APIURL = import.meta.env.VITE_API_URL;


  // Fetch progress from the backend and store it in progressValues
  const { data: storyData, refetch, isLoading } = useQuery({
    queryKey: ["userStory"] as QueryKey,
    queryFn: async () => {
      try {
        const res = await fetch(`${APIURL}/posts/story/${username}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        console.error(error);
      }
    },

    retry: false
  });




  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await fetch(`${APIURL}/posts/story/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          console.log("error");
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      navigate("/");  // Navigate to home after deleting post
    },
  });
  const { mutate: likePost, isPending: isLiking, data: likeData } = useMutation({
    mutationFn: async (postId: string) => {
      try {
        const res = await fetch(`${APIURL}/posts/like/${postId}`, {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log(data, "===user data");
        return data;
      } catch (error) { }
    },
    onSuccess: () => {

      refetch()
    },
  });

  const handleLikePost = async (id: string) => {
    console.log(likeData, "like====")
    if (isLiking) return;
    if (likeData == "like" || likeData == undefined) {
      // Only send notification when likeData is "like"
      console.log("like====")
      try {
        await socket?.emit("sendNotification", {
          from: authUser?._id,
          to: storyData?._id,
          type: "like",
        });



      } catch (error) {
        console.log("Error while sending like notification:", error);
      }
    }

    likePost(id);
  };


  const progressInterval = 8000; // 8 seconds per story
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressValues, setProgressValues] = useState<number[]>([]);


  useEffect(() => {
    const totalStories = storyData?.usersStories?.length || 0;
    setProgressValues(new Array(totalStories).fill(0));
  }, [storyData]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeIndex < progressValues.length - 1) {
        setActiveIndex((prev) => prev + 1);
      }
    }, progressInterval);

    return () => clearInterval(timer);
  }, [activeIndex, progressValues.length]);

  const resetProgressOnSlideChange = (swiper: any) => {
    const newProgressValues = progressValues.map((_, idx) => {
      if (idx < swiper.activeIndex) return 100;
      if (idx === swiper.activeIndex) return 0;
      return 0;
    });
    setProgressValues(newProgressValues);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValues((prev) =>
        prev.map((progress, idx) => {
          if (idx < activeIndex) return 100;
          if (idx === activeIndex) return Math.min(progress + 100 / (progressInterval / 100), 100);
          return 0;
        })
      );
    }, 100);
    if (progressValues[progressValues.length - 1] === 100) {
      navigate(-1); // Navigate to home page ("/")
    }
    return () => clearInterval(interval);
  }, [activeIndex, progressValues, navigate]);





  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });
  const { follow, isFollowing } = useFollow()
  const owner = authUser?._id === storyData?._id;
  const alreadyFollowed = authUser?.following?.includes(storyData?._id)
  if (isLoading) {
    return (
      <div className="w-full flex flex-col relative items-center overflow-hidden bg-black md:bg-[#1a1a1a] h-screen">
        {/* Top Navigation Skeleton */}
        {/* <div className="w-full fixed z-50 px-2 pt-2 hidden justify-between md:flex items-center h-10">
          <div className="w-32 py-5 mt-5 px-3 items-start justify-start bg-gray-700/50 animate-pulse rounded"></div>
          <div className="w-10 h-10 bg-gray-700/50 animate-pulse rounded"></div>
        </div> */}

        {/* Left and Right Navigation Arrows Skeleton */}
        {/* <div className="md:w-2/5 w-full mx-auto absolute py-10 md:py-auto flex justify-between items-center md:px-10 h-full">
          <div className="w-24 h-screen bg-gray-700/50 animate-pulse rounded"></div>
          <div className="w-24 h-[40%] bg-gray-700/50 animate-pulse rounded"></div>
        </div> */}

        {/* Main Content Skeleton */}
        <div className="flex py-2 relative md:w-auto h-screen rounded-0 mb-5 md:rounded-[8px]">
          <div className="flex md:mt-2 w-full justify-between flex-col h-full">
            {/* Progress Bar and Profile Skeleton */}
            <div className="absolute w-full h-20 px-8 md:px-0 flex md:mt-auto z-50 bg-gradient-to-b from-black/50 to-transparent flex-col">
              <div className="flex justify-center gap-1 mt-1 w-full px-3">
                {[1, 2, 3].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-700/50 w-full h-[2px] mt-2 rounded-[10px] animate-pulse"
                  ></div>
                ))}
              </div>

              <div className="mt-2 px-2 z-50 flex items-center">
                <div className="w-10 h-10 bg-gray-700/50 animate-pulse rounded-full"></div>
                <div className="ml-2 flex-1">
                  <div className="w-20 h-4 bg-gray-700/50 animate-pulse rounded"></div>
                </div>
                <div className="w-20 h-8 bg-gray-700/50 animate-pulse rounded"></div>
              </div>
            </div>

            {/* Story Content Skeleton */}
            <div className="h-full w-[450px] flex justify-center items-center md:rounded-[8px] overflow-hidden">
              <div className="w-full h-full bg-gray-700/50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col relative items-center overflow-hidden bg-black md:bg-[#1a1a1a] h-screen">
      <div className="w-full fixed z-50 px-2 pt-2 hidden justify-between md:flex items-center h-10">
        <div className="w-32 py-5 mt-5 px-3 items-start justify-start">
          <Cirql className="fill-white w-20" />
        </div>
        <span onClick={() => navigate(-1)} className="text-white z-50 cursor-pointer">
          <Plus className="rotate-45 size-10" />
        </span>
      </div>

      <div className="md:w-2/5 w-full mx-auto absolute py-10 md:py-auto flex justify-between items-center md:px-10 h-full">
        <ChevronLeftCircle
          ref={prevButtonRef}
          className="z-50 md:fill-white/50 md:text-black/0 fill-transparent text-transparent md:h-auto md:w-auto h-screen w-24 transition delay-100 md:hover:fill-white md:hover:text-black cursor-pointer"
        />
        <ChevronRightCircle
          ref={nextButtonRef}
          className="z-50 my-10 md:fill-white/50 md:text-black/0 fill-transparent md:h-auto md:w-auto text-transparent h-[40%] w-24 transition delay-100 md:hover:fill-white md:hover:text-black cursor-pointer"
        />
      </div>

      <div className="flex py-2 relative md:w-auto h-screen rounded-0 mb-5 md:rounded-[8px]">
        <div className="flex md:mt-2 w-full justify-between flex-col h-full">
          <div className="absolute w-full h-20 px-8 md:px-0 flex md:mt-auto z-50 bg-gradient-to-b from-black/50 to-transparent flex-col">
            <div className="flex justify-center gap-1 mt-1  w-full px-1 md:px-3">
              {progressValues.map((progress, idx) => (
                <Progress
                  value={progress}
                  className="bg-[#70716d]/80 w-full h-[2px] mt-2 rounded-[10px]"
                  key={idx}
                />
              ))}
            </div>

            <div className="mt-2 md:px-2 z-50 flex items-center">
              <Link to={`/profile/${storyData?.username}`} className='w-full flex' >
                <Avatar className="scale-75 duration-150">
                  <AvatarImage
                    className="rounded-full select-none object-fill"
                    src={storyData?.profileImg || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
                  />
                  <AvatarFallback className="capitalize text-white font-bold">
                    {user?.name.charAt(1)}
                  </AvatarFallback>
                </Avatar>
                <span className="flex flex-row z-50 justify-between w-full items-center">
                  <h1 className="text-base flex gap-1 items-center font-[400] cursor-pointer ml-1 whitespace-nowrap overflow-hidden text-white text-ellipsis">
                    {storyData?.username}

                    {storyData?.username == "danish" && <VerifyTick className='' />}                  </h1>
                  <Link to="/" className="text-white px-4 block md:hidden cursor-pointer">
                    <Plus className="rotate-45 size-10" />
                  </Link>
                </span>
              </Link>
              {!alreadyFollowed && !owner && <Button onClick={() => follow(storyData?._id)} className=' hover:bg-insta-darkLink px-4  dark:bg-insta-primary  dark:text-white dark:hover:bg-insta-link bg-insta-primary' > {isFollowing ? <SpinnerIcon /> : "Follow"} </Button>}
            </div>
          </div>

          <div className="h-full w-[450px] flex justify-center items-center md:rounded-[8px] overflow-hidden">
            <Swiper
              className="!z-30"
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              navigation={{
                nextEl: nextButtonRef.current,
                prevEl: prevButtonRef.current,
              }}
              spaceBetween={0}
              slidesPerView={1}
              loop={false}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
                resetProgressOnSlideChange(swiper);
              }}
              speed={0}
              onBeforeInit={() => {
                // if (swiper && swiper.params && swiper.params.navigation) {
                //   swiper.params.navigation.nextEl = nextButtonRef.current;
                //   swiper.params.navigation.prevEl = prevButtonRef.current;
                // }

              }}
            >
              {storyData?.usersStories
                ?.sort((a: PostDetails, b: PostDetails) =>
                  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                )
                .map((item: PostDetails) => {
                  const isLiked = item?.likes?.some((like) => like._id === authUser?._id);

                  return (<SwiperSlide className="w-full rounded-[8px]">
                    <div className="absolute inset-x-0 bottom-16 md:bottom-0 md:bg-gradient-to-t from-black/70 via-black/40 to-transparent z-50 p-4">
                      <div className="flex items-center justify-between px-4 md:px-0 ">
                        {/* Delete Button (owner only) */}
                        {owner && (
                          <Button
                            onClick={() => deletePost(item?._id)}
                            variant="ghost"
                            className="text-white hover:bg-white/10 hover:text-white/60 transition-colors rounded-full p-2"
                            aria-label="Delete post"
                          >
                            {isDeleting ? (
                              <SpinnerIcon className="h-5 w-5" />
                            ) : (
                              <TrashIcon className="h-5 w-5" />
                            )}
                          </Button>
                        )}

                        {/* Actions Container */}
                        <div className="flex items-center gap-4 ml-auto">
                          {/* Like/Activity Button */}
                          {owner ? (
                            <LikesModal users={item.likes}>
                              <button
                                className="flex items-center gap-1 text-white hover:text-white/80 transition-colors"
                                aria-label="View activity"
                              >
                                <ActivityIcon className="h-5 w-5" />
                                <span className="text-sm font-medium hidden sm:inline">Activity</span>
                              </button>
                            </LikesModal>
                          ) : (
                            <button
                              onClick={() => handleLikePost(item._id)}
                              className="group flex items-center gap-1"
                              aria-label={isLiked ? "Unlike post" : "Like post"}
                            >
                              <Heart
                                className={`h-5 w-5 transition-all ${isLiked
                                    ? "fill-red-600 text-red-600 scale-110"
                                    : "text-white group-hover:text-white/80"
                                  }`}
                              />

                            </button>
                          )}

                          {/* Share Button */}
                          <ShareDialog story username={storyData?.username} id={storyData?._id}>
                            <button
                              className="text-white hover:text-white/80 transition-colors"
                              aria-label="Share post"
                            >
                              <Send className="h-5 w-5" />
                            </button>
                          </ShareDialog>
                        </div>
                      </div>
                    </div>
                    <img
                      draggable="false"
                      className="w-full select-none object-cover h-screen rounded-lg md:object-cover"
                      src={item.img}
                      alt="Story 1"
                    />
                    <div className="absolute w-full bg-black/50 text-white font-medium bottom-32 md:bottom-24 flex justify-center">
                      <p className="text-center text-base">{item.text}</p>
                    </div>
                  </SwiperSlide>)
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
