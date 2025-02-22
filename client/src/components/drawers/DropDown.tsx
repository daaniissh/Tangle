import {
  Bookmark,

  LogOut,

  Moon,

  Settings,

  Sun,

} from "lucide-react"


import {
  DropdownMenu,

  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,

  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Label } from "@radix-ui/react-label";
import { Switch } from "@/components/ui/Switch"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
type DropdownMenuDemoProps = {
  children: React.ReactNode;
  showStatusBar: boolean;
  handleCheckedChange: () => void;
};
type ThemeProps = {
  showStatusBar: boolean;
  handleCheckedChange: () => void;
};







export function ThemeSwitch({ handleCheckedChange, showStatusBar }: ThemeProps) {



  return (
    <div className="flex items-center  py-1 space-x-2">
      <Sun id="theme" className="size-4" />
      <Switch
        className="scale-75" // Adjust scale to your preference (0.5, 0.75, etc.)
        checked={showStatusBar}
        onCheckedChange={handleCheckedChange}
        id="theme"
      />

      <Moon id="theme" className="size-4" />
    </div>
  );

}

export function MenuDropDown({ children, handleCheckedChange, showStatusBar }: DropdownMenuDemoProps) {
  const {data:authUser} = useQuery({queryKey:["authUser"]})
  // const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl ml-5 px-4 py-5">
        {/* <DropdownMenuLabel>More</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuGroup  >
        <Link to="/edit/account" > <DropdownMenuItem  >
            <Settings />
          Settings

          </DropdownMenuItem>
          </Link>
          <Link to={`/profile/${authUser?.username}`}> <DropdownMenuItem>
            <Bookmark />
            <span>Saved</span>
           
          </DropdownMenuItem>
</Link>

        </DropdownMenuGroup>

        <DropdownMenuSeparator />


        <div className="p-3" ><ThemeSwitch handleCheckedChange={handleCheckedChange} showStatusBar={showStatusBar} /></div>


        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

