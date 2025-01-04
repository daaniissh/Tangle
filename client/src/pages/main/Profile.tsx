import EmptyPost from '@/components/common/EmptyPost';
import SmallPost from '@/components/common/SmallPost';
import ExplorePost from '@/components/common/SmallPost';
import { Bookmark, Grid3x3, Link as WebLink } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');

  return (
    <div className="min-h-screen  max-h-screen  scrollbar-thin dark:scrollbar-track-black scrollbar-thumb-white  dark:scrollbar-thumb-stone-800   w-full overflow-y-scroll  bg-white text-black dark:bg-black dark:text-white flex flex-col  items-center md:mt-0 py-8 mt-10">
      {/* Profile Header */}
      <div className="w-full max-w-xl  text-center">
        <div className="relative mb-4">
          {/* Profile Picture Placeholder */}
          <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <img src='https://i.pinimg.com/736x/75/cf/5c/75cf5cb8596854f9f2ac3c13730c658e.jpg' className="w-32 h-32 rounded-full object-cover" />
          </div>
        </div>
        {/* Username and Details */}
        <div className="text-xl font-semibold mb-4">daaniisssh</div>
        <Link to="/edit/danish" className=" px-4 py-1   border hover:bg-gray-200 dark:hover:bg-stone-900 border-gray-600 dark:border-gray-400 rounded-md text-gray-700 dark:text-gray-300">
          Edit profile
        </Link>

        <div className="mt-3 flex justify-center space-x-8">
          <div className="text-center">
            <span className="font-bold">0</span> posts
          </div>
          <div className="text-center">
            <span className="font-bold">579</span> followers
          </div>
          <div className="text-center">
            <span className="font-bold">648</span> following
          </div>
        </div>
        <div className="mt-2 text-gray-500 dark:text-gray-400">Danish</div>
        <div className="">Lorem ipsum dolor sit.</div>
        <a href='https://lucide.dev/icons/link' about='*/' className="flex justify-center items-center gap-1 hover:underline text-insta-link font-semibold text-sm"><WebLink className='size-3 text-insta-darkPrimary dark:text-zinc-600' strokeWidth={3} />https://lucide.dev/icons/link</a> 
      </div>

      {/* Tabs Section */}
      <div className="w-full max-w-5xl mt-8 border-t border-gray-300 dark:border-gray-600">
        <div className="flex justify-around text-gray-500 dark:text-gray-400 text-sm py-2">
          <div
            onClick={() => setActiveTab('posts')}
            className={`relative cursor-pointer hover:text-black flex items-center gap-2 dark:hover:text-white ${activeTab === 'posts'
              ? 'text-black dark:text-white font-bold after:content-[""] after:absolute after:top-0 after:left-0 after:right-0 after:border-t after:border-black dark:after:border-white after:-translate-y-2'
              : ''
              }`}
          >
            <Grid3x3 className='size-4' />    POSTS
          </div>

          <div
            onClick={() => setActiveTab('saved')}
            className={`relative cursor-pointer hover:text-black flex items-center gap-2 dark:hover:text-white ${activeTab === 'saved'
              ? 'text-black dark:text-white font-bold after:content-[""] after:absolute after:top-0 after:left-0 after:right-0 after:border-t after:border-black dark:after:border-white after:-translate-y-2'
              : ''
              }`}
          >
            <Bookmark className='size-4' />   SAVED
          </div>


        </div>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-5xl  py-10">
        {activeTab === 'posts' ? (
          <div className="grid gap-1    grid-cols-3  md:grid-rows-8  lg:grid-rows-3   text-gray-500 dark:text-gray-400">
            {/* <EmptyPost/> */}
            <SmallPost comments={"231"} img='https://i.pinimg.com/736x/32/5f/0b/325f0b36ace13783eee68de4ecb7127d.jpg' likes='321'/>
            <SmallPost comments={"21K"} img='https://i.pinimg.com/736x/ab/7c/0b/ab7c0b8770c85bd917c1a9ac103a20cd.jpg' likes='321'/>
         

          </div>
        ) : (
          <div className="grid gap-1   grid-cols-3  md:grid-rows-8  lg:grid-rows-3   text-gray-500 dark:text-gray-400">
          {/* <EmptyPost/> */}
          <SmallPost comments={"231"} img='https://i.pinimg.com/736x/32/5f/0b/325f0b36ace13783eee68de4ecb7127d.jpg' likes='321'/>
          <SmallPost comments={"231"} img='https://i.pinimg.com/736x/80/86/e6/8086e632f309f3302f7915a960f62c6d.jpg' likes='321'/>
          {/* <div className="text-center text-gray-500 dark:text-gray-400">
            <p className='font-extrabold ' >No Saved Posts Yet</p>
          </div> */}
        </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
