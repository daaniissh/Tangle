import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Button } from "../ui/Button";
import useUpdateUserProfile from "@/hooks/useUpdateProfile";
import { useState } from "react";
import SpinnerIcon from "../loaders/LoadingSpinner";
import { Link } from "react-router-dom";

function ChangePasswordDialog() {
  const [op, setOp] = useState(false)

  const [current, setCurrent] = useState()
  const [newPassword, setNewPassword] = useState()
  // const [confirm, setConfirm] = useState()
  const { isUpdatingProfile, updateProfile} = useUpdateUserProfile()
  const handleSubmit = async () => {

    try {
      await updateProfile({ currentPassword: current, newPassword });
    } catch (err) {
      // Optionally handle errors here if needed
    } finally {
      // setOp(false)
    }
  };
  return (
    <Dialog open={op} onOpenChange={(open) => setOp(open)} >
      <DialogTrigger asChild>
        <button className="text-blue-500 dark:text-blue-400 hover:underline">
          Change password
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] ">

        <DialogHeader>
          <DialogTitle className="dark:text-white text-xl">Change Password</DialogTitle>
          <DialogDescription>
            Make changes to your password here. Click save when you're done.
         
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Current Password Field */}
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="current-password" className="text-center dark:text-white">
              Current Password
            </Label>
            <Input
              id="current-password"
              type="password"
              value={current}
              // @ts-ignore
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="Enter current password"
              className="col-span-3 rounded-lg"
            />
          </div>
          {/* New Password Field */}
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="new-password" className="text-center dark:text-white">
              New Password
            </Label>
            <Input
              id="new-password"
              value={newPassword}
              // @ts-ignore

              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="Enter new password"
              className="col-span-3 rounded-lg"
            />  
            
              <Link to="/emailverification" className="text-insta-link text-sm ">
              Forgot password
            </Link>
          </div>
          {/* Confirm New Password Field */}

        </div>


        <DialogFooter >

          <Button onClick={handleSubmit} type="submit" className="!bg-insta-primary !text-white">
            {isUpdatingProfile ? <SpinnerIcon /> : "Save"}
          </Button>
        </DialogFooter>


      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordDialog;
