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
} from "@/components/ui/dropdownMenu"

import { Switch } from "@/components/ui/switch"

import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthUser } from "@/types/QueryTypes/queary";
type DropdownMenuDemoProps = {
  children: React.ReactNode;
  showStatusBar: boolean;
  handleCheckedChange: () => void;
};
type ThemeProps = {
  showStatusBar: boolean;
  handleCheckedChange: () => void;
};



const APIURL = import.meta.env.VITE_API_URL;
const logoutUser = async () => {
  // Replace with your actual logout API endpoint
  const response = await fetch(`${APIURL}/auth/logout`, {
    method: "POST",
    credentials: "include", // Include cookies if needed
  });
  if (!response.ok) {
    throw new Error("Logout failed");
  }
  return response.json();
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
  const { data: authUser } = useQuery<AuthUser>({ queryKey: ["authUser"] })

  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Invalidate the authUser query to reflect the logged-out state
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // Optionally, redirect the user to the login page
      window.location.href = "/login"; // Replace with your desired redirect logic
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const handleLogout = () => {
    localStorage.setItem('dark-mode',"false");
    logoutMutation.mutate();
  };
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
        <DropdownMenuItem onClick={handleLogout} >
          <LogOut />
          <span>Log out</span>

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

