import { useScreenDevice } from '@/hooks/use_screen_device';
import { Heart, MessageCircle, User } from 'lucide-react';
import React from 'react';
type Notification = {
  from: string;
  to: string;
  type: string;
};

const LikeTooltip = ({ obj }: { obj: Notification }) => {
  const latestNotification = obj[obj?.length - 1];
  const { isTablet, isDesktop } = useScreenDevice()
  const GetNotificationTypeMessage = (type: string) => {
    switch (type) {
      case 'follow':
        return <User className='size-5 fill-white' />; // Return User icon for follow
      case 'like':
        return <Heart className='size-5 fill-white' />; // Return Heart icon for like
      case 'comment':
        return <MessageCircle className='size-5 fill-white' />; // Return MessageCircle icon for comment
      default:
        return 'Notification'; // Return default text if no type matches
    }
  };
  console.log(latestNotification, "==latest")
  return (
    <>
      {isTablet && <div className="relative inline-block">
        {/* Tooltip Box */}
        <div className="absolute top-6 right-0 bg-red-500 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg flex items-center gap-1">
          {GetNotificationTypeMessage(latestNotification?.type)}


          {/* Triangle Tip */}
          <div className="absolute  top-0 right-5 -translate-y-3 w-0 h-0 rotate-90 border-t-[8px] border-b-[8px] border-r-[10px] border-t-transparent border-b-transparent border-r-red-500"></div>
        </div>

        {/* Like Button (Icon) */}

      </div>}
      {
        isDesktop &&
        <div className="relative inline-block">
          {/* Tooltip Box */}
          <div className="absolute -top-5 left-0 bg-red-500 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg flex items-center gap-1">
            {GetNotificationTypeMessage(latestNotification?.type)}


            {/* Triangle Tip */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-b-[8px] border-r-[10px] border-t-transparent border-b-transparent border-r-red-500"></div>
          </div>

          {/* Like Button (Icon) */}

        </div>
      }

    </>
  );
};

export default LikeTooltip;
