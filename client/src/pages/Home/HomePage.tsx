import React, { useEffect, useRef, useState } from 'react';
import Story from './Story';
import RightPanel from '@/components/common/RightPanel';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import Posts from './Posts';
import { stories } from '@/lib/mock/story';

const HomePage = () => {
  const [isArrowHide, setIsArrowHide] = useState(false);
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  // Scroll to the right
  const scrollRight = () => {
    scrollableDivRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
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
    <div className="flex justify-between   z-0 h-screen w-full overflow-x- md:px-2  overflow-y-auto">
             
      {/* Left Section: Stories + Posts */}
      <div className="flex flex-col mt-14 md:mt-0   w-full max-w-[850px] ">
        {/* Scrollable Stories Section */}
        <div className="relative md:border-0 px-2 border-b border-insta-darkPrimary/50 flex md:justify-center  w-full mt-4">
          {/* <ChevronLeftCircle
            className={`${isArrowHide ? 'opacity-1' : 'opacity-1'} absolute left-4 top-8 z-50 text-black/20 cursor-pointer`}
            onClick={scrollLeft}
          /> */}
          <div
            ref={scrollableDivRef}
            className="flex  overflow-x-auto max-w-[650px] scrollbar-hide md:gap-5 gap-1 py-[1px]  md:py-2"
          >

            {stories.map((story) => (<Story
              username={story.username}
              name={story.name}
              id={story.id}
              img={story.profileImg}
            />))}


            {/* Add more Story components here */}
          </div>
          <ChevronRightCircle
            className="absolute right-4 top-8 z-50 text-black/20 cursor-pointer"
            onClick={scrollRight}
          />
        </div>

        {/* Posts Section */}
        <div className="w-full  flex justify-center px-2 ">
          <Posts />
        </div>
      </div>

      {/* Right Section: Right Panel */}
      <div className="hidden lg:flex     flex-shrink-0">
        <RightPanel />
      </div>
    </div>





  );
};

export default HomePage;
