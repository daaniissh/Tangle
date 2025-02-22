import { Skeleton } from "../ui/Skeleton";

const PostDetailsSkeleton = () => {
  return (
    <div className=" w-full   dark:text-white">
      {/* Render Skeleton Children */}

      <div className="cursor-pointer w-full  dark:bg-black">
        {/* Skeleton for Image */}
        <div className="w-full h-[450px] bg-black">
          <Skeleton className="h-full w-full object-cover" />
        </div>

        {/* Skeleton for Post Header */}
        <div className="flex items-center  justify-between px-2 py-1 border-b dark:border-gray-800">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>

        {/* Skeleton for Post Description */}
        <div className="p-4">
          <div className="flex gap-1 flex-col md:flex-row flex-1 w-full max-w-full">
            <Skeleton className="h-4 w-full text-sm text-center md:text-left" />
            <Skeleton className="h-4 w-full text-sm text-center md:text-left" />
          </div>
        </div>

        {/* Skeleton for Comments Section */}
        <div className="p-4 border-t flex flex-col gap-4 scrollbar-none dark:border-gray-800 overflow-y-auto flex-1">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>

        {/* Skeleton for Add Comment */}
        <div className="flex gap-2 flex-col items-center px-4 py-2 border-t dark:border-gray-800">
          <div className="px-2 w-full md:px-0 py-2 text-black dark:text-white space-y-2">
            <div className="flex items-center justify-between space-x-2">
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-6 h-6" />
            </div>
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <div className="w-full border-t dark:border-gray-900/90 py-3 flex">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="w-20 h-10 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsSkeleton