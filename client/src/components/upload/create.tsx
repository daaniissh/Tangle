import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type Props = {
  children: React.ReactNode;
}

export function Create({ children }: Props) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  // Show confirmation when user tries to close the dialog
  const handleDialogClose = (open: boolean) => {
    if (open) {
      setDialogOpen(true); // Keep dialog open
    } else {
      setConfirmationOpen(true); // Show confirmation modal
    }
  };

  // Confirm close (discard changes)
  const handleConfirmClose = () => {
    setDialogOpen(false); // Close the dialog
    setConfirmationOpen(false); // Hide confirmation
  };

  // Cancel close (stay on dialog)
  const handleCancelClose = () => {
    setConfirmationOpen(false); // Close the confirmation
  };

  return (
    <div className="relative">
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] h-5/6">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
            <Button type="button" onClick={() => setDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal - Positioned on top of the Dialog */}
      {isConfirmationOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
          <div className="bg-white p-6 rounded-lg shadow-lg z-60">
            <h2 className="text-xl mb-4">Are you sure you want to discard your changes?</h2>
            <div className="flex justify-end gap-4">
              <Button onClick={handleCancelClose}>Stay on Dialog</Button>
              <Button onClick={handleConfirmClose} variant="destructive">
                Discard Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
