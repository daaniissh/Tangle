import React from 'react'
import Post from './Post'
<<<<<<< HEAD
import PostSkeleton from '@/components/skeletons/PostSkeleton'
=======
import PostSkeleton from '@/components/skeltons/post_skeleton'
>>>>>>> f58bf532e96780d60f90a57cac022b18d982480c

const Posts = () => {
  return (
    <div className=' w-full min-h-screen mb-20  overflow-x-hidden justify-center flex-col flex ' >
      <Post/>
      <Post/>
      {/* <PostSkeleton/> */}
    </div>
  )
}

export default Posts