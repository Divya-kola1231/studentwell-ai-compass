
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarCheck, DollarSign, File, GraduationCap, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface ActivityItem {
  id: string;
  type: "financial" | "scholarship" | "community" | "mental-health" | "document";
  title: string;
  description: string;
  date: Date;
}

export function RecentActivity() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch from an API/database
    // For now, we'll simulate with mock data
    const mockActivities: ActivityItem[] = [
      {
        id: "1",
        type: "financial",
        title: "Budget Updated",
        description: "You updated your monthly budget allocations",
        date: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      },
      {
        id: "2",
        type: "scholarship",
        title: "Application Started",
        description: "You began an application for Future Tech Leaders Scholarship",
        date: new Date(Date.now() - 1000 * 60 * 60 * 3) // 3 hours ago
      },
      {
        id: "3",
        type: "community",
        title: "Forum Reply",
        description: "You replied to 'Tips for managing exam stress and anxiety?'",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
      },
      {
        id: "4",
        type: "mental-health",
        title: "Mood Tracked",
        description: "You logged your daily mood and reflection",
        date: new Date(Date.now() - 1000 * 60 * 60 * 30) // 30 hours ago
      },
      {
        id: "5",
        type: "document",
        title: "Resume Updated",
        description: "You updated your resume in your profile",
        date: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
      },
    ];
    
    setTimeout(() => {
      setActivities(mockActivities);
      setLoading(false);
    }, 800); // Simulate loading delay
  }, [user]);
  
  function formatDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  }
  
  function getActivityIcon(type: ActivityItem["type"]) {
    switch (type) {
      case "financial":
        return <DollarSign className="h-4 w-4" />;
      case "scholarship":
        return <GraduationCap className="h-4 w-4" />;
      case "community":
        return <MessageCircle className="h-4 w-4" />;
      case "mental-health":
        return <CalendarCheck className="h-4 w-4" />;
      case "document":
        return <File className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  }
  
  function getActivityColor(type: ActivityItem["type"]) {
    switch (type) {
      case "financial":
        return "bg-studentwell-green-100 text-studentwell-green-600";
      case "scholarship":
        return "bg-studentwell-teal-100 text-studentwell-teal-600";
      case "community":
        return "bg-studentwell-orange-100 text-studentwell-orange-600";
      case "mental-health":
        return "bg-studentwell-blue-100 text-studentwell-blue-600";
      case "document":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  }
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-studentwell-blue-500"></div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {activities.length > 0 ? (
          <div className="divide-y">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                <div className={cn("p-2 rounded-full", getActivityColor(activity.type))}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(activity.date)}</p>
                </div>
              </div>
            ))}
            <div className="p-4 text-center">
              <button className="text-sm text-primary font-medium hover:underline">
                View All Activity
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-muted-foreground">No recent activity found</p>
            <button className="mt-3 text-sm font-medium text-primary">
              Explore the platform to get started
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
