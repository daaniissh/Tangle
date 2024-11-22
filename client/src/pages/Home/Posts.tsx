import React from 'react'
import Post from './Post'
import PostSkeleton from '@/components/skeletons/PostSkeleton'

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