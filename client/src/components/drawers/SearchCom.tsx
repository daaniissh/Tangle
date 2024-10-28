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
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { SearchSkelton } from "../skelton/SearchSkelton";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { useScreenDevice } from "@/hooks/use-screen-device";

type SearchProps = {
  searchOpen: boolean;
  showStatusBar: boolean;
  handleCheckedChange: () => void;
  SearchOpen: () => void;
};

const SearchCom = ({
  searchOpen,
  handleCheckedChange,
  showStatusBar,
  SearchOpen,
}: SearchProps) => {
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
          className={`absolute  w-[450px] h-screen rounded-tr-xl rounded-br-xl  dark:border-r-insta-darkBorder border-r-[0.5px] top-0 bg-white dark:bg-black left-0 transform transition-transform duration-500 z-50 ${
            searchOpen ? "translate-x-0 left-20" : "-translate-x-full"
          }`}
        >
          <div className="absolute   w-full  ">
            <div className="w-full">
              <h1 className="font-semibold dark:text-insta-darkText font-instagram text-2xl px-3 py-8">
                Search
              </h1>
              <div className="relative w-full pr-3">
                {!show && (
                  <Search className="absolute transition duration-200 size-5 text-gray-500 top-[10px] left-2" />
                )}
                <Input
                  ref={inputRef}
                  onChange={(e) => setInp(e.target.value)}
                  className={
                    show
                      ? "dark:bg-[#363636] dark:ring-0 dark:border-none dark:outline-none rounded-[8px] pr-8 w-full bg-insta-background"
                      : "dark:bg-[#363636] dark:ring-0 dark:border-none dark:outline-none rounded-[8px] pr-8 pl-10 w-full bg-insta-background"
                  }
                  placeholder="Search"
                />
                {inp.length != 0 && (
                  <XCircle
                    onClick={() => {
                      if (inputRef.current) {
                        inputRef.current.value = ""; // Clear the input field
                      }
                    }}
                    className="absolute size-4 text-gray-400 top-3 right-5 cursor-pointer"
                  />
                )}
                <DropdownMenuSeparator className="mt-5" />
                <div className="w-full  h-[600px] h-max-[900px]">
                  {/* users */}
                  {loading ? (
                    <ul className="h-full mt-3  ">
                      <Link
                        to="/login"
                        className="w-full cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex  justify-start gap-3  px-4  items-center "
                      >
                        <Avatar className="    group-hover:scale-110 duration-150">
                          <AvatarImage
                            className="rounded-full size-11"
                            src="https://github.com/shadcn.png"
                          />
                          <AvatarFallback>DN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <h1 className=" text-[14px]  font-[600]">Danish</h1>
                          <div className="flex gap-2 text-[12px]">
                            <p className="capitalize">muhammed danish </p>
                            <span>•</span>
                            <p> 4.7M followers</p>
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
      {isTablet && (
        <div
        className={`absolute w-[calc(100%-40px)] h-[380px] rounded-[8px] mt-2 shadow-md dark:border-r-insta-darkBorder border-r-[0.5px] top-0 bg-white dark:bg-[#262626] transform transition-transform duration-300 z-50 ${searchOpen ? "translate-x-0 top-16" : "-translate-y-full hidden"}`}
        style={{ left: '20px' }} 
      >
      
          <div className="absolute   w-full  ">
            <div className="w-full">
              <div className="relative w-full pr-3">
                <div className="w-full flex    h-max-[900px]">
                  {/* users */}
                  {loading ? (
                    <ul className="h-full  mt-7 w-full   ">
                      <Link
                        to="/login"
                        className="w-full mb-2 cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex  justify-start gap-3  px-4 mx-2  items-center "
                      >
                        <Avatar className="    group-hover:scale-110 duration-150">
                          <AvatarImage
                            className="rounded-full size-11"
                            src="https://github.com/shadcn.png"
                          />
                          <AvatarFallback>DN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <h1 className=" text-[14px]  font-[600]">Danish</h1>
                          <div className="flex gap-2 text-[12px]">
                            <p className="capitalize">muhammed danish </p>
                            <span>•</span>
                            <p> 4.7M followers</p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        to="/login"
                        className="w-full mb-2 cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex  justify-start gap-3  px-4 mx-2  items-center "
                      >
                        <Avatar className="    group-hover:scale-110 duration-150">
                          <AvatarImage
                            className="rounded-full size-11"
                            src="https://github.com/shadcn.png"
                          />
                          <AvatarFallback>DN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <h1 className=" text-[14px]  font-[600]">Danish</h1>
                          <div className="flex gap-2 text-[12px]">
                            <p className="capitalize">muhammed danish </p>
                            <span>•</span>
                            <p> 4.7M followers</p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        to="/login"
                        className="w-full mb-2 cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex  justify-start gap-3  px-4 mx-2  items-center "
                      >
                        <Avatar className="    group-hover:scale-110 duration-150">
                          <AvatarImage
                            className="rounded-full size-11"
                            src="https://github.com/shadcn.png"
                          />
                          <AvatarFallback>DN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <h1 className=" text-[14px]  font-[600]">Danish</h1>
                          <div className="flex gap-2 text-[12px]">
                            <p className="capitalize">muhammed danish </p>
                            <span>•</span>
                            <p> 4.7M followers</p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        to="/login"
                        className="w-full mb-2 cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex  justify-start gap-3  px-4 mx-2  items-center "
                      >
                        <Avatar className="    group-hover:scale-110 duration-150">
                          <AvatarImage
                            className="rounded-full size-11"
                            src="https://github.com/shadcn.png"
                          />
                          <AvatarFallback>DN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <h1 className=" text-[14px]  font-[600]">Danish</h1>
                          <div className="flex gap-2 text-[12px]">
                            <p className="capitalize">muhammed danish </p>
                            <span>•</span>
                            <p> 4.7M followers</p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        to="/login"
                        className="w-full mb-2 cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex  justify-start gap-3  px-4 mx-2  items-center "
                      >
                        <Avatar className="    group-hover:scale-110 duration-150">
                          <AvatarImage
                            className="rounded-full size-11"
                            src="https://github.com/shadcn.png"
                          />
                          <AvatarFallback>DN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <h1 className=" text-[14px]  font-[600]">Danish</h1>
                          <div className="flex gap-2 text-[12px]">
                            <p className="capitalize">muhammed danish </p>
                            <span>•</span>
                            <p> 4.7M followers</p>
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

export default SearchCom;
