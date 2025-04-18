
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, ChevronLeft, ChevronRight, Coins, GraduationCap, Home, Users } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean
  setIsCollapsed?: (isCollapsed: boolean) => void
}

export function Sidebar({
  className,
  isCollapsed = false,
  setIsCollapsed,
  ...props
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(isCollapsed)
  const location = useLocation()

  const toggleSidebar = () => {
    const newCollapsed = !collapsed
    setCollapsed(newCollapsed)
    setIsCollapsed?.(newCollapsed)
  }

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
      {...props}
    >
      <div className="flex h-14 items-center border-b px-4 py-2 justify-between">
        {!collapsed && (
          <span className="text-base font-semibold text-sidebar-foreground">Navigation</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 px-2 py-3">
          <NavigationLink
            to="/"
            label="Dashboard"
            icon={Home}
            active={location.pathname === "/"}
            collapsed={collapsed}
          />
          <NavigationLink
            to="/mental-health"
            label="Mental Health"
            icon={Brain}
            active={location.pathname.includes("/mental-health")}
            collapsed={collapsed}
          />
          <NavigationLink
            to="/financial"
            label="Financial Fitness"
            icon={Coins}
            active={location.pathname.includes("/financial")}
            collapsed={collapsed}
          />
          <NavigationLink
            to="/scholarships"
            label="Scholarships"
            icon={GraduationCap}
            active={location.pathname.includes("/scholarships")}
            collapsed={collapsed}
          />
          <NavigationLink
            to="/community"
            label="Community"
            icon={Users}
            active={location.pathname.includes("/community")}
            collapsed={collapsed}
          />
        </nav>
      </ScrollArea>
    </div>
  )
}

interface NavigationLinkProps {
  to: string
  label: string
  icon: React.ElementType
  active?: boolean
  collapsed?: boolean
}

function NavigationLink({
  to,
  label,
  icon: Icon,
  active,
  collapsed,
}: NavigationLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200 rounded-md",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}
