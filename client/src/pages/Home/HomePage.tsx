import React, { useEffect, useRef, useState } from 'react'
import Story from './Story'
import RightPanel from '@/components/common/RightPanel'
import { ArrowLeft, ArrowRight, ChevronLeftCircle, ChevronRightCircle, ChevronRightCircleIcon } from 'lucide-react';
import Posts from './Posts';

const HomePage = () => {
  const [isArrowHide, setIsArrowHide] = useState(false)
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  // Scroll to the right
  const scrollRight = () => {
    scrollableDivRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
  };

  // Scroll to the left
  const scrollLeft = () => {
    console.log("Scrolling right");
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
      <div className=' select-none flex md:overflow-auto overflow-x-scroll justify-between w-full flex-row    min-h-screen'>

        <div className="lg:ml-80 flex flex-col justify-center relative w-full lg:w-[650px] ">
          <ChevronRightCircle className=' fill-white lg:block hidden   absolute z-50 top-8 right-5  text-black/20 cursor-pointer' onClick={scrollRight} />

          <ChevronLeftCircle className={`${isArrowHide ? "opacity-1" : "opacity-0"} fill-white lg:block hidden  top-8  absolute z-50 left-5  text-black/20 cursor-pointer `} onClick={scrollLeft} />

          <div ref={scrollableDivRef} className="flex  w-full  md:border-none border-b-2 md:px-1    border-insta-border/20 lg:mt-0       h-28  overflow-x-scroll scrollbar-hide">


            <Story username='dani' img='https://i.pinimg.com/736x/0a/2f/68/0a2f68448ab64c7fb67e75ef410de143.jpg' />
   
        
          </div>
          <div className="flex justify-center">
            <Posts />

          </div>

        </div>

        <RightPanel />

      </div>

    </>
  )
}

export default HomePage