import { Copy } from "lucide-react"

import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import copy from 'copy-text-to-clipboard';
export default function ShareDialog({ children, username, id }: { children: React.ReactNode, username?: string, id?: number | string }) {
  function CopyLink() {
    copy(`http://localhost:5173/post/${username}/${id}`);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-w-sm rounded-md z-50">
        <DialogHeader>
          <DialogTitle className="dark:text-white" >Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this post.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={`http://localhost:5173/post/${username}/${id}`}
              readOnly
            />
          </div>
          <Button onClick={CopyLink} type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
