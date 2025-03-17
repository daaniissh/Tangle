import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Search, XCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/Input";
import { Link } from "react-router-dom";
import { SearchSkelton } from "../skeletons/SearchSkeleton";
import { DropdownMenuSeparator } from "../ui/DropdownMenu";
import { useScreenDevice } from "@/hooks/use_screen_device";
import { Button } from "../ui/Button";
import { AuthUser } from "@/types/QueryTypes/queary";
import VerifyTick from "@/logos/VerifyTick";

type SearchProps = {
  searchOpen: boolean;
  inpMobile?: string
  onClick?: () => void | undefined,
};

const SearchCom = ({ searchOpen, inpMobile,onClick}: SearchProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isDesktop, isTablet } = useScreenDevice();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inp, setInp] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<AuthUser[]>([]);
  const [searchResults, setSearchResults] = useState<AuthUser[]>([]);  // Update to use proper type

  const APIURL = import.meta.env.VITE_API_URL;

  // Load recent searches from local storage
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    if (Array.isArray(storedSearches)) {
      setRecentSearches(storedSearches);  // Load properly typed data
    }

    const handleFocus = () => setShow(true);
    const handleBlur = () => setShow(false);

    if (inputRef.current) {
      inputRef.current.addEventListener("focus", handleFocus);
      inputRef.current.addEventListener("blur", handleBlur);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("focus", handleFocus);
        inputRef.current.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  // Debounce input value
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(inp || inpMobile!), 500); // 500ms delay
    return () => clearTimeout(timer);
  }, [inp, inpMobile]);

  // Fetch search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedQuery) return;

      try {
        setLoading(true);
        const response = await fetch(`${APIURL}/users/search?search=${debouncedQuery}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log(data, "==dataaa")
        setSearchResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedQuery]);

  // Handle recent search addition
  const handleRecent = (user: AuthUser) => {
    if(isDesktop){
      onClick!()
    }
    setInp("")
    const updatedRecentSearches = [user, ...recentSearches.filter((u) => u._id !== user._id)].slice(0, 10);  // Limit to 10
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));
  };

  // Clear all recent searches
  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const searchData = inp?.length < 1 // Safe check for inpMobile
    ? JSON.parse(localStorage.getItem("recentSearches") || "[]")  // Fallback to empty array
    : searchResults;
  const searchDataM = inpMobile!?.length < 1 // Safe check for inpMobile
    ? JSON.parse(localStorage.getItem("recentSearches") || "[]")  // Fallback to empty array
    : searchResults;

  console.log(searchData, "===search")

  return (
    <>
      {isDesktop && (
        <div
          className={`absolute w-[450px] h-screen  dark:border-r-insta-darkBorder border-r-[0.5px] top-0 bg-white dark:bg-black left-0 transform transition-transform duration-500 z-50 ${searchOpen ? "translate-x-0 left-16 z-[999999]" : "-translate-x-full z-[9999]"
            }`}
        >
          <div className="absolute pl-2 w-full">
            <div className="w-full">
              <h1 className="font-semibold dark:text-insta-darkText font-instagram text-2xl px-3 py-8">Search</h1>
              <div className="relative w-full pr-3">
                {!show && <Search className="absolute transition duration-200 size-5 text-gray-500 top-[10px] left-2" />}
                <Input
                  ref={inputRef}
                  value={inp || ""}
                  onChange={(e) => setInp(e.target.value)}
                  className={
                    show
                      ? "dark:bg-[#363636] dark:ring-0 dark:border-none dark:outline-none rounded-[8px] pr-8 w-full bg-insta-background"
                      : "dark:bg-[#363636] dark:ring-0 dark:border-none dark:outline-none rounded-[8px] pr-8 pl-10 w-full bg-insta-background"
                  }
                  placeholder="Search"
                />
                {inp.length !== 0 && (
                  <XCircle
                    onClick={() => {
                      if (inputRef.current) {
                        inputRef.current.value = "";
                      }
                      setInp("");
                      setSearchResults([]);
                    }}
                    className="absolute size-4 text-gray-400 top-3 right-5 cursor-pointer"
                  />
                )}
                <DropdownMenuSeparator className="mt-5" />
                {!debouncedQuery && (
                  <div className="w-full flex justify-between px-4">
                    <h2 className="dark:text-white font-bold">Recent</h2>
                    <span onClick={handleClearAll} className="text-insta-link text-sm font-bold cursor-pointer">
                      Clear all
                    </span>
                  </div>
                )}
                <div className="w-full h-[600px] h-max-[900px]">
                  
                  {!loading ? (
                    <ul className="h-full mt-3">
                      {searchData?.map((item: AuthUser) => (
                        <li key={item?._id} className="w-full">
                          <Link
                            onClick={() => handleRecent(item)}
                            to={`/profile/${item?.username}`}
                            className="w-full cursor-pointer dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border rounded-[3px] h-14 flex justify-start gap-3 px-4 items-center"
                          >
                            <Avatar className="group-hover:scale-110 duration-150">
                              <AvatarImage
                                className="rounded-full size-11"
                                src={item?.profileImg || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
                              />
                              <AvatarFallback>{item?.username?.[0]?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                            <div className="flex items-end gap-1">
                              <h1 className="text-sm font-semibold">{item?.username}</h1>
                              {item?.username == "danish" && <VerifyTick className='' />}
                              </div>
                              <div className="flex gap-2 text-xs">
                                <p className="capitalize">{item?.fullName}</p>
                                <span>•</span>
                                <p>{item?.followers?.length} followers</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
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
        className={`absolute w-[calc(100%-40px)] rounded-[8px] mt-2 shadow-md dark:border-r-insta-darkBorder border-r-[0.5px] top-0 bg-white dark:bg-[#262626] transform transition-transform duration-300 z-50 ${searchOpen ? "translate-x-0 top-16" : "-translate-y-full hidden"}`}
        style={{ left: '20px' }}
      >
          <div className="relative  w-full max-h-full overflow-y-auto    ">
            <div className="w-full">
              <div className="relative w-full pr-3">
              {!debouncedQuery && (
                  <div className="w-full flex justify-between px-4 py-1">
                    <h2 className="dark:text-white font-bold">Recent</h2>
                    <span onClick={handleClearAll} className="text-insta-link text-sm font-bold cursor-pointer">
                      Clear all
                    </span>
                  </div>
                )}
                <div className="w-full flex   ">
                  
                  {/* users */}
                  {!loading ? (
                    <ul className="h-full mt-3 w-full">
                      {searchDataM?.map((item: AuthUser) => (
                        <li>
                          <Link
                            onClick={() => handleRecent(item)}
                            to={`/profile/${item?.username}`}
                            className="w-full mb-2 cursor-pointer rounded-sm h-14 flex justify-start items-center gap-3 px-4 mx-2 dark:hover:bg-insta-darkBorder dark:text-insta-darkText hover:bg-insta-border"
                          >
                            <Avatar className="group-hover:scale-110 transition-transform duration-150">
                              <AvatarImage
                                className="rounded-full w-11 h-11"
                                src={item?.profileImg || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
                              />
                              <AvatarFallback>DN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <div className="flex items-end gap-1">
                              <h1 className="text-sm font-semibold">{item?.username}</h1>
                              {item?.username == "danish" && <VerifyTick className='' />}
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                {
                                  item.fullName && <> <p className="capitalize">{item.fullName}</p>
                                    <span>•</span></>
                                }
                                <p>{item.followers.length} followers</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
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