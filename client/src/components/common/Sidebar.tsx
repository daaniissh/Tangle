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
  Expand,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { useScreenDevice } from "@/hooks/use_screen_device";
import { Input } from "@/components/ui/Input";
import { MenuDropDown } from "../drawers/DropDown";
import SearchCom from "../drawers/search_com";
import NotificationCom from "../drawers/NotificationCom";
import Li from "./Li";
import Header from "./Header";
import Cirql_logo_g from "@/logos/cirql_logo_g";
import Cirql_logo_w from "@/logos/cirql_logo_w";
import Cirql from "@/logos/Cirql";
import { Create } from "../upload/create";


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

  function closeAllComp() {
    setSearchOpen(false);
    setIsNotification(false);
  }

  return (
    <>
      {isDesktop && (
        <>
          <div
            ref={!searchOpen ? notiRef : searchRef}
            className={` transition fixed flex-1  duration-500 z-50 flex-col dark:bg-insta-darkBackground  h-screen border-r-[0.5px] dark:border-insta-darkBorder ${searchOpen || isNotification
              ? "w-16     max-w-80 dark:border-none p-2  "
              : "  w-56 p-2 flex max-w-60 flex-col dark:bg-insta-darkBackground  justify-start h-screen border-r-[0.5px] dark:border-insta-darkBorder"
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

                  searchOpen={searchOpen}


                />
              </div>
              <div ref={notiRef}>
                {" "}
                <NotificationCom

                  isNotification={isNotification}


                />
              </div>
              <Li route="/" Icon={Home} onClick={closeAllComp} text="Home" isNotification={isNotification} searchOpen={searchOpen} />

              <Li Icon={Search} className={`${!searchOpen && isNotification && "border-none"} `} is_border="border" onClick={SearchOpen} text="Search" isNotification={isNotification} searchOpen={searchOpen} />

              <Li route="explore" Icon={Compass} onClick={closeAllComp} text="Explore" isNotification={isNotification} searchOpen={searchOpen} />

              <Li Icon={MessageCircle} onClick={closeAllComp} text="Message" isNotification={isNotification} searchOpen={searchOpen} />

              <Li Icon={Heart} className={`${searchOpen && !isNotification && "border-none"} `} is_border="border" onClick={NotificationOpen} text="Notification" isNotification={isNotification} searchOpen={searchOpen} />

   

                <span

                  onClick={closeAllComp}
                  className={`flex transition duration-200  dark:hover:bg-insta-darkBorder  gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group  ${searchOpen || isNotification ? ` w-auto` : "border-none w-full"
                    } `}
                >
                  <PlusCircle className="group-hover:scale-110 duration-150" />
                  {!searchOpen && !isNotification && "Create"}

                </span>



              <li
                onClick={closeAllComp}
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
                ? "flex flex-col gap-6 justify-center items-center py-20"
                : "flex flex-col gap-6 pl-3 py-20 "
                }`}
            >
              <MenuDropDown

                showStatusBar={showStatusBar}
                handleCheckedChange={handleCheckedChange}
              >
                <span >
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


      {isTablet && (
        <div className=" flex flex-col relative">

          <Header SearchOpen={SearchOpen} inputRef={inputRef} searchOpen={searchOpen} searchRef={searchRef} show={show} />
          {/* 
          <div className="flex-grow mt-20 mb-20">
          </div> */}
          <div className="border-t-[0.5px] dark:border-insta-darkBorder bg-white dark:bg-black border-insta-border dark:text-insta-darkText flex justify-center items-center w-full h-16 fixed bottom-0 z-10">
            {" "}
            {/* Footer */}
            <ul className="flex flex-row gap-6 px-6 py-4">
              <li className="flex dark:hover:bg-insta-darkBorder gap-3 font-instagram text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group">
                <Home className="group-hover:scale-110 duration-150" />
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
