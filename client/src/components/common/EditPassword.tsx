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
import { Label } from "@/components/ui/label"
import { Button } from "../ui/Button";

function ChangePasswordDialog() {
  return (
    <Dialog  >
      <DialogTrigger  asChild>
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
              type="password"
              placeholder="Enter new password"
              className="col-span-3 rounded-lg"
            />
          </div>
          {/* Confirm New Password Field */}
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="confirm-password" className=" dark:text-white">
              Confirm New Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              className="col-span-3 rounded-lg"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit"  className="!bg-insta-primary !text-white" >Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordDialog;
