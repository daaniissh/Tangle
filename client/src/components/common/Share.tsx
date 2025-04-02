import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import copy from 'copy-text-to-clipboard';
import { useState } from "react"
export default function ShareDialog({ children, username, id,story }: { children: React.ReactNode, username?: string, id?: number | string ,story?:boolean}) {
  const [loading, setLoading] = useState(false)
  const CopyLink = async () => {
    try {

      await copy(story ? `https://tanglee.vercel.app/story/${username}/${id}` : `https://tanglee.vercel.app/post/${username}/${id}`);
      await setLoading(true)
    } catch (error) {
      setLoading(false)

    } finally {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
  }
  console.log(loading, "loading")
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
              defaultValue={story ? `https://tanglee.vercel.app/story/${username}/${id}` : `https://tanglee.vercel.app/post/${username}/${id}`}
              readOnly
            />
          </div>
          <Button onClick={CopyLink} type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            {loading ? <Check /> : <Copy />}
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
