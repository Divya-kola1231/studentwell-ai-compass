
import { PageLayout } from "@/components/layout/PageLayout"
import { ChatBot } from "@/components/mental-health/ChatBot"
import { MoodTracker } from "@/components/mental-health/MoodTracker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flame, Leaf, Sun, Zap } from "lucide-react"

export default function MentalHealth() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mental Health Hub</h1>
          <p className="text-muted-foreground">
            Tools and resources to support your emotional wellbeing
          </p>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <ChatBot />
          <MoodTracker />
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Self-care Activities</h2>
          <Tabs defaultValue="recommended">
            <TabsList>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="quick">Quick Exercises</TabsTrigger>
              <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
              <TabsTrigger value="physical">Physical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommended" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <SelfCareCard
                  title="Mindful Breathing"
                  description="A 5-minute breathing exercise to reduce stress"
                  duration="5 min"
                  icon={<Leaf className="h-5 w-5 text-studentwell-green-500" />}
                />
                
                <SelfCareCard
                  title="Gratitude Journal"
                  description="Record three things you're grateful for today"
                  duration="3 min"
                  icon={<Sun className="h-5 w-5 text-studentwell-orange-500" />}
                />
                
                <SelfCareCard
                  title="Quick Stretch"
                  description="Simple desk stretches to relieve tension"
                  duration="2 min"
                  icon={<Zap className="h-5 w-5 text-studentwell-blue-500" />}
                />
                
                <SelfCareCard
                  title="Stress Release"
                  description="Guided visualization to release academic stress"
                  duration="10 min"
                  icon={<Flame className="h-5 w-5 text-studentwell-teal-500" />}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="quick" className="mt-4">
              <div className="bg-muted/50 p-6 rounded-lg text-center">
                <p className="text-muted-foreground">Quick exercise content will appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="mindfulness" className="mt-4">
              <div className="bg-muted/50 p-6 rounded-lg text-center">
                <p className="text-muted-foreground">Mindfulness content will appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="physical" className="mt-4">
              <div className="bg-muted/50 p-6 rounded-lg text-center">
                <p className="text-muted-foreground">Physical wellness content will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  )
}

interface SelfCareCardProps {
  title: string
  description: string
  duration: string
  icon: React.ReactNode
}

function SelfCareCard({ title, description, duration, icon }: SelfCareCardProps) {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{duration}</span>
          <button className="text-xs font-medium text-primary">Start</button>
        </div>
      </CardContent>
    </Card>
  )
}
