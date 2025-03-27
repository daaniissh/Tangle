import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatSmallPostData } from '@/lib/utils/dateFunction'
import VerifyTick from '@/logos/VerifyTick'
import { NotificationType } from '@/types/QueryTypes/queary'

import { Link } from 'react-router-dom'
type likeProps = {
likePost:NotificationType
  OncloseAllComp?: () => void,
  // NotificationOpen: () => void;
};
const LikePost = ({ likePost, OncloseAllComp }: likeProps) => {
  const formateData = formatSmallPostData(likePost?.createdAt)
  console.log(likePost?.post, "===likepost")
  const link = likePost?.post?.is_story
    ? `/story/${likePost?.post?.user?.username}/${likePost?.post?.user?._id}` // Empty string or another value when `is_story` is true
    : `/post/${likePost?.post?.user?.username}/${likePost?.post?._id}`; // Dynamic link

  return (
    <Link
      to={`/profile/${likePost?.from?.username}`}

      className="w-full cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex justify-start gap-1 px-4 mb-2 items-center"
    >
      <div className="flex flex-row justify-between gap-10 w-full">
        <div className="flex gap-3 justify-center items-center">
          <Avatar className="group-hover:scale-110 duration-150">
            <AvatarImage
              className="rounded-full size-11"
              src={likePost?.from?.profileImg || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
            />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
          <div className="flex gap-2 items-start max-w-52 break-words">
            <span className="flex flex-col">
              <h1 className="text-[16px] flex font-[600] whitespace-nowrap overflow-hidden text-ellipsis">
                {likePost?.from?.username}
                {likePost?.from?.username == "danish" && <VerifyTick className='' />}
              </h1>
              <p className="font-instagram font-normal text-[13px]">
              {likePost?.post?.is_story ? "liked your story" : "liked your post."}
                <span className="font-poppins text-[13px] ml-1 text-insta-darkPrimary">{formateData}</span>
              </p>
            </span>
          </div>
        </div>
        <Link
          onClick={OncloseAllComp}
          to={link}
          className="flex gap-2 w-12 h-12 mr-1 rounded-md items-center"
        >
          {likePost?.post?.img ? <img
            className="rounded-md w-full h-full object-cover"
            src={likePost?.post?.img}
            alt="post"
          /> : <div className='flex justify-center items-center w-full h-full ' ><span className='text-center font-semibold text-xs' >[deleted]</span></div>}
        </Link>
      </div>
    </Link>
  )
}

export default LikePost