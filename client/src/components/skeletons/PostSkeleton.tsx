import { Skeleton } from "../ui/Skeleton";

const PostSkeleton = () => {
	return (
		<div className='flex md:w-8/12 flex-col  w-full px-2 justify-start h-full mt-6 mx-auto   gap-4 '>
			<div className='flex gap-4 items-center'>
				<Skeleton className='skeleton w-10 h-10 rounded-full shrink-0'></Skeleton>
				<div className='flex flex-col gap-2'>
					<Skeleton className='skeleton h-2 w-12 rounded-full'></Skeleton>
					<Skeleton className='skeleton h-2 w-24 rounded-full'></Skeleton>
				</div>
			</div>
			<Skeleton className='skeleton h-80 w-full'></Skeleton>
     
		</div>
	);
};
export default PostSkeleton;