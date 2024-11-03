
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
type LI = {
  onClick: () => void,
  searchOpen: boolean,
  className?: string,
  text: string,
  is_border?: string,
  isNotification: boolean,
  route?: string

  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const Li = ({ onClick, isNotification, searchOpen, Icon, text, className, is_border, route }: LI) => {
  const location = useLocation();
  return (
    <Link
      to={route ? route : location.pathname}
      onClick={onClick}
      className={`flex transition duration-200 ${className} dark:hover:bg-insta-darkBorder  gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group  ${searchOpen || isNotification ? `${is_border} w-auto` : "border-none w-full"
        } `}
    >
      <Icon className="group-hover:scale-110 duration-150" />
      {!searchOpen && !isNotification && text}

    </Link>
  )
}

export default Li