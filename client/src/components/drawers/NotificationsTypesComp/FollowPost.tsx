import SpinnerIcon from '@/components/loaders/LoadingSpinner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import useFollow from '@/hooks/useFollow'
import { formatSmallPostData } from '@/lib/utils/dateFunction'
import { AuthUser, NotificationType } from '@/types/QueryTypes/queary'
import { useQuery } from '@tanstack/react-query'

import { Link } from 'react-router-dom'
const FollowPost = ({ FollowPost}:{FollowPost:NotificationType; OncloseAllComp?: () => void,}) => {
  const formateData = formatSmallPostData(FollowPost?.createdAt)
  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });
  const { follow, isFollowing } = useFollow()
  const alreadyFollowed = authUser?.following?.includes(FollowPost?.from?._id)
  return (
    <Link
    to={`/profile/${FollowPost?.from?.username}`}
      className="w-full cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex justify-start gap-1 px-4 mb-2 items-center"
    >
      <div className="flex flex-row justify-between gap-10 w-full">
        <div className="flex gap-3 justify-center items-center">
          <Avatar className="group-hover:scale-110 duration-150">
            <AvatarImage
              className="rounded-full size-11"
              src={FollowPost?.from?.profileImg || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
            />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
          <div className="flex gap-2 items-start max-w-52 break-words">
            <span className="flex flex-col">
              <h1 className="text-[16px] font-[600] whitespace-nowrap overflow-hidden text-ellipsis">
                {FollowPost?.from?.username}
              </h1>
              <p className="font-instagram font-normal text-[13px]">
                started following you.
                <span className="font-poppins text-[13px] ml-1 text-insta-darkPrimary">{formateData}</span>
              </p>
            </span>
          </div>
        </div>
        <div className="flex  items-center text-[12px]">
          <Button onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            follow(FollowPost?.from?._id)}} size="sm" className={`rounded-lg ${alreadyFollowed && "!bg-neutral-700"} hover:bg-insta-darkLink px-5 dark:bg-insta-primary dark:text-white dark:hover:bg-insta-link bg-insta-primary`}>   {isFollowing && <SpinnerIcon />}
            {!isFollowing && alreadyFollowed && "Following"}
            {!isFollowing && !alreadyFollowed && "Follow back"}</Button>
        </div>
      </div>
    </Link>
  )
}

export default FollowPost