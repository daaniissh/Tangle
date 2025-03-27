import { Camera } from 'lucide-react'

import { PostDialog } from '../modals/create/Form'
import { useQuery } from '@tanstack/react-query';
import { AuthUser } from '@/types/QueryTypes/queary';
interface Data {
  profileData: string;
}
const EmptyPost = ({ profileData }: Data) => {
  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });
  const isAuthUser = profileData == authUser?._id
  return (
    <>
  {isAuthUser ? (
    <div className='flex w-full flex-col justify-center items-center gap-2'>
      <div className="w-20 h-20 rounded-full border-2 dark:border-white border-black flex justify-center items-center">
        <Camera className='size-10 text-black dark:text-white font-extrabold' />
      </div>
      <h1 className='font-extrabold text-center text-2xl mt-1 dark:text-white text-black'>Share Photos</h1>
      <p className='font-semibold text-center mx-4'>When you share photos, they will appear on your profile.</p>
      <PostDialog>
        <button className='text-insta-link font-bold text-sm mt-4 hover:text-insta-primary'>Share your first photo</button>
      </PostDialog>
    </div>
  ) : (
    <div className='flex w-full flex-col justify-center items-center gap-2'>
      <div className="w-20 h-20 rounded-full border-2 dark:border-white border-black flex justify-center items-center">
        <Camera className='size-10 text-black dark:text-white font-extrabold' />
      </div>
      <h1 className='font-extrabold text-center text-2xl mt-1 dark:text-white text-black'>No Posts Yet</h1>
      <p className='font-semibold'>This user hasn't shared any photos yet.</p>
    </div>
  )}
</>
  )
}

export default EmptyPost