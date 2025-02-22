import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../ui/Dialog'
import { Button } from '../ui/Button'
import { DotSquare, Ellipsis } from 'lucide-react'
import SpinnerIcon from '../loaders/LoadingSpinner';
interface Props {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  deletePost: () => void;
  deleting: boolean
}

const MoreOptions = ({ setEdit, deletePost, deleting }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Ellipsis className='cursor-pointer dark:text-white text-black ' />
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm !px-0 py-2 !rounded-2xl dark:!border-none dark:!bg-[#262626]">
        <div className="space-y-1">
          <div className="w-full border-b dark:border-insta-darkPrimary/50">
            {/* Edit Post Option */}
            <DialogClose asChild>
              <Button
                variant="link"
                className="!text-blue-500 w-full"
                onClick={() => setEdit(true)}
              >
                Edit Post
              </Button>
            </DialogClose>
          </div>

          <div className="w-full border-b dark:border-insta-darkPrimary/50">
            {/* Delete Post Option */}
            <Button
              variant="link"
              className="!text-red-500 w-full"
              onClick={() => deletePost()}
            >
              {deleting ? <>Deleting... <SpinnerIcon /> </> : "Delete Post"}
            </Button>
          </div>

          <DialogClose asChild>
            <Button variant="link" className="!text-gray-500 w-full">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default MoreOptions