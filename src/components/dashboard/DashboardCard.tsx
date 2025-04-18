
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon: React.ReactNode
  to: string
  actionText?: string
  gradient?: string
  className?: string
}

export function DashboardCard({
  title,
  description,
  icon,
  to,
  actionText = "View",
  gradient = "from-studentwell-blue-500 to-studentwell-teal-500",
  className,
  ...props
}: DashboardCardProps) {
  return (
    <Link to={to}>
      <Card 
        className={cn(
          "transition-all duration-200 hover:shadow-md cursor-pointer h-full", 
          className
        )}
        {...props}
      >
        <CardHeader className={cn("pb-2", `bg-gradient-to-br ${gradient} text-white rounded-t-lg`)}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <div className="bg-white/20 p-2 rounded-full">
              {icon}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <CardDescription className="text-sm mb-4">{description}</CardDescription>
          <div className="flex justify-end">
            <span className="text-xs font-medium text-primary inline-flex items-center">
              {actionText}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
