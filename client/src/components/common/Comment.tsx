import { type Comment } from '@/lib/mock/post'
import UserAvatar from './UserAvatar'
import { AuthUser, CommentPost } from '@/types/QueryTypes/queary'
import {  Trash } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
interface Cmnt {
  data: CommentPost,
  deleteComment: (commentId: string) => void
}
const Comment = ({ data, deleteComment }: Cmnt) => {
  const { _id, text, user }: CommentPost = data
  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });
  
  return (
    <div className="flex w-full h-auto space-x-3 items-start">

      <div className="flex-1 flex justify- items-center gap-2  overflow-hidden">
        <UserAvatar isStory={user?.is_story} className='text-sm font-bold' username={user?.username} image={user?.profileImg} />

        <div className="group cursor-pointer  flex justify-between w-full">
          <span className="!font-thin text-sm md:text-base overflow-hidden text-ellipsis text-black dark:text-white block">
            {text}
          </span>
        {authUser?._id === user._id &&  <Trash onClick={()=>deleteComment(_id)} className=' group-hover:opacity-100 duration-300 transition-opacity opacity-0  size-4 cursor-pointer text-insta-darkError' />}
        </div>

      </div>
    </div>

  )
}

export default Comment