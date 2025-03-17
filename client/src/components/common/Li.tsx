import { AuthUser } from '@/types/QueryTypes/queary';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client'; // Import socket.io-client
import LikeTooltip from './LikeTooltip';
import { QueryKey } from '@/types/QueryKey/key';
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
  const { data: notification } = useQuery({ queryKey: ["notificationsMain"] as QueryKey });

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
  useEffect(() => {
    if (notification) {
      // Assuming `notification` is an array of notifications
      const currentNotificationLength = notification?.length;

      // Get the stored length from localStorage
      const storedLength = parseInt(localStorage.getItem('notificationLength') || '0', 10);

      // If the current length is greater than the stored length, calculate new notifications
      if (currentNotificationLength !== storedLength) {
        const newNotificationsCount = currentNotificationLength - storedLength;
        console.log(newNotificationsCount || 0, "===new")
        setNewNotifications(newNotificationsCount);
      }

      // Update localStorage with the current notification length


      // Update the notifications state

    }
  }, [notification]);

  function handleClick() {
    setNotifications([])

    onClick();

    localStorage.setItem('notificationLength', notification?.length?.toString());
    setNewNotifications(0)

    localStorage.removeItem("notifications"); // Store total notifications
  }

  const location = useLocation();
  // console.log(newNotifications,"===new")

  return (
    <Link
      to={route ? route : location.pathname}
      onClick={handleClick}
      className={`flex transition duration-200 ${className} dark:hover:bg-insta-darkBorder gap-3 relative font-instagram dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group ${searchOpen || isNotification ? `${is_border} w-auto` : "border-none w-full"}`}
    >
      <div className="flex gap-3 relative">
        <Icon className="group-hover:scale-110 duration-150" />
        {!searchOpen && !isNotification && text}
        {(text === "Notification" && (newNotifications !== 0 || notifications.length !== 0)) && (
          <span className="bg-red-600 w-4 h-4 rounded-full absolute bottom-3 left-3 text-center text-xs text-white">
            {newNotifications || notifications.length}
          </span>
        )}

      </div>
      {text === "Notification" && notifications.length > 0 && <LikeTooltip obj={notifications} />}
    </Link>
  );
};

export default Li;
