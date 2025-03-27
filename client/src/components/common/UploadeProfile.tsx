import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,

  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";

export function PhotoActionDialog({ setProfileImg }:{setProfileImg:any}) {

  const [op, setOp] = useState(false)

  // Handle file change
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Get the Base64 string and set it in state
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
      setOp(false)
    }
  };
  function handleRemoveProfile() {
    setProfileImg(
      "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"
    );
    setOp(false)
  }
  return (
    <Dialog open={op} onOpenChange={(open) => setOp(open)} >
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
            <Button onClick={handleRemoveProfile} variant="link" className="!text-red-500 w-full">
              Remove Current Photo
            </Button>
          </div>

          <DialogClose asChild>
            <Button onClick={() => setOp(false)} variant="link" className="!text-gray-500 w-full">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
