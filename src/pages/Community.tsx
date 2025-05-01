
import { useState } from "react"
import { PageLayout } from "@/components/layout/PageLayout"
import { ForumPreview } from "@/components/community/ForumPreview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Search, User, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MyActivityModal } from "@/components/community/MyActivityModal"
import { useToast } from "@/components/ui/use-toast"

export default function Community() {
  const [isMyActivityOpen, setIsMyActivityOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search performed",
        description: `Showing results for "${searchQuery}"`
      });
    }
  };
  
  const handleNewTopic = () => {
    toast({
      title: "Creating new topic",
      description: "Opening the new topic form"
    });
    // In a real app, this would open a form modal
  };
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Community Forum</h1>
          <p className="text-muted-foreground">
            Connect with peers for support, advice, and shared experiences
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button 
              className="bg-studentwell-orange-500 hover:bg-studentwell-orange-600"
              onClick={handleNewTopic}
            >
              New Topic
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsMyActivityOpen(true)}
            >
              My Activity
            </Button>
          </div>
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search discussions..."
              className="w-full md:w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <Tabs defaultValue="popular">
          <TabsList>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          </TabsList>
          
          <TabsContent value="popular" className="mt-4">
            <div className="space-y-4">
              {popularTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-4">
            <div className="space-y-4">
              <TopicCard 
                topic={{
                  id: "4",
                  title: "Recommended resources for learning web development",
                  author: {
                    name: "Taylor Morris",
                  },
                  category: "Tech & Tools",
                  replies: 8,
                  views: 112,
                  lastActive: "15 minutes ago",
                  tags: ["web development", "resources", "learning"]
                }}
              />
              <TopicCard 
                topic={{
                  id: "5",
                  title: "When is the best time to apply for summer internships?",
                  author: {
                    name: "Jordan Lin",
                  },
                  category: "Career Planning",
                  replies: 12,
                  views: 143,
                  lastActive: "45 minutes ago",
                  tags: ["internships", "career", "planning"]
                }}
              />
              <TopicCard 
                topic={{
                  id: "6",
                  title: "Roommate conflict resolution strategies?",
                  author: {
                    name: "Sydney Khan",
                  },
                  category: "Campus Life",
                  replies: 19,
                  views: 205,
                  lastActive: "2 hours ago",
                  tags: ["roommates", "conflict", "housing"]
                }}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <CategoryCard
                title="Academic Support"
                description="Help with coursework and exams"
                icon={<GraduationCap className="h-5 w-5" />}
                topicCount={156}
              />
              <CategoryCard
                title="Mental Wellness"
                description="Share experiences and support"
                icon={<Brain className="h-5 w-5" />}
                topicCount={89}
              />
              <CategoryCard
                title="Financial Advice"
                description="Budgeting and financial tips"
                icon={<Coins className="h-5 w-5" />}
                topicCount={64}
              />
              <CategoryCard
                title="Career Planning"
                description="Internships and job advice"
                icon={<Briefcase className="h-5 w-5" />}
                topicCount={42}
              />
              <CategoryCard
                title="Campus Life"
                description="Activities and social events"
                icon={<Coffee className="h-5 w-5" />}
                topicCount={78}
              />
              <CategoryCard
                title="Tech & Tools"
                description="Software and study resources"
                icon={<Laptop className="h-5 w-5" />}
                topicCount={35}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="mentorship" className="mt-4">
            <div className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-medium mb-2">Find a Mentor</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with experienced students or alumni who can guide you through challenges
                </p>
                <div className="flex gap-2">
                  <Button>Browse Mentors</Button>
                  <Button variant="outline">Become a Mentor</Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Featured Mentors</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <MyActivityModal open={isMyActivityOpen} onClose={() => setIsMyActivityOpen(false)} />
    </PageLayout>
  )
}

interface Topic {
  id: string
  title: string
  author: {
    name: string
    avatar?: string
  }
  category: string
  replies: number
  views: number
  lastActive: string
  tags: string[]
}

interface Mentor {
  id: string
  name: string
  avatar?: string
  expertise: string[]
  bio: string
  helpCount: number
}

const popularTopics: Topic[] = [
  {
    id: "1",
    title: "Tips for managing exam stress and anxiety?",
    author: {
      name: "Alex Thompson",
    },
    category: "Mental Wellness",
    replies: 24,
    views: 342,
    lastActive: "2 hours ago",
    tags: ["stress", "exams", "anxiety"]
  },
  {
    id: "2",
    title: "Budget template for college students - share yours!",
    author: {
      name: "Jamie Lee",
    },
    category: "Financial Advice",
    replies: 18,
    views: 256,
    lastActive: "5 hours ago",
    tags: ["budget", "template", "finance"]
  },
  {
    id: "3",
    title: "Study techniques that actually work - backed by science",
    author: {
      name: "Sam Rivera",
    },
    category: "Academic Support",
    replies: 32,
    views: 487,
    lastActive: "1 day ago",
    tags: ["study", "techniques", "productivity"]
  },
]

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Dr. Morgan Chen",
    expertise: ["Psychology", "Stress Management"],
    bio: "Psychology professor with 10+ years experience in student counseling",
    helpCount: 124
  },
  {
    id: "2",
    name: "Taylor James",
    expertise: ["Financial Planning", "Scholarships"],
    bio: "Financial aid advisor who's helped students secure over $2M in scholarships",
    helpCount: 86
  },
  {
    id: "3",
    name: "Jordan Smith",
    expertise: ["Career Development", "Internships"],
    bio: "Senior student who's interned at top tech companies, happy to guide others",
    helpCount: 53
  },
]

function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={topic.author.avatar} />
            <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-medium">{topic.title}</h3>
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="h-3 w-3 mr-1" />
                <span className="mr-3">{topic.author.name}</span>
                <Badge variant="outline" className="text-xs">{topic.category}</Badge>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  {topic.replies}
                </div>
                <div>
                  <span>Last active: {topic.lastActive}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-1">
              {topic.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CategoryCard({ 
  title, 
  description, 
  icon: Icon, 
  topicCount 
}: { 
  title: string
  description: string
  icon: React.ReactNode
  topicCount: number
}) {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {Icon}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center text-xs text-muted-foreground">
            <MessageSquare className="h-3 w-3 mr-1" />
            {topicCount} topics
          </div>
          <Button variant="ghost" size="sm" className="text-xs font-medium text-primary">
            Browse
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={mentor.avatar} />
            <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-medium">{mentor.name}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {mentor.expertise.map((area) => (
                <Badge key={area} variant="outline" className="text-xs">{area}</Badge>
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-3">{mentor.bio}</p>
        
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="h-3 w-3 mr-1" />
            Helped {mentor.helpCount} students
          </div>
          <Button size="sm" className="text-xs">Connect</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function GraduationCap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 10-8.1-4.05a1 1 0 0 0-.9 0L5 10" />
      <path d="M4 12v6c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-6" />
      <path d="M14 15.5V17a2 2 0 0 1-4 0v-1.5" />
      <path d="M4 10v2a2 2 0 1 0 4 0v-2" />
      <path d="M8 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M18 12a2 2 0 0 0-2-2" />
    </svg>
  )
}

function Brain(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8a2 2 0 1 0 4 0 2 2 0 1 0-4 0M15 13V7M12 16a2 2 0 1 0 4 0 2 2 0 1 0-4 0M15 16.5V21M21 11V8a2 2 0 1 0-4 0v2.5M21 16V7.5M9 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0M9 11v5M9 8V5c0-1.1-.9-2-2-2s-2 .9-2 2v6.5M3 16V8.5M9 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
    </svg>
  )
}

function Coins(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  )
}

function Briefcase(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function Coffee(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  )
}

function Laptop(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  )
}
