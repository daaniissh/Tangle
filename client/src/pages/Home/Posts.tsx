import React from 'react'
import Post from './Post'
import PostSkeleton from '@/components/skeletons/PostSkeleton'

const Posts = () => {
  return (
    <div className=' md:w-10/12 min-h-screen mb-20 z-0  overflow-x-hidden justify-center flex-col flex ' >
      <Post/>
      <Post/>
      {/* <PostSkeleton/> */}
    </div>
  )
}

export default Posts