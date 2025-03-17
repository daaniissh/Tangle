export const FollowSkelton = () => (
  <div className="w-full cursor-pointer dark:text-insta-darkText rounded-md flex items-center p-2 hover:bg-insta-border dark:hover:bg-insta-text/50 transition">
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-3 items-center">
        <div className="w-11 h-11 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="flex flex-col gap-2">
          <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-16 h-3 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="w-20 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
    </div>
  </div>
);