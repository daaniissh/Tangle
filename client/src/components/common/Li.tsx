import { AuthUser } from '@/types/QueryTypes/queary';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client'; // Import socket.io-client
import LikeTooltip from './LikeTooltip';
type Notification = {
  from: string;
  to: string;
  type: string;
};



const Li = ({ onClick, isNotification, searchOpen, Icon, text, className, is_border, route, socket }: LI) => {
  const [newNotifications, setNewNotifications] = useState(0); // Track new notifications
  const [totalNotifications, setTotalNotifications] = useState(0); // Track total notifications
  const [notifications, setNotifications] = useState<Notification[]>([]); // Array of all notifications

  const { data: authUserData } = useQuery<AuthUser>({ queryKey: ['authUser'] });

  useEffect(() => {
    if (!authUserData?._id) return; // Guard clause for missing user ID

    socket?.emit('addUser', authUserData?._id);

    socket?.on('getNotification', (data: Notification) => {
      console.log('Notification received:', data);
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket?.off('getNotification');
    };
  }, [authUserData, socket]);

  // Update total notifications and new notifications
 

  function handleClick() {
    setNotifications([])

    onClick();
    localStorage.removeItem("notifications"); // Store total notifications
  }

  const location = useLocation();

  return (
    <Link
      to={route ? route : location.pathname}
      onClick={handleClick}
      className={`flex transition duration-200 ${className} dark:hover:bg-insta-darkBorder gap-3 relative font-instagram dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group ${searchOpen || isNotification ? `${is_border} w-auto` : "border-none w-full"}`}
    >
      <div className="flex gap-3 relative">
        <Icon className="group-hover:scale-110 duration-150" />
        {!searchOpen && !isNotification && text}
        {text === "Notification" && notifications.length !== 0 && (
          <span className="bg-red-600 w-4 h-4 rounded-full absolute bottom-3 left-3 text-center text-xs text-white">
            {notifications.length}
          </span>
        )}
      </div>
      {text === "Notification" && notifications.length > 0 && <LikeTooltip obj={notifications} />}
    </Link>
  );
};

export default Li;
