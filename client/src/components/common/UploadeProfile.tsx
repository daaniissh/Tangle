import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useState } from "react";
import { Input } from "../ui/Input";

export function PhotoActionDialog() {
  const [fileName, setFileName] = useState('');

  // Handle file change
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Show selected file name
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-500 dark:text-blue-400 hover:underline">
          Change profile photo
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm !px-0 py-4  !rounded-2xl dark:!border-none dark:!bg-[#262626]">
        <div className="space-y-1">
          <div className="w-full border-b dark:border-insta-darkPrimary/50">
            {/* The label triggers the file input */}
            <label htmlFor="file" className="w-full  cursor-pointer absolute   ">
              <Button variant="link" className="!text-blue-500  w-full">
                Upload Photo
              </Button>
            </label>
            {/* File input hidden but triggered by label */}
            <Input
              id="file"
              type="file"
              className="opacity-0 cursor-pointer"
              onChange={handleFileChange}
             
            />
          </div>

          <div className="w-full border-b dark:border-insta-darkPrimary/50">
            <Button variant="link" className="!text-red-500 w-full">
              Remove Current Photo
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
  );
}
