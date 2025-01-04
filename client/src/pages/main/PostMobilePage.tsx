
import Comment from '@/components/common/Comment'
import UserAvatar from '@/components/common/UserAvatar'
import PostDetailsSkeleton from '@/components/skeletons/PostDetailSkelton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Post, PostData } from '@/lib/mock/post'
import { QueryKey } from '@/types/QueryKey/key'
import { AuthUser, PostDetails } from '@/types/QueryTypes/queary'
import { useQuery } from '@tanstack/react-query'
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
interface PostDetailsProps {
 
  username?: string;
  postId?: string;
}
const PostMobilePage = ({postId}:any) => {

const APIURL = import.meta.env.VITE_API_URL;

  // const { username, postId } = useParams<{ username: string; postId: string }>();



  console.log(postId, "====postID")
  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });

  // const { data: post } = useQuery<AuthUser>({ queryKey: ["posts"] });


  const { data: postData, isLoading } = useQuery<PostDetails>({
    queryKey: ["posts"] as QueryKey,
    queryFn: async () => {
      try {
        const res = await fetch(`${APIURL}/posts/post/${postId}`, {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json()
        if (data.error) return null
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong")
        }
        console.log(data, "===user data")
        return data
      } catch (error) {

      }
    },
    enabled: !!postId,
  })

  const isLiked = postData?.likes?.includes(authUser?._id);
  // if(isLoading){
  //   return (
  //     <div className='w-full bottom-0 absolute h-screen' >
  //        <PostDetailsSkeleton/>
  //     </div>
  //   )
  // }

  return (
    <div className="w-full   mx-auto max-h-screen mt-14 overflow-y-scroll md:dark:border-b md:dark:border-gray-600/50 rounded-lg overflow-hidden">
      {/* Post Header */}
      <UserAvatar image={postData?.user?.profileImg} className='' padding='py-4 px-1' createdAt={postData?.createdAt} isStory={postData?.user?.is_story} username={postData?.user?.username} storyId={postData?._id} />

      {/* Post Image */}
      <div className="flex justify-center rounded-[6px] z-0 border-[0.5px] border-insta-darkPrimary/20">
        <img
          draggable="false"
          className="w-full h-auto object-cover rounded-[2px] md:rounded-[6px]"
          src={postData?.img}
          alt={postData?.text}
        />
      </div>

      {/* Post Actions and Caption */}
      <div className="px-2 md:px-0 py-2 text-black dark:text-white space-y-2">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex gap-4 items-center">
          <Heart  className={`${isLiked && "fill-red-700 text-red-700"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`}/>
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
            <Send className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary" />
          </div>
          <Bookmark className={`${postData?.is_save && "fill-white text-white"} w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-insta-darkPrimary`}/>
        </div>

        <p className="text-xs md:text-sm font-bold">{postData?.likes?.length} Likes</p>
        <p className="text-xs text-gray-400" >{postData?.createdAt}</p>

        {/* Post Text with Show More */}
        <div>
          <div className="flex gap-1 flex-col md:flex-row w-full">
            <span className="font-normal text-sm md:text-[14px] text-left whitespace-wrap overflow-hidden text-ellipsis text-black dark:text-white">
            {postData?.text}
            </span>
          </div>
        </div>

        {/* Comment Section */}
        <div className="py-4 border-t flex flex-col gap-5 flex-1 dark:border-gray-800 scrollbar-none min-h-screen pb-40">
        {postData?.comments?.map((data)=><Comment data={data}  />)}
        </div>

        <div className="w-full absolute bottom-10 px-2  right-0 bg-white  dark:bg-black py-5 flex">
          <Input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-gray-100 dark:bg-black dark:text-white rounded-lg px-4 py-2 outline-none"
          />
          <Button variant="ghost" className="ml-3 text-insta-link">
            Post
          </Button>
        </div>
      </div>
    </div>

  )
}

export default PostMobilePage