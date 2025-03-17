import { Heart, Search, XCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Input } from '../ui/Input'
import SearchCom from '../drawers/SearchCom'
import { Link, useLocation } from 'react-router-dom'
import SubHeader from './SubHeader'
import CirqlG from '@/logos/Cirql-g'
import { useQuery } from '@tanstack/react-query'
import { AuthUser } from '@/types/QueryTypes/queary'
import LikeTooltip from './LikeTooltip'

type HeaderProps = {
  searchOpen: boolean;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  searchRef: React.RefObject<HTMLDivElement>;
  show: boolean;
  SearchOpen: () => void
}
const Header = ({ inputRef, socket, searchOpen, show, SearchOpen, searchRef }: HeaderProps) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [inp, setInp] = useState<string | undefined>("");
  useEffect(() => {
    // Check if the current path is '/home' and set active link accordingly

    setActiveLink(location.pathname);


  }, [location.pathname]);
  const handleClick = (link: string) => {
    setNotifications([])

    setActiveLink(link);
    console.log(link)
  };
  const keywords = ["notification", "profile", "edit", "post"];
<<<<<<< HEAD

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

  function handleClsoe() {
    setNotifications([])


  }
=======
>>>>>>> main

  const isActive = keywords.some((keyword) => activeLink.includes(keyword));
  const matchingKeywords = keywords.filter((itm) => activeLink.includes(itm));
  const name = matchingKeywords.join(", ");
  return (
    <>
      {!isActive ?
<<<<<<< HEAD
        <div className="border-b-[1px]  bg-white dark:bg-black  dark:border-insta-darkBorder flex gap-2 z-10 border-insta-border w-full fixed items-center justify-between h-14" >
          <CirqlG className='w-14 px-2 ' />
          <div className="relative w-full ">
            {!show && (
              <Search className="absolute size-5 text-gray-500 top-[10px] left-2" />
            )}
            <Input
              ref={inputRef}
              onClick={SearchOpen}
              onChange={(e) => setInp(e.target.value || "")}
              className={
                show
                  ? "dark:bg-[#363636] dark:ring-0 dark:border-none dark:outline-none rounded-[8px] pr-8 w-full bg-insta-background"
                  : "dark:bg-[#363636] dark:ring-0 dark:border-none dark:outline-none rounded-[8px] pr-8 pl-8 w-full bg-insta-background"
              }
              placeholder="Search"
            />
            {show && (
              <XCircle className="absolute   size-4 text-gray-400 top-3 right-2" />
            )}
          </div>
          <div ref={searchRef}>

            <SearchCom
              inpMobile={inp}
=======
       <div className="border-b-[1px]  bg-white dark:bg-black  dark:border-insta-darkBorder flex gap-2 z-10 border-insta-border w-full fixed items-center justify-between h-14" >
        <CirqlG className='w-14 px-2' />
        <div className="relative w-full ">
          {!show && (
            <Search className="absolute size-5 text-gray-500 top-[10px] left-2" />
          )}
          <Input
            ref={inputRef}
            onClick={SearchOpen}
            onChange={(e) => setInp(e.target.value || "")}
            className={
              show
                ? "dark:bg-[#363636] dark:ring-0 dark:border-none dark:outline-none rounded-[8px] pr-8 w-full bg-insta-background"
                : "dark:bg-[#363636] dark:ring-0 dark:border-none dark:outline-none rounded-[8px] pr-8 pl-8 w-full bg-insta-background"
            }
            placeholder="Search"
          />
          {show && (
            <XCircle className="absolute   size-4 text-gray-400 top-3 right-2" />
          )}
        </div>
        <div ref={searchRef}>

          <SearchCom
            inpMobile={inp}
>>>>>>> main

              searchOpen={searchOpen}

            />
          </div>
          <Link to="/notifications"
            onClick={() => handleClick('notification')} className="flex relative dark:hover:bg-insta-darkBorder mr-2 gap-3 font-instagram text-[15px] dark:text-insta-darkText items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
            <div className="relative">


              <Heart className="group-hover:scale-110 duration-150" />
              {notifications.length > 0 && <span className="bg-red-600 w-4 h-4 rounded-full absolute bottom-3 left-3 text-center text-xs text-white">
                {notifications.length}
              </span>}  </div>
            {notifications.length > 0 && <LikeTooltip obj={notifications} />}
          </Link>
        </div > : <SubHeader name={name} />}
    </>
  )
}

export default Header