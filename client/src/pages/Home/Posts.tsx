import React from 'react'
import Post from './Post'
import PostSkeleton from '@/components/skeltons/post_skeleton'

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