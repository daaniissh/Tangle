import React, { useEffect, useRef, useState } from "react";
import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Heart,
  PlusCircle,
  Menu
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useScreenDevice } from "@/hooks/use_screen_device";
import { MenuDropDown } from "../drawers/DropDown";
import SearchCom from "../drawers/SearchCom";
import NotificationCom from "../drawers/NotificationCom";
import Li from "./Li";
import Header from "./Header";
import Cirql from "@/logos/cirql";
import Cirql_logo_w from "@/logos/cirql_logo_w";
import { Link } from "react-router-dom";


import { PostDialog } from "../modals/create/Form";
import { AuthUser, } from "@/types/QueryTypes/queary";
import { useQuery } from "@tanstack/react-query";

import { Socket } from 'socket.io-client';

interface SideBarProps {
  showStatusBar: boolean;
  handleCheckedChange: () => void;
  socket: Socket | null;
}

const Sidebar: React.FC<SideBarProps> = ({
  handleCheckedChange,
  showStatusBar,
  socket

}) => {

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const { isDesktop, isTablet } = useScreenDevice();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const notiRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] });


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    const handleClickNoti = (event: MouseEvent) => {
      if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
        setIsNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickNoti);

    const handleFocus = () => setShow(true);
    const handleBlur = () => setShow(false);

    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      inputElement.addEventListener("blur", handleBlur);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickNoti);
      if (inputElement) {
        inputElement.removeEventListener("focus", handleFocus);
        inputElement.removeEventListener("blur", handleBlur);
      }
    };
  }, []);


  function SearchOpen() {
    setSearchOpen((prev) => !prev);
    setIsNotification(false);
  }

  function NotificationOpen() {
    setIsNotification((prev) => !prev);
    setSearchOpen(false);
  }

  function closeAllComp() {
    setSearchOpen(false);
    setIsNotification(false);
  }
  function CreatePost() {

    closeAllComp()

  }

  return (
    <>

      {isDesktop && (
        <div className="w-72">
          <div
            ref={!searchOpen ? notiRef : searchRef}
            className={`transition flex-1 duration-500  z-50 flex-col dark:bg-insta-darkBackground h-screen border-r-[0.5px] dark:border-insta-darkBorder ${searchOpen || isNotification
              ? "w-16 fixed dark:border-none p-2"
              : "px-5 flex flex-col dark:bg-insta-darkBackground justify-start h-screen border-r-[0.5px] dark:border-insta-darkBorder"
              }`}
          >
            <div
              className={`${searchOpen || isNotification
                ? "w-full justify-center items-center "
                : "w-28 pl-5 py-1 items-start justify-start"
                } rounded-xl cursor-pointer flex mt-6`}
            >
              {isNotification || searchOpen ? <Cirql_logo_w className="dark:stroke-white  stroke-black" /> : <Cirql className="dark:fill-white  fill-black" />}
            </div>
            <ul
              className={`${searchOpen || isNotification
                ? "flex items-center justify-center w-full flex-col gap-6 py-8"
                : "flex flex-col pr-2 gap-6 items-start justify-start pl-3 py-8"
                }`}
            >
              <div ref={searchRef}>
                <SearchCom onClick={closeAllComp} searchOpen={searchOpen} />
              </div>
              <div ref={notiRef}>
                <NotificationCom OncloseAllComp={closeAllComp} isNotification={isNotification} />
              </div>
              <Li
                route="/"
                Icon={Home}
                onClick={closeAllComp}
                text="Home"
                isNotification={isNotification}
                searchOpen={searchOpen}
              />
              <Li
                Icon={Search}
                className={`${!searchOpen && isNotification && "border-none"}`}
                is_border="border"
                onClick={SearchOpen}
                text="Search"
                isNotification={isNotification}
                searchOpen={searchOpen}
              />
              <Li
                route="explore"
                Icon={Compass}
                onClick={closeAllComp}
                text="Explore"
                isNotification={isNotification}
                searchOpen={searchOpen}
              />
              <Li
                route="/message"
                Icon={MessageCircle}
                onClick={closeAllComp}
                text="Message"
                isNotification={isNotification}
                searchOpen={searchOpen}
              />
              <Li
                Icon={Heart}
                className={`${searchOpen && !isNotification && "border-none"}`}
                is_border="border"
                socket={socket}
                onClick={NotificationOpen}
                text="Notification"
                isNotification={isNotification}
                searchOpen={searchOpen}
              />
              <PostDialog>
                <span
                  onClick={CreatePost}
                  className={`flex transition duration-200 dark:hover:bg-insta-darkBorder gap-3 font-instagram dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group ${searchOpen || isNotification ? `w-auto` : "border-none w-full"
                    }`}
                >
                  <PlusCircle className="group-hover:scale-110 duration-150" />
                  {!searchOpen && !isNotification && "Create"}
                </span>
              </PostDialog>
              <Link to={`/profile/${authUser?.username}`}
                onClick={closeAllComp}
                className={`flex dark:hover:bg-insta-darkBorder dark:text-insta-darkText gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group ${searchOpen || isNotification ? "w-auto" : "border-none w-full"
                  }`}
              >
                <Avatar className="size-7 group-hover:scale-110 duration-150">
                  <AvatarImage src={authUser?.profileImg || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"} />
                  <AvatarFallback>    {authUser?.username?.charAt(0)}</AvatarFallback>
                </Avatar>
                {!searchOpen && !isNotification && <h1>Profile</h1>}
              </Link>
            </ul>
            <ul
              className={`${searchOpen || isNotification
                ? "flex flex-col gap-6 justify-center items-center py-20"
                : "flex flex-col gap-6 pl-3 py-20"
                }`}
            >
              <MenuDropDown
                showStatusBar={showStatusBar}
                handleCheckedChange={handleCheckedChange}
              >
                <span>
                  <li className="dark:hover:bg-insta-darkBorder dark:text-insta-darkText flex gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
                    <Menu className="group-hover:scale-110 duration-150 size-8 dark:group-hover:bg-insta-darkBorder" />
                    {!searchOpen && !isNotification && <h1>More</h1>}
                  </li>
                </span>
              </MenuDropDown>
            </ul>
          </div>
        </div>
      )}
      {isTablet && (
        <div className="flex flex-col relative">
          <Header
            socket={socket}
            SearchOpen={SearchOpen}
            inputRef={inputRef}
            searchOpen={searchOpen}
            searchRef={searchRef}
            show={show}
          />
          <div className="border-t-[1px] dark:border-insta-darkBorder bg-white dark:bg-black border-insta-border dark:text-insta-darkText flex justify-center items-center w-full h-12 fixed bottom-0 z-50">
            <ul className="flex flex-row gap-6 px-6 py-4">
              <Link to="/" className="flex dark:hover:bg-insta-darkBorder gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
                <Home className="group-hover:scale-110 duration-150" />
              </Link>
              <Link to="/explore" className="flex dark:hover:bg-insta-darkBorder gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
                <Compass className="group-hover:scale-110 duration-150" />
              </Link>
              <PostDialog>
                <li className="flex dark:hover:bg-insta-darkBorder gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
                  <PlusCircle className="group-hover:scale-110 duration-150" />
                </li>
              </PostDialog>
              <Link to="/message" className="flex dark:hover:bg-insta-darkBorder gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
                <MessageCircle className="group-hover:scale-110 duration-150" />
              </Link>
              <Link to={`/profile/${authUser?.username}`}
                onClick={closeAllComp}
                className={`flex dark:hover:bg-insta-darkBorder dark:text-insta-darkText gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group ${searchOpen || isNotification ? "w-auto" : "border-none w-full"
                  }`}
              >
                <Avatar className="size-7 group-hover:scale-110 duration-150">
                  <AvatarImage src={authUser?.profileImg || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

              </Link>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
