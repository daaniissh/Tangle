
import Post from './Post'
import PostSkeleton from '@/components/skeletons/PostSkeleton'

import { useQuery } from '@tanstack/react-query'
import {  PostDetails } from '@/types/QueryTypes/queary'
import { QueryKey } from '@/types/QueryKey/key'
import { Compass } from 'lucide-react'

import { Link } from 'react-router-dom'

const Posts = () => {
  const { data: allPosts, isLoading, isPending } = useQuery<PostDetails[]>({ queryKey: ["following"] as QueryKey });

  const Posts = Array.isArray(allPosts) ? allPosts : [];
  if (isLoading || isPending) {
    return <PostSkeleton />
  }
  return (
    <div className=' md:w-10/12 min-h-screen mb-20 z-0 w-full overflow-x-hidden justify-center flex-col flex ' >
      {allPosts?.length !== 0 ? <>{Posts.map((data: PostDetails) => <Post data={data} />)}</>
        : <div className=" dark:text-white w-full h-screen flex flex-col my-10 items-center space-y-6 p">
          <h2 className="text-3xl font-semibold text-center">Start Your Journey on Cirql</h2>
          <p className="text-lg text-center max-w-md">Follow inspiring individuals to stay updated with their posts. Dive into a world of engaging and insightful content.</p>
          <Compass className="w-12 h-16 animate-spin" />
          <Link to="/explore" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-3xl text-lg">Go and Explore</Link>
        </div>
      }

    </div>
  )
}

export default Posts