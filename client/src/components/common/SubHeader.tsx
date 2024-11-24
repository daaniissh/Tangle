import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

type p = {
  name: string;
  onClick?: (link: string) => void;
}

const SubHeader = ({ name, onClick }: p) => {
  function func(){
    if(onClick){
      onClick('/')
    }
  }
  return (
    <div className="border-b-[1px] bg-white dark:bg-black dark:border-insta-darkBorder flex gap-2 border-insta-border w-full items-center justify-center h-10 fixed top-0 z-[9999]">
      <div className="flex w-full flex-[1,2] items-center text-white">
        {/* Left-aligned Link element */}
        <Link
          to="/"
          onClick={func}
          className="flex dark:hover:bg-insta-darkBorder gap-3 font-instagram text-[15px] dark:text-insta-darkText font-medium hover:bg-insta-background rounded-xl cursor-pointer py-2 px-2 group"
        >
          <ArrowLeft className="group-hover:scale-110 duration-150 text-black dark:text-white" />
        </Link>

        {/* Centered heading */}
        <div className="mr-10 w-full flex justify-center">
          <h1 className="text-center capitalize font-semibold text-black dark:text-white">{name}</h1>
        </div>
      </div>
    </div>
  )
}

export default SubHeader
