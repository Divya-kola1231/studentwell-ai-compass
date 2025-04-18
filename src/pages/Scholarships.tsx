
import { PageLayout } from "@/components/layout/PageLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarClock, GraduationCap, Search, Tag, UserCheck } from "lucide-react"

export default function Scholarships() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Scholarship Matchmaker</h1>
          <p className="text-muted-foreground">
            Discover and apply for scholarships that match your profile
          </p>
        </div>
        
        <Card className="border-studentwell-teal-500">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-4">
                <h2 className="font-semibold text-lg">Find Your Perfect Scholarships</h2>
                <p className="text-sm text-muted-foreground">
                  Our AI-powered system matches you with relevant scholarships based on your academic background, 
                  interests, and goals. The more complete your profile, the better your matches will be.
                </p>
                <div className="flex gap-2">
                  <Button className="bg-studentwell-teal-500 hover:bg-studentwell-teal-600">Update Profile</Button>
                  <Button variant="outline">View Profile Strength</Button>
                </div>
              </div>
              
              <div className="border-l pl-4 hidden md:block">
                <div className="text-center px-4">
                  <div className="text-2xl font-bold text-studentwell-teal-500">87%</div>
                  <div className="text-sm text-muted-foreground">Profile Strength</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Add more details to your profile to improve your matches
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <Card className="w-full md:w-72 sticky top-20">
            <CardHeader className="bg-studentwell-teal-500 text-white rounded-t-lg">
              <CardTitle className="text-lg font-semibold">Filter Options</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Search Keywords</label>
                  <div className="relative mt-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search scholarships..."
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Award Amount</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <Input placeholder="Min" />
                    <Input placeholder="Max" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Deadline</label>
                  <select className="w-full p-2 border rounded-md text-sm mt-1">
                    <option>Any time</option>
                    <option>Within 1 month</option>
                    <option>Within 3 months</option>
                    <option>This year</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Fields of Study</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {["Computer Science", "Engineering", "Business", "Arts", "Medicine"].map((field) => (
                      <Badge key={field} variant="outline" className="cursor-pointer hover:bg-muted">{field} +</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Eligibility</label>
                  <div className="space-y-2 mt-1">
                    <div className="flex items-center">
                      <input type="checkbox" id="undergrad" className="mr-2" />
                      <label htmlFor="undergrad" className="text-sm">Undergraduate</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="graduate" className="mr-2" />
                      <label htmlFor="graduate" className="text-sm">Graduate</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="intl" className="mr-2" />
                      <label htmlFor="intl" className="text-sm">International Students</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="minority" className="mr-2" />
                      <label htmlFor="minority" className="text-sm">Underrepresented Groups</label>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex-1">
            <Tabs defaultValue="matches">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="matches">Best Matches</TabsTrigger>
                <TabsTrigger value="deadlines">Upcoming Deadlines</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>
              
              <TabsContent value="matches" className="mt-4 space-y-4">
                <div className="text-sm text-muted-foreground">
                  Showing 12 scholarships matched to your profile
                </div>
                
                <ScholarshipCard
                  title="Future Tech Leaders Scholarship"
                  organization="Tech Industry Association"
                  amount={5000}
                  deadline="May 15, 2025"
                  matchScore={95}
                  tags={["Technology", "Leadership", "Innovation"]}
                />
                
                <ScholarshipCard
                  title="Academic Excellence Award"
                  organization="National Education Foundation"
                  amount={2500}
                  deadline="June 1, 2025"
                  matchScore={88}
                  tags={["Academic Merit", "GPA 3.5+", "Essay Required"]}
                />
                
                <ScholarshipCard
                  title="Diversity in STEM Scholarship"
                  organization="Future Scientists Initiative"
                  amount={3000}
                  deadline="May 30, 2025"
                  matchScore={85}
                  tags={["STEM", "Diversity", "Underrepresented Groups"]}
                />
                
                <ScholarshipCard
                  title="Community Service Scholarship"
                  organization="Community Foundation"
                  amount={1500}
                  deadline="July 15, 2025"
                  matchScore={82}
                  tags={["Volunteer Work", "Community Impact", "Leadership"]}
                />
              </TabsContent>
              
              <TabsContent value="deadlines" className="mt-4">
                <div className="bg-muted/50 p-6 rounded-lg text-center">
                  <p className="text-muted-foreground">Upcoming deadlines will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="saved" className="mt-4">
                <div className="bg-muted/50 p-6 rounded-lg text-center">
                  <p className="text-muted-foreground">Saved scholarships will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

interface ScholarshipCardProps {
  title: string
  organization: string
  amount: number
  deadline: string
  matchScore: number
  tags: string[]
}

function ScholarshipCard({ title, organization, amount, deadline, matchScore, tags }: ScholarshipCardProps) {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{organization}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">${amount.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarClock className="h-3 w-3 mr-1" />
              {deadline}
            </div>
          </div>
        </div>
        
        <div className="my-3 flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
          <Badge className="bg-studentwell-teal-500 flex items-center gap-1">
            <UserCheck className="h-3 w-3" />
            {matchScore}% Match
          </Badge>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <Button variant="outline" size="sm" className="text-xs">
            <GraduationCap className="h-3 w-3 mr-1" />
            View Details
          </Button>
          <Button size="sm" className="text-xs">Apply Now</Button>
        </div>
      </CardContent>
    </Card>
  )
}
