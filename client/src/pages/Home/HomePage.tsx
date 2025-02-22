import React, { useEffect, useRef, useState } from 'react';
import Story from './Story';
import RightPanel from '@/components/common/RightPanel';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import Posts from './Posts';
import { stories } from '@/lib/mock/story';
import { useQuery } from '@tanstack/react-query';
import { Post } from '@/lib/mock/post';
import { QueryKey } from '@/types/QueryKey/key';
import { AuthUser, PostDetails } from '@/types/QueryTypes/queary';
import ProgressLoader from '@/components/progressLoader/ProgressLoader';

const HomePage = ({ socket }) => {
  const [isArrowHide, setIsArrowHide] = useState(false);
  const { data: stories, isLoading } = useQuery({ queryKey: ["story"] })
  const { data: authUser, isLoading: isAuthUser,isRefetching } = useQuery<AuthUser>({ queryKey: ["authUser"] })

  console.log(stories)

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  // Scroll to the right
  const scrollRight = () => {
    scrollableDivRef.current?.scrollBy({ left: 600, behavior: 'smooth' });
  };

  // Scroll to the left
  const scrollLeft = () => {
    scrollableDivRef.current?.scrollBy({ left: -600, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableDivRef.current) {
        const scrollPosition = scrollableDivRef.current.scrollLeft;
        setIsArrowHide(scrollPosition > 100);
      }
    };

    const scrollDiv = scrollableDivRef.current;
    scrollDiv?.addEventListener('scroll', handleScroll);

    return () => {
      scrollDiv?.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      {(isAuthUser || isLoading || isRefetching) && (
        <ProgressLoader />
      )}

      <div className="flex justify-between scrollbar-thin dark:scrollbar-track-black scrollbar-thumb-white dark:scrollbar-thumb-stone-800 z-0 h-screen w-full overflow-x-auto md:px-2 overflow-y-auto">
        {/* Conditionally render ProgressLoader at the top */}

        {/* Left Section: Stories + Posts */}
        <div className="flex flex-col mt-14 md:mt-0 w-full max-w-[850px]">
          {/* Scrollable Stories Section */}
          <div className="relative z-0 md:-0 md:mx-20 -insta-darkPrimary/50 flex md:justify-start w-full mt-4">
            <div className="absolute w-10/12 hidden px-8 bottom-2 md:flex justify-between items-center h-full">
              <ChevronLeftCircle
                className={`${isArrowHide ? 'opacity-1' : 'hidden'} fill-white top-8 z-50 text-black/20 cursor-pointer`}
                onClick={scrollLeft}
              />
              <ChevronRightCircle
                className={`${isArrowHide ? 'opacity-1' : 'opacity-0'} fill-white top-8 z-50 text-black/20 cursor-pointer`}
                onClick={scrollRight}
              />
            </div>
            <div
              ref={scrollableDivRef}
              className="flex relative px-1 md:px-auto overflow-x-hidden max-w-[650px] scrollbar-hide md:gap-5 gap-1 py-[1px] md:py-2"
            >
              {stories
                ?.filter((story) => story?.username == authUser?.username)
                .map((story) => (
                  <Story
                    key={story._id}
                    username={story?.username}
                    name={story.username}
                    id={story._id.toString()}
                    img={story.profileImg}
                  />
                ))}
              {stories
                ?.filter((story) => story.username !== authUser?.username)
                .map((story) => (
                  <Story
                    key={story._id}
                    username={story.username}
                    name={story.username}
                    id={story._id.toString()}
                    img={story.profileImg}
                  />
                ))}
            </div>
          </div>

          {/* Posts Section */}
          <div className="w-full flex justify-center">
            <Posts socket={socket} />
          </div>
        </div>

        {/* Right Section: Right Panel */}
        <div className="hidden lg:flex flex-shrink-0">
          <RightPanel />
        </div>
      </div>


    </>


  );
};

export default HomePage;
