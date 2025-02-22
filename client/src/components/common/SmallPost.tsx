import { Heart, MessageCircle } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
type Props = {
  img: string;
  likes: string;
  comments: string;
  link?: string;


}
const SmallPost = ({ comments, img, likes,link }: Props) => {
  return (
    <Link to={`/post/${link}`} className="w-full  select-none cursor-pointer group relative">
      {/* Hover overlay */}
      <div className="absolute inset-0 hidden  md:flex items-center justify-center gap-5 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className='flex gap-1 font-bold items-center text-white'>
          <Heart className='fill-white' />
          {likes}
        </span>
        <span className='flex gap-1 font-bold items-center text-white'>
          <MessageCircle className='fill-white' />
          {comments}
        </span>
      </div>

      {/* Image Container */}
      <div className="w-full  h-full">
        <img
          draggable="false"
          className="w-full h-full object-cover aspect-square"
          src={img}
          alt="image"
        />
      </div>
    </Link>

  )
}

export default SmallPost