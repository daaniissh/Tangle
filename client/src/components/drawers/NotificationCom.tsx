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



import { Link } from "react-router-dom";
import { SearchSkelton } from "../skeletons/SearchSkeleton";
// import { DropdownMenuSeparator } from "../ui/dropdown-";
import { useScreenDevice } from "@/hooks/use_screen_device";
import { Button } from "../ui/Button";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/types/QueryKey/key";
import LikePost from "./NotificationsTypesComp/LikePost";
import FollowPost from "./NotificationsTypesComp/FollowPost";
import CommentPost from "./NotificationsTypesComp/CommentPost";
import { NotificationType } from "@/types/QueryTypes/queary";





type NotificationProps = {
  isNotification: boolean;
  OncloseAllComp: () => void,
  // NotificationOpen: () => void;
};

const NotificationCom = ({
  isNotification,
  OncloseAllComp,

}: NotificationProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isDesktop, isTablet } = useScreenDevice();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inp, setInp] = useState("");
  const APIURL = import.meta.env.VITE_API_URL;

  const { data, isPending, refetch, isLoading } = useQuery({
    queryKey: ["notifications", isNotification] as QueryKey,
    queryFn: async () => {
      try {
        const response = await fetch(`${APIURL}/notifications`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
      }
    },
    // refetchInterval: 10000,
  })

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
                  {!isLoading  ? (
                    <ul className="h-full mt-3">
                      {data
                        ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map((item: NotificationType) => {
                          switch (item.type) {
                            case 'like':
                              return <li key={item._id}><LikePost OncloseAllComp={OncloseAllComp} likePost={item} /></li>;
                            case 'follow':
                              return <li key={item._id}><FollowPost OncloseAllComp={OncloseAllComp} FollowPost={item} /></li>;
                            case 'comment':
                              return <li key={item._id}><CommentPost OncloseAllComp={OncloseAllComp} commentPost={item} /></li>;
                            default:
                              return null;
                          }
                        })}
                    </ul>
                  ) : (
                    <ul className="mt-0">
                      {[...Array(8)].map((_, index) => (
                        <li key={`like-skeleton-${index}`}><SearchSkelton /></li>
                      ))}
                      
                    </ul>
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
