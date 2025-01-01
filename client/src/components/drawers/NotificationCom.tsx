import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Compass,
  Heart,
  Home,
  Menu,
  MessageCircle,
  PlusCircle,
  Search,
  XCircle,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";



import { MenuDropDown } from "./DropDown";
import { Input } from "../ui/Input";
import { Link } from "react-router-dom";
import { SearchSkelton } from "../skeletons/SearchSkeleton";
// import { DropdownMenuSeparator } from "../ui/dropdown-";
import { useScreenDevice } from "@/hooks/use_screen_device";
import { Button } from "../ui/Button";





type NotificationProps = {
  isNotification: boolean;
  // NotificationOpen: () => void;
};

const NotificationCom = ({
  isNotification,

}: NotificationProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isDesktop, isTablet } = useScreenDevice();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inp, setInp] = useState("");

  useEffect(() => {
    const handleFocus = () => setShow(true);
    const handleBlur = () => setShow(false);

    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      inputElement.addEventListener("blur", handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("focus", handleFocus);
        inputElement.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  return (
    <>
      {isDesktop && (
        <div
          className={`absolute w-[450px] h-screen dark:border-r-insta-darkBorder border-r-[0.5px] top-0 bg-white dark:bg-black left-0 transform transition-transform duration-500 z-50 ${isNotification ? "translate-x-0 left-16" : "-translate-x-full"}`}
        >
          <div className="absolute w-full">
            <div className="w-full">
              <h1 className="font-[700] dark:text-insta-darkText font-instagram text-2xl px-3 py-5">
                Notifications
              </h1>
              <div className="relative h-[700px] overflow-auto scrollbar-track-transparent scrollbar-thumb-transparent scrollbar-thin  w-full pr-3">

                <div className="w-full h-[600px] max-h-[900px]"> {/* Enable vertical scrolling */}
                  {/* notifications */}
                  {loading ? (
                    <ul className="h-full  mt-3">

                      <Link
                        to="/"
                        className="w-full cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex justify-start gap-1 px-4 mb-2 items-center"
                      >
                        <div className="flex flex-row justify-between gap-10 w-full">
                          <div className="flex gap-3 justify-center items-center">
                            <Avatar className="group-hover:scale-110 duration-150">
                              <AvatarImage
                                className="rounded-full size-11"
                                src="https://github.com/shadcn.png"
                              />
                              <AvatarFallback>DN</AvatarFallback>
                            </Avatar>
                            <div className="flex gap-2 items-start max-w-52 break-words">
                              <span className="flex flex-col">
                                <h1 className="text-[16px] font-[600] whitespace-nowrap overflow-hidden text-ellipsis">
                                  daniish
                                </h1>
                                <p className="font-instagram font-normal text-[13px]">
                                  liked your post.
                                  <span className="font-poppins text-[13px] ml-1 text-insta-darkPrimary">23h</span>
                                </p>
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 w-10 h-10 mr-1 rounded-xl items-center text-[12px]">
                            <img className="rounded-[6px]" src="https://res.cloudinary.com/dhcke4e7l/image/upload/v1724823317/zn0rl3rwnltvqfctwxjx.jpg" alt="" />
                          </div>
                        </div>
                      </Link>
                      <Link
                        to="/"
                        className="w-full cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex justify-start gap-1 px-4 mb-2 items-center"
                      >
                        <div className="flex flex-row justify-between gap-10 w-full">
                          <div className="flex gap-3 justify-center items-center">
                            <Avatar className="group-hover:scale-110 duration-150">
                              <AvatarImage
                                className="rounded-full size-11"
                                src="https://github.com/shadcn.png"
                              />
                              <AvatarFallback>DN</AvatarFallback>
                            </Avatar>
                            <div className="flex gap-2 items-start max-w-52 break-words">
                              <span className="flex flex-col">
                                <h1 className="text-[16px] font-[600] whitespace-nowrap overflow-hidden text-ellipsis">
                                  daniish
                                </h1>
                                <p className="font-instagram font-normal text-[13px]">
                                  started following you.
                                  <span className="font-poppins text-[13px] ml-1 text-insta-darkPrimary">23h</span>
                                </p>
                              </span>
                            </div>
                          </div>
                          <div className="flex  items-center text-[12px]">
                            <Button size="sm" className="rounded-lg hover:bg-insta-darkLink px-5 dark:bg-insta-primary dark:text-white dark:hover:bg-insta-link bg-insta-primary">Follow</Button>
                          </div>
                        </div>
                      </Link>
                    </ul>
                  ) : (
                    <SearchSkelton />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default NotificationCom;
