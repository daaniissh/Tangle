import {
  Home,
  Search,
  Compass,
  MessageCircle,
  XCircle,
  Heart,
  PlusCircle,
  Menu,
  Heading1,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useScreenDevice } from "@/hooks/use-screen-device";
import { Input } from "@/components/ui/input";
import { MenuDropDown } from "../drawers/DropDown";
import SearchCom from "../drawers/SearchCom";
import NotificationCom from "../drawers/NotificcationCom";

interface SideBarProps {
  showStatusBar: boolean;
  handleCheckedChange: () => void;
}
const Sidebar: React.FC<SideBarProps> = ({
  handleCheckedChange,
  showStatusBar,
}) => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const { isDesktop, isTablet } = useScreenDevice();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const notiRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    const handleClickNoti = (event: MouseEvent) => {
      if (
        notiRef.current &&
        !notiRef.current.contains(event.target as Node)
      ) {
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
    setIsNotification(false)
  }
  function NotificationOpen() {
    setIsNotification((prev) => !prev);
    setSearchOpen(false)
  }

  return (
    <>
      {isDesktop && (
        <>
          <div
            ref={!searchOpen ?  notiRef : searchRef}
            className={` transition  duration-500 flex-col dark:bg-insta-darkBackground  h-screen border-r-[0.5px] dark:border-insta-darkBorder ${searchOpen || isNotification
              ? "w-18     max-w-60 dark:border-none p-2 -translate-x-0 "
              : "=  w-56 p-2 flex max-w-60 flex-col dark:bg-insta-darkBackground justify-start h-screen border-r-[0.5px] dark:border-insta-darkBorder"
              } `}
          >
            <div
              className={` ${searchOpen || isNotification
                ? "w-full justify-center items-center "
                : "w-28 pl-5 py-1 items-start justify-start"
                }  rounded-xl cursor-pointer flex  mt-6 `}
            >
              <img
                className="dark:filter dark:invert filter invert-0"
                src={searchOpen || isNotification ? "./sm-logo.png" : "./Logo.png"}
                alt=""
              />
            </div>
            <ul
              className={`${searchOpen || isNotification
                ? "flex items-center justify-center w-full flex-col gap-6  py-8 "
                : "flex flex-col pr-2 gap-6 items-start justify-start pl-3  py-8 "
                }`}
            >
              <div ref={searchRef}>
                {" "}
                <SearchCom
                  SearchOpen={SearchOpen}
                  searchOpen={searchOpen}
                  handleCheckedChange={handleCheckedChange}
                  showStatusBar={showStatusBar}
                />
              </div>
              <div ref={notiRef}>
                {" "}
                <NotificationCom
                  // NotificationOpen={NotificationCom}
                  isNotification={isNotification}


                />
              </div>

              <li
                className={`flex transition duration-200 dark:hover:bg-insta-darkBorder  gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group  ${searchOpen || isNotification ? " w-auto" : "border-none w-full"
                  } `}
              >
                <Home className="group-hover:scale-110 duration-150" />
                {!searchOpen && !isNotification && "Home"}
              </li>
              <li
                onClick={SearchOpen}
                className={`flex transition duration-200 dark:hover:bg-insta-darkBorder  gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group  ${!searchOpen && isNotification && "border-none"}  ${searchOpen || isNotification ? "border w-auto" : "border-none w-full"
                  } `}
              >
                <Search className="group-hover:scale-110 duration-150" />
                {!searchOpen && !isNotification && "Search"}
              </li>
              <li
                className={`flex transition duration-200 dark:hover:bg-insta-darkBorder  gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group  ${searchOpen || isNotification ? " w-auto" : "border-none w-full"
                  } `}
              >
                <Compass className="group-hover:scale-110 duration-150" />
                {!searchOpen && !isNotification && "Explore"}
              </li>
              <li
                className={`flex transition duration-200 dark:hover:bg-insta-darkBorder  gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group   ${searchOpen || isNotification ? " w-auto" : "border-none w-full"
                  } `}
              >
                <MessageCircle className="group-hover:scale-110 duration-150" />
                {!searchOpen && !isNotification && "Message"}
              </li>
              <li
                onClick={NotificationOpen}
                className={`flex transition duration-200 dark:hover:bg-insta-darkBorder  gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group ${searchOpen && !isNotification && "border-none"}   ${searchOpen || isNotification ? "border w-auto" : "border-none w-full"
                  } `}
              >
                <Heart className="group-hover:scale-110 duration-150" />
                {!searchOpen && !isNotification && "Notification"}
              </li>
              <li
                className={`flex transition duration-200 dark:hover:bg-insta-darkBorder  gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group  ${searchOpen || isNotification ? " w-auto" : "border-none w-full"
                  } `}
              >
                <PlusCircle className="group-hover:scale-110 duration-150" />
                {!searchOpen && !isNotification && "Create"}
              </li>

              <li
                className={`flex dark:hover:bg-insta-darkBorder   dark:text-insta-darkText gap-3 font-instagram text-[15px] items-center font-medium  hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group ${searchOpen || isNotification ? " w-auto" : "border-none w-full"
                  }`}
              >
                <Avatar className="size-7 group-hover:scale-110 duration-150">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {!searchOpen && !isNotification && <h1>Profile</h1>}
              </li>
            </ul>

            <ul
              className={`${searchOpen || isNotification
                ? "flex flex-col gap-6 justify-center items-center py-14"
                : "flex flex-col gap-6 pl-3 py-14 "
                }`}
            >
              <MenuDropDown
                showStatusBar={showStatusBar}
                handleCheckedChange={handleCheckedChange}
              >
                <span>
                  <li className="dark:hover:bg-insta-darkBorder  dark:text-insta-darkText flex gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
                    <Menu className="group-hover:scale-110 duration-150 size-8 dark:group-hover:bg-insta-darkBorder" />
                    {!searchOpen && !isNotification && <h1>More</h1>}
                  </li>
                </span>
              </MenuDropDown>
            </ul>
          </div>
        </>
      )}
      {/* {isDesktop && <><div className='md:flex-[2_2_0] relative w-18 flex max-w-60 flex-col dark:bg-insta-darkBackground justify-start h-screen border-r-[0.5px] dark:border-insta-darkBorder' >
        <div className='w-40 px-7 pt-11' >
          <img className='dark:filter dark:invert filter invert-0' src="./Logo.png" alt="" />
        </div>
        <ul className='flex flex-col gap-6 px-6 py-8 ' >
          <div ref={searchRef} > <SearchCom SearchOpen={SearchOpen} searchOpen={searchOpen} handleCheckedChange={handleCheckedChange} showStatusBar={showStatusBar} /></div>
          <li className='flex dark:hover:bg-insta-darkBorder dark:text-insta-darkText gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group' ><Home className='group-hover:scale-110 duration-150' />Home</li>
          <li onClick={SearchOpen} className='flex dark:hover:bg-insta-darkBorder gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group' ><Search className='group-hover:scale-110 duration-150' />Search</li>
          <li className='flex dark:hover:bg-insta-darkBorder gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group' ><Compass className='group-hover:scale-110 duration-150' />Explore</li>
          <li className='flex dark:hover:bg-insta-darkBorder gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group' ><MessageCircle className='group-hover:scale-110 duration-150' />Message</li>
          <li className='flex dark:hover:bg-insta-darkBorder gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group' ><Heart className='group-hover:scale-110 duration-150' />Notification</li>
          <li className='flex dark:hover:bg-insta-darkBorder gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group' ><PlusCircle className='group-hover:scale-110 duration-150' />Create</li>

          <li className="flex dark:hover:bg-insta-darkBorder  dark:text-insta-darkText gap-3 font-instagram text-[15px] items-center font-medium  hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group ">
            <Avatar className='size-7 group-hover:scale-110 duration-150' >
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1>Profile</h1>
          </li>
        </ul>

        <ul className='flex flex-col gap-6 px-6 py-14 ' >
          <MenuDropDown showStatusBar={showStatusBar} handleCheckedChange={handleCheckedChange} >
            <span>
              <li className='dark:hover:bg-insta-darkBorder dark:text-insta-darkText flex gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group'>
                <Menu className='group-hover:scale-110 duration-150 size-8 dark:group-hover:bg-insta-darkBorder' />
                More
              </li>
            </span>
          </MenuDropDown>
        </ul>
      </div></>} */}

      {isTablet && (
        <div className="w-full h-screen flex flex-col relative">
          <div className="border-b-[1px] dark:border-insta-darkBorder flex gap-2  border-insta-border w-full items-center justify-between h-16 fixed top-0 z-10">
            <img
              src="./sm-logo.png"
              className="size-8 mx-3 dark:filter dark:invert"
              alt=""
            />
            <div className="relative w-full ">
              {!show && (
                <Search className="absolute size-5 text-gray-500 top-[10px] left-2" />
              )}
              <Input
                ref={inputRef}
                onClick={SearchOpen}
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
              {" "}
              <SearchCom
                SearchOpen={SearchOpen}
                searchOpen={searchOpen}
                handleCheckedChange={handleCheckedChange}
                showStatusBar={showStatusBar}
              />
            </div>
            <div className="flex dark:hover:bg-insta-darkBorder mr-2 gap-3 font-instagram text-[15px] dark:text-insta-darkText items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
              <Heart className="group-hover:scale-110 duration-150" />
            </div>
          </div>
          {/* 
          <div className="flex-grow mt-20 mb-20">
          </div> */}
          <div className="border-t-[0.5px] dark:border-insta-darkBorder border-insta-border dark:text-insta-darkText flex justify-center items-center w-full h-16 fixed bottom-0 z-10">
            {" "}
            {/* Footer */}
            <ul className="flex flex-row gap-6 px-6 py-4">
              <li className="flex dark:hover:bg-insta-darkBorder gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
                <Home className="group-hover:scale-110 duration-150" />
              </li>
              <li className="flex dark:hover:bg-insta-darkBorder gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
                <Search className="group-hover:scale-110 duration-150" />
              </li>
              <li className="flex dark:hover:bg-insta-darkBorder gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
                <Compass className="group-hover:scale-110 duration-150" />
              </li>
              <li className="flex dark:hover:bg-insta-darkBorder gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
                <MessageCircle className="group-hover:scale-110 duration-150" />
              </li>

              <li className="flex dark:hover:bg-insta-darkBorder gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
                <PlusCircle className="group-hover:scale-110 duration-150" />
              </li>
              <li className="flex dark:hover:bg-insta-darkBorder gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
                <Avatar className="size-7 group-hover:scale-110 duration-150">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
