import React from 'react'
import Post from './Post'
import PostSkeleton from '@/components/skeletons/PostSkeleton'
import { PostData } from '@/lib/mock/post'

const Posts = () => {
  return (
    <div className=' md:w-10/12 min-h-screen mb-20 z-0  overflow-x-hidden justify-center flex-col flex ' >
      {PostData.map((data)=><Post data={data} />) }
    
      {/* <PostSkeleton/> */}
    </div>
  )
}

export default Posts