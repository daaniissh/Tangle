
import React from 'react'
type LI = {
  onClick: () => void,
  searchOpen: boolean,
  className?: string,
  text: string,
  is_border?: string,
  isNotification: boolean,
  
  Icon:React.ComponentType<React.SVGProps<SVGSVGElement>>; 
};

const Li = ({onClick,isNotification,searchOpen,Icon ,text,className,is_border}: LI) => {

  return (
    <li
      onClick={onClick}
      className={`flex transition duration-200 ${className} dark:hover:bg-insta-darkBorder  gap-3 font-instagram  dark:text-insta-darkText text-[15px] items-center font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group  ${searchOpen || isNotification ? `${is_border} w-auto` : "border-none w-full"
        } `}
    >
      <Icon className="group-hover:scale-110 duration-150" />
      {!searchOpen && !isNotification && text}
     
    </li>
  )
}

export default Li