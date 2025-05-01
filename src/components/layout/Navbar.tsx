
import { useEffect, useState } from "react"
import { Bell, Settings, User, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"

export function Navbar() {
  const { user, signOut, getUserProfile } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const loadUserProfile = async () => {
      const profile = await getUserProfile();
      if (profile) {
        setUsername(profile.username || "");
        setAvatarUrl(profile.avatar_url || "");
      }
    };

    if (user) {
      loadUserProfile();
    }
  }, [user, getUserProfile]);

  useEffect(() => {
    const getCurrentGreeting = () => {
      const currentTime = new Date();
      const hour = currentTime.getHours();
      
      if (hour >= 5 && hour < 12) {
        return "Good morning";
      } else if (hour >= 12 && hour < 18) {
        return "Good afternoon";
      } else {
        return "Good evening";
      }
    };

    setGreeting(getCurrentGreeting());
  }, []);

  const getUserInitials = () => {
    if (username) {
      return username.substring(0, 2).toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || "SW";
  };

  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold md:text-lg text-studentwell-teal-500">
          <div className="rounded-full bg-studentwell-blue-500 p-1">
            <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
              <span className="text-studentwell-blue-500 font-bold">SW</span>
            </div>
          </div>
          <span>StudentWell AI</span>
        </div>
        
        {user && (
          <div className="hidden md:flex ml-6 text-sm font-medium text-studentwell-blue-500">
            {greeting}, {username || user.email?.split('@')[0] || "Student"}!
          </div>
        )}
        
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-studentwell-blue-500">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className="bg-studentwell-teal-500 text-white">{getUserInitials()}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
