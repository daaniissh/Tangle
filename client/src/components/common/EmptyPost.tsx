import { Camera } from 'lucide-react'
import React from 'react'

const EmptyPost = () => {
  return (
    <div className='flex w-full flex-col justify-center items-center gap-2' >
      <div className="w-20 h-20 rounded-full border-2 dark:border-white border-black flex justify-center items-center">
        <Camera className='size-10 text-black dark:text-white font-extrabold' />
      </div>
      <h1 className='font-extrabold text-center text-2xl mt-1 dark:text-white text-black' >Share Photos</h1>
      <p className='font-semibold' >When you share photos, they will appear on your profile.</p>
      <button className='text-insta-link font-bold text-sm mt-4 hover:text-insta-primary' >Share your first photo</button>
    </div>
  )
}

export default EmptyPost