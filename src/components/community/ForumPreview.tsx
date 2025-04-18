
import { MessageSquare, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ForumCategory {
  id: string
  name: string
  description: string
  count: number
  lastActive: string
  tags: string[]
}

const categories: ForumCategory[] = [
  {
    id: "1",
    name: "Academic Support",
    description: "Get help with coursework, study strategies, and academic challenges",
    count: 156,
    lastActive: "10 minutes ago",
    tags: ["coursework", "study tips", "exams"]
  },
  {
    id: "2",
    name: "Mental Wellness",
    description: "Share experiences and support each other through mental health challenges",
    count: 89,
    lastActive: "35 minutes ago",
    tags: ["stress", "self-care", "support"]
  },
  {
    id: "3",
    name: "Financial Advice",
    description: "Tips and discussions about managing money, budgeting, and financial aid",
    count: 64,
    lastActive: "2 hours ago",
    tags: ["budgeting", "saving", "financial aid"]
  },
]

export function ForumPreview() {
  return (
    <Card className="h-full">
      <CardHeader className="bg-studentwell-orange-500 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Community Forum</CardTitle>
            <CardDescription className="text-orange-100">
              Connect with peers and get support
            </CardDescription>
          </div>
          <div className="bg-white/20 p-2 rounded-full">
            <Users className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{category.name}</h3>
                <div className="flex items-center text-muted-foreground text-xs">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  {category.count}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {category.description}
              </p>
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-1 flex-wrap">
                  {category.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {category.lastActive}
                </span>
              </div>
            </div>
          ))}
          <button className="w-full py-2 border border-dashed rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors">
            View all topics
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
