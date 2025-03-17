import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatSmallPostData } from '@/lib/utils/dateFunction';
import React from 'react'
import { Link } from 'react-router-dom'
type CommentProps = {

  OncloseAllComp?: () => void,
  // NotificationOpen: () => void;
};
const CommentPost = ({ commentPost, OncloseAllComp }: CommentProps) => {
  const formateData = formatSmallPostData(commentPost?.createdAt)

  return (
    <Link
    to={`/profile/${commentPost?.post?.user?.username}`}
      className="w-full cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex justify-start gap-1 px-4 mb-2 items-center"
    >
      <div className="flex flex-row justify-between gap-10 w-full">
        <div className="flex gap-3 justify-center items-center">
          <Avatar className="group-hover:scale-110 duration-150">
            <AvatarImage
              className="rounded-full size-11"
              src={commentPost?.from?.profileImg || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
            />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
          <div className="flex gap-2 items-start max-w-52 break-words">
            <span className="flex flex-col">
              <h1 className="text-[16px] font-[600] whitespace-nowrap overflow-hidden text-ellipsis">
                {commentPost?.from?.username}
              </h1>
              <p className="font-instagram font-semibold text-[13px]">
                commented: {commentPost?.comment}
                <span className="font-poppins font-normal text-[13px] ml-1 text-insta-darkPrimary">{formateData}</span>
              </p>
            </span>
          </div>
        </div>
        <Link
          onClick={OncloseAllComp}
          to={`/post/${commentPost?.post?.user?.username}/${commentPost?.post?._id}`}
          className="flex gap-2 w-12 h-12 mr-1 rounded-md items-center"
        >
         {commentPost?.post?.img ? <img
            className="rounded-md w-full h-full object-cover"
            src={commentPost?.post?.img}
            alt="post"
          /> : <div className='flex justify-center items-center w-full h-full ' ><span className='text-center font-semibold text-xs' >[deleted]</span></div>}
        </Link>

      </div>
    </Link>
  )
}

export default CommentPost