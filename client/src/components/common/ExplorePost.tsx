import { Heart, MessageCircle } from 'lucide-react';
import React from 'react'
type Props = {
  img: string;
  likes: string;
  comments: string;

}
const ExplorePost = ({ comments, img, likes }: Props) => {
  return (
    <div className="bg-white  select-none cursor-pointer group md:h-auto h-auto lg:h-80 relative">
      <div className="absolute  hidden opacity-0 group-hover:opacity-100 duration-200  bg-black/25 w-full h-full md:flex justify-center items-center md:gap-5">
        <span className='flex gap-1 font-bold items-center justify-center text-white' ><Heart className='fill-white text-white' />{likes}</span>
        <span className='flex gap-1 font-bold items-center justify-center text-white' ><MessageCircle className='fill-white text-white' />{comments}</span>
      </div>
      <div className="w-full h-full">
        <img draggable="false" className='md:w-80 h-40   md:h-80 md:object-cover object-fill aspect-video' src={img} alt="" />
      </div>
    </div>
  )
}

export default ExplorePost