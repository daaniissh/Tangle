import React from 'react'
import Post from './Post'
import PostSkeleton from '@/components/skeletons/PostSkeleton'
import { PostData } from '@/lib/mock/post'
import { useQuery } from '@tanstack/react-query'
import { AuthUser, PostDetails } from '@/types/QueryTypes/queary'
import { QueryKey } from '@/types/QueryKey/key'

const Posts = () => {
  const { data: allPosts,isLoading, isPending } = useQuery<AuthUser>({ queryKey: ["posts"] as QueryKey });

 const Posts = Array.isArray(allPosts) ? allPosts : [];
 if(isLoading || isPending){
  return <PostSkeleton/>
 }
  return (
    <div className=' md:w-10/12 min-h-screen mb-20 z-0  overflow-x-hidden justify-center flex-col flex ' >
      {Posts.map((data:PostDetails) => <Post data={data} />)}

      {/* <PostSkeleton/> */}
    </div>
  )
}

export default Posts