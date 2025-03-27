import ExplorePost from '@/components/common/SmallPost'
import SpinnerIcon from '@/components/loaders/LoadingSpinner';
import ProgressLoader from '@/components/progressLoader/ProgressLoader';
import { QueryKey } from '@/types/QueryKey/key';
import { AuthUser, Post } from '@/types/QueryTypes/queary';
import { useQuery } from '@tanstack/react-query';



const Explore = () => {



  
  const { data: allPosts,isLoading ,isRefetching} = useQuery<AuthUser>({ queryKey: ["posts"] as QueryKey });
 const Posts = Array.isArray(allPosts) ? allPosts : [];
  if (isLoading) {
    return (
      <div className="flex  justify-center w-full min-h-screen items-center overflow-y-scroll h-screen">
        <SpinnerIcon className='size-10 dark:text-white' />
      </div>

    )
  }

  return (
    <>
     {(isLoading || isRefetching) && (
        <ProgressLoader />
      )}

    <div className="flex justify-center w-full min-h-screen overflow-y-scroll mt-10 md:mt-0 h-screen scrollbar-thin dark:scrollbar-track-black scrollbar-thumb-white dark:scrollbar-thumb-gray-800 mb-20 md:mb-0">
      <div className="w-full px-2 mt-10  md:px-5 max-w-5xl">
        <div className="grid gap-1 grid-cols-3 auto-rows-fr ">
          {Posts.map((post: Post) => (
            <ExplorePost key={post._id} link={`${post.user.username}/${post._id}`} comments={post.comments.length.toString()} img={post.img} likes={post.likes.length.toString()} />
          ))}


        </div>
      </div>
    </div>
    </>

  )
}

export default Explore