import { ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from '../ui/avatar';
import VerifyTick from '@/logos/VerifyTick';
import useFollow from '@/hooks/useFollow';
import SpinnerIcon from '@/components/loaders/LoadingSpinner';
import { FollowSkelton } from '../skeletons/FollowList';

type User = {
  _id: string;
  username: string;
  fullName: string;
  profileImg: string;
  bio: string;
  followers: string[];
  following: User[];
};

type AuthUser = {
  _id: string;
  username: string;
  followers: string[];
  following: string[];
};

const fetchFollowers = async (username: string, type: "FOLLOWERS" | "FOLLOWING"): Promise<User[]> => {
  const APIURL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${APIURL}/users/followers/${username}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type.toLowerCase()}`);
  }
  const data = await response.json();
  return type === "FOLLOWERS" ? data.followers : data.following; // Return the correct array
};

type FollowersModalProps = {
  children: ReactNode;
  username: string | undefined;
  type: "FOLLOWERS" | "FOLLOWING";
};

const FollowersModal = ({ children, username, type }: FollowersModalProps) => {
  const { data: users = [], isLoading, isError } = useQuery<User[]>({
    queryKey: [type.toLowerCase(), username],
    queryFn: () => fetchFollowers(username || '', type),
    enabled: !!username,
  });

  // Fetch the authenticated user's data
  const { data: authUser } = useQuery<AuthUser>({
    queryKey: ['authUser'],
  });

  const [search, setSearch] = useState('');

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const { follow, isFollowing } = useFollow();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-sm px-0 dark:!bg-[#262626] dark:text-white">
        <DialogHeader className="flex items-center border-b border-stone-600 -mt-2 pb-3 h-full">
          <DialogTitle className="text-lg font-bold mb-1">
            {type === "FOLLOWERS" ? "Followers" : "Following"}
          </DialogTitle>
        </DialogHeader>
        <div className="px-2">
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 rounded-lg  dark:!bg-[#363636] dark:!text-white placeholder-gray-400"
          />
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading {type.toLowerCase()}.</p>}
        {filteredUsers.length === 0 && <p className='text-center font-bold text-gray-400'>No users found.</p>}
        <div className="space-y-2 px-1 max-h-96 overflow-y-auto">
          {isLoading ? ( // Assuming you have an `isLoading` state to track data fetching
            // Render skeleton placeholders while loading
            Array.from({ length: 2 }).map((_, index) => (
              <FollowSkelton key={index} />
            ))
          ) : (
            // Render actual user data once loaded
            filteredUsers.map((user) => {
              const alreadyFollowed = authUser?.following?.includes(user._id);

              return (
                <Link
                  key={user._id}
                  to={`/profile/${user.username}`}
                  className="w-full cursor-pointer dark:text-insta-darkText rounded-md flex items-center p-2 hover:bg-insta-border dark:hover:bg-insta-text/50 transition"
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-3 items-center">
                      <Avatar className="transition-transform duration-150 group-hover:scale-110">
                        <AvatarImage
                          className="rounded-full object-cover w-11 h-11"
                          src={user.profileImg || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
                        />
                      </Avatar>
                      <div className="flex flex-col">
                        <h1 className="text-base flex font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                          {user.username} {user?.username === "danish" && <VerifyTick className='' />}
                        </h1>
                        <p className="text-sm text-insta-darkPrimary">
                          {user.fullName}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs relative">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault()
                          follow(user._id);
                        }}
                        size="sm"
                        className={`rounded-lg ${alreadyFollowed && "!bg-neutral-700"
                          } hover:bg-insta-darkLink px-5 dark:bg-insta-primary dark:text-white dark:hover:bg-insta-link bg-insta-primary`}
                      >
                        {isFollowing && <SpinnerIcon />}
                        {!isFollowing && alreadyFollowed && "Following"}
                        {!isFollowing && !alreadyFollowed && "Follow"}
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowersModal;