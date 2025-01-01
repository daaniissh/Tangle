import React from 'react'
import { FormProps, Forms } from './types'
import { MoveLeft } from 'lucide-react';

interface CreateHeaderProps {
  form: Forms;
  gotoForm: (form: Forms) => void;

}
const CreateHeader: React.FC<CreateHeaderProps> = ({ form, gotoForm }) => {
  function Title() {
    if (form == "SelectImage") {
      return "Create New Post"
    } if (form == "CropImage") {
      return "Crop"
    } else {
      return "Create New Post"
    }
  }
  function prevForm() {
    if (form == 'CropImage') {
      gotoForm("SelectImage")
    }else{
      gotoForm("CropImage")
    }
  }
  

  return (
    <div className="absolute flex items-center border-b dark:border-none justify-between rounded-t-lg bg-white dark:bg-black dark:text-white z-50 top-0 w-full h-12 px-4">
      <div className="flex items-center">
        {form == 'SelectImage' ? <></> : <MoveLeft onClick={prevForm} className='cursor-pointer' />}
      </div>
      <h2 className="text-base font-semibold text-center flex-1">
       {Title()}
      </h2>
      <div className="">
        
      </div>
    </div>

  )
}

export default CreateHeader