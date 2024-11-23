import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Progress } from '@/components/ui/Progress';
import { stories } from '@/lib/mock/story';

import Cirql from '@/logos/Cirql';
import { ChevronLeftCircle, ChevronRightCircle, Heart, Send, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
type Story = {
  url: string;
  progress: number;
};

const StoryPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const user = stories.find((story)=>story.id.toString() === id)
  const [images, setImages] = useState<Story[] | undefined>(user?.stories);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const duration = 20000; // 20 seconds for each image
    const interval = 100; // Update every 100 milliseconds
    const increment = (interval / duration) * 100; // Calculate how much to increment
  
    const timer = setInterval(() => {
      setImages((prev) => {
        const newImages = prev ? [...prev] : [];
        const currentImage = newImages[currentIndex];
  
        if (!currentImage) return newImages; // Guard against undefined images
  
        // Increment the current image's progress
        currentImage.progress += increment;
  
        // Check if it's the last image or if there's only one image
        if (
          (currentIndex === newImages.length - 1 && currentImage.progress >= 100) || 
          (newImages.length === 1 && currentImage.progress >= 100)
        ) {
          clearInterval(timer); // Stop the interval
          newImages.forEach((image) => (image.progress = 0)); // Reset progress for all images
          navigate("/"); // Navigate to "/"
          return newImages;
        }
  
        // If the current image is the first one and reaches 100% progress
        if (currentIndex === 0 && currentImage.progress >= 100) {
          clearInterval(timer); // Stop the interval
          handleNext(); // Move to the next image
          return newImages; // Return unchanged images
        }
  
        return newImages; // Update state
      });
    }, interval);
  
    return () => clearInterval(timer); // Cleanup on unmount
  }, [currentIndex, images.length]); // Run effect on currentIndex or images change
  

  const handleNext = () => {

    setImages((prevImages) => {
      const newImages = prevImages ? [...prevImages] : []; // Create a copy of the current images
      newImages[currentIndex].progress = 100; // Reset progress of the current image to 0
      return newImages; // Return the updated images array
    });
    setCurrentIndex((prevIndex) => {
      // Check if we are not at the last image before incrementing
      if (prevIndex < images.length - 1) {
        return prevIndex + 1; // Move to the next image
      }
      return prevIndex; // Stay on the last image
    }); // Loop back to the start

  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      // Only decrement if we are not at the first image
      if (prevIndex > 0) {
        const newIndex = prevIndex - 1; // Move to the previous image
        const oldIndex = newIndex + 1;

        setImages((prevImages) => {
          const newImages = prevImages ? [...prevImages] : []; // Create a copy of the current images
          newImages[newIndex].progress = 0; // Reset progress of the new current image to 0
          return newImages; // Return the updated images array
        });
        setImages((prevImages) => {
          const newImages = prevImages ? [...prevImages]: []; // Create a copy of the current images
          newImages[oldIndex].progress = 0; // Reset progress of the new current image to 0
          return newImages; // Return the updated images array
        });

        return newIndex; // Update currentIndex to the new index
      }
      return prevIndex; // Stay on the first image
    });
  };


  return (
    <div className='w-full flex  flex-col relative items-center overflow-hidden bg-black md:bg-[#1a1a1a] h-screen'>
      <div className="w-full hidden justify-between md:flex items-center h-10">
        <div className="w-32 py-5 mt-5 px-3 items-start justify-start">
          <img className="filter invert" src="./Logo.png" alt="" />
        </div>
        <Link to="/" className="text-white px-4 mt-5 cursor-pointer">
          <Plus className='rotate-45 size-10' />
        </Link>
      </div>
      <div className="w-full  max-w-[650px] top-10 mx-auto absolute z-40 flex justify-between  items-center md:px-14 h-full">
        <ChevronLeftCircle className='md:fill-white/30 md:text-black/0 fill-transparent text-transparent md:h-auto md:w-auto h-screen w-24 transition delay-100 md:hover:fill-white md:hover:text-black cursor-pointer' onClick={handlePrevious} />
        <ChevronRightCircle className='md:fill-white/30 md:text-black/0 fill-transparent md:h-auto md:w-auto text-transparent  h-[90%] w-24 transition delay-100 md:hover:fill-white md:hover:text-black cursor-pointer' onClick={handleNext} />
      </div>
      <div className="flex relative w-full md:w-auto h-screen rounded-0 mb-5 md:rounded-[8px]">


        <div className="flex justify-between relative flex-col h-full w-full">
          <div className="flex-1 h-20 flexmd:mt-auto w-full md:w-auto fixed bg-gradient-to-b from-black/30 to-transparent flex-col">
            <div className="flex justify-center gap-1 mt-1 md:mt-2 w-[400px] md:w-[400px] px-1">
              {images?.map((item) => <Progress value={item.progress} className="bg-[#70716d]/30 w-[380px] h-[2px] mt-2 rounded-[10px]" />)}
            </div>
            <div className="mt-2 px-2 flex items-center">
          
              <Avatar className="scale-75 duration-150">
                <AvatarImage
                  className="rounded-full select-none object-fill"
                  src={user?.profileImg}
                />
                <AvatarFallback className='capitalize text-white font-bold' >{user?.name.charAt(1)}</AvatarFallback>
              </Avatar>
              <span className="flex flex-row z-50  justify-between w-full items-center">
                <h1 className="text-[14px] font-[400] cursor-pointer ml-1 whitespace-nowrap overflow-hidden text-white text-ellipsis">
                  {user?.name} <span className="font-poppins text-center text-[14px] ml-[5px] text-gray-700 shadow">1h</span>
                </h1>
                <Link to="/" className="text-white px-4 block md:hidden  cursor-pointer">
                  <Plus className='rotate-45 size-10' />
                </Link>
              </span>
            </div>
          </div>

          <div className="w-[400px] h-full flex    mb-14 md:rounded-[8px]">
            <img className='md:rounded-[8px] w-full md:object-cover object-contain' src={images[currentIndex].url} alt="story" />
          </div>

          <div className="h-20 w-full md:w-[400px] md:bg-gradient-to-t  z-50   md:to-transparent flex justify-between fixed text-white md:bottom-10 bottom-0">
            <div className="flex justify-end items-start px-5 md:px-2 py-6 md:py-auto gap-5 w-full h-screen">
              <Heart className='cursor-pointer fill-insta-gradientMid text-insta-gradientMid' />
              <Send className='cursor-pointer' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
