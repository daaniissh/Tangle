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
  const user = stories.find((story) => story.id.toString() === id)
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
          navigate(-1); // Navigate to "/"
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
          const newImages = prevImages ? [...prevImages] : []; // Create a copy of the current images
          newImages[oldIndex].progress = 0; // Reset progress of the new current image to 0
          return newImages; // Return the updated images array
        });

        return newIndex; // Update currentIndex to the new index
      }
      return prevIndex; // Stay on the first image
    });
  };
  const handleClose = () => {
  
      navigate(-1); // Navigate to home if no previous history
 
  };


  return (
    <div className='w-full flex  flex-col relative items-center  overflow-hidden bg-black md:bg-[#1a1a1a] h-screen'>

      <div className=" w-full fixed z-50 px-2 pt-2 hidden justify-between md:flex items-center h-10">
        <div className="w-32 py-5 mt-5 px-3 items-start justify-start">
          <Cirql className="fill-white w-20" />
        </div>
        <div onClick={handleClose} className="text-white z-50 cursor-pointer">
          <Plus className='rotate-45 size-10' />
        </div>
      </div>

      <div className="md:w-2/5 w-full   mx-auto absolute py-10 md:py-auto flex justify-between  items-center md:px-10 h-full">

        <ChevronLeftCircle className=' z-50 md:fill-white/30 md:text-black/0 fill-transparent text-transparent md:h-auto md:w-auto h-screen w-24 transition delay-100 md:hover:fill-white md:hover:text-black cursor-pointer' onClick={handlePrevious} />
        <ChevronRightCircle className=' z-50 my-10 md:fill-white/30 md:text-black/0 fill-transparent md:h-auto md:w-auto text-transparent  h-[40%] w-24 transition delay-100 md:hover:fill-white md:hover:text-black cursor-pointer' onClick={handleNext} />
      </div>

      <div className="flex  py-2 relative  md:w-auto h-screen rounded-0 mb-5 md:rounded-[8px]">


        <div className="flex  mt-2 w-full   justify-between  flex-col h-full ">
          <div className="absolute w-full h-20 px-8 md:px-0 flex  md:mt-auto   bg-gradient-to-b from-black/60 md:rounded-[8px]  to-transparent flex-col">
            <div className="flex justify-center gap-1 mt-1 w-full px-1">
              {images?.map((item) => <Progress value={item.progress} className="bg-[#70716d]/80 w-full h-[2px] mt-2 rounded-[10px]" />)}
            </div>
            <div className="mt-2 px-2  flex items-center">

              <Avatar className="scale-75 duration-150">
                <AvatarImage
                  className="rounded-full select-none object-fill"
                  src={user?.profileImg ? user?.profileImg : "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
                />
                <AvatarFallback className='capitalize text-white font-bold' >{user?.name.charAt(1)}</AvatarFallback>
              </Avatar>
              <span className="flex flex-row z-40  justify-between w-full items-center">
                <h1 className="text-[14px] font-[400] cursor-pointer ml-1 whitespace-nowrap overflow-hidden text-white text-ellipsis">
                  {user?.name} <span className="font-poppins text-center text-[14px] ml-[5px] text-gray-700 shadow">1h</span>
                </h1>
                <Link to="/" className="text-white px-4 block md:hidden   cursor-pointer">
                  <Plus className='rotate-45 size-10' />
                </Link>
              </span>
            </div>
          </div>

          <div className=" h-full w-[450px]  flex justify-center items-center md:rounded-[8px] overflow-hidden">
            <img
              className="md:rounded-[8px] w-full  h-full object-cover"
              src={images[currentIndex].url}
              alt="story"
            />
          </div>


          <div className=" w-full  absolute   z-50    flex justify-between  text-white bottom-0">
            <div className="flex justify-end items-center py-4  px-5 md:px-2  gap-5 w-full ">
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
