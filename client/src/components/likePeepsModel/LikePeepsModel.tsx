import { ReactNode, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/Dialog';
import { X, Heart } from 'lucide-react'; // Import Heart icon
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from '../ui/avatar';
import VerifyTick from '@/logos/VerifyTick';
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

type LikesModalProps = {
  children: ReactNode;
  users: User[]; // Users who liked the post, received from props
};

const LikesModal = ({ children, users }: LikesModalProps) => {
  const [search, setSearch] = useState('');

  // Filter users based on the search input
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-sm px-0 !bg-[#262626] text-white">
        <DialogHeader className="flex items-center border-b border-stone-600 -mt-2 pb-3 h-full">
          <DialogTitle className="text-lg font-bold mb-1">
            Likes
          </DialogTitle>
        </DialogHeader>
        <div className="px-2">
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 rounded-lg  !bg-[#363636] text-white placeholder-gray-400"
          />
        </div>
        {filteredUsers.length === 0 && <p className='text-center font-bold text-gray-400'>No users found.</p>}
        <div className="space-y-2 px-1 max-h-96 overflow-y-auto">
          {filteredUsers.map((user) => (
            <Link
              key={user._id}
              to={`/profile/${user.username}`}
              className="w-full cursor-pointer dark:text-insta-darkText rounded-md flex items-center p-2 hover:bg-insta-border dark:hover:bg-insta-text/50 transition"
            >
              <div className="flex px-1 justify-between items-center w-full">
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
                  <Heart className="text-rose-500 fill-rose-500" /> {/* Heart icon */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LikesModal;