
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, MessageSquare, User, Heart, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface MyActivityModalProps {
  open: boolean;
  onClose: () => void;
}

interface ActivityItem {
  id: string;
  type: "topic" | "reply" | "like";
  title: string;
  content: string;
  date: Date;
  category?: string;
}

export function MyActivityModal({ open, onClose }: MyActivityModalProps) {
  const { user } = useAuth();
  
  // Mock data for user activity - would come from API in real app
  const myActivities: ActivityItem[] = [
    {
      id: "1",
      type: "topic",
      title: "Study group for final exams?",
      content: "Looking for people interested in forming a study group for upcoming finals. I'm studying Computer Science.",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      category: "Academic Support"
    },
    {
      id: "2",
      type: "reply",
      title: "Tips for managing exam stress and anxiety?",
      content: "I find that regular exercise and proper sleep helps a lot with managing stress during exams.",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      category: "Mental Wellness"
    },
    {
      id: "3",
      type: "like",
      title: "Budget template for college students - share yours!",
      content: "You liked this topic",
      date: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      category: "Financial Advice"
    },
    {
      id: "4",
      type: "reply",
      title: "Recommended resources for learning web development",
      content: "I highly recommend freeCodeCamp and The Odin Project for beginners. They're free and very comprehensive.",
      date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      category: "Tech & Tools"
    }
  ];
  
  // Filter activities by type
  const myTopics = myActivities.filter(activity => activity.type === "topic");
  const myReplies = myActivities.filter(activity => activity.type === "reply");
  const myLikes = myActivities.filter(activity => activity.type === "like");
  
  function formatDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  }
  
  function getActivityIcon(type: ActivityItem["type"]) {
    switch (type) {
      case "topic":
        return <MessageSquare className="h-4 w-4" />;
      case "reply":
        return <MessageCircle className="h-4 w-4" />;
      case "like":
        return <Heart className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5" />
            My Activity
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="topics">My Topics</TabsTrigger>
            <TabsTrigger value="replies">My Replies</TabsTrigger>
            <TabsTrigger value="likes">My Likes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4 space-y-4">
            {myActivities.length > 0 ? (
              myActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            ) : (
              <EmptyState message="You haven't participated in the community yet" />
            )}
          </TabsContent>
          
          <TabsContent value="topics" className="mt-4 space-y-4">
            {myTopics.length > 0 ? (
              myTopics.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            ) : (
              <EmptyState message="You haven't created any topics yet" />
            )}
          </TabsContent>
          
          <TabsContent value="replies" className="mt-4 space-y-4">
            {myReplies.length > 0 ? (
              myReplies.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            ) : (
              <EmptyState message="You haven't replied to any topics yet" />
            )}
          </TabsContent>
          
          <TabsContent value="likes" className="mt-4 space-y-4">
            {myLikes.length > 0 ? (
              myLikes.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            ) : (
              <EmptyState message="You haven't liked any topics yet" />
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

interface ActivityCardProps {
  activity: ActivityItem;
}

function ActivityCard({ activity }: ActivityCardProps) {
  const { user } = useAuth();
  const username = user?.email?.split('@')[0] || "User";
  
  return (
    <Card className="hover:shadow-sm transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" />
            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{username}</span>
              <span className="text-sm text-muted-foreground">
                {activity.type === "topic" ? "created a topic" : activity.type === "reply" ? "replied to" : "liked"}
              </span>
            </div>
            
            <h3 className="font-medium mt-1">{activity.title}</h3>
            
            {activity.type !== "like" && (
              <p className="text-sm text-muted-foreground mt-1">
                {activity.content.length > 100 ? `${activity.content.substring(0, 100)}...` : activity.content}
              </p>
            )}
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  {getActivityIcon(activity.type)}
                  {activity.category}
                </Badge>
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(activity.date)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-muted/50 p-6 rounded-lg text-center">
      <p className="text-muted-foreground">{message}</p>
      <p className="text-sm text-muted-foreground mt-2">
        Participate in the community to see your activity here
      </p>
    </div>
  );
}
