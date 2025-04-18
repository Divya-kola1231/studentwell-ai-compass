
import { useState } from "react"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MoodData {
  date: string
  mood: 1 | 2 | 3 | 4 | 5
  note?: string
}

const MOOD_EMOJIS = {
  1: "😞",
  2: "😔",
  3: "😐",
  4: "🙂",
  5: "😄"
}

const MOOD_LABELS = {
  1: "Very Low",
  2: "Low",
  3: "Neutral",
  4: "Good",
  5: "Great"
}

const MOOD_COLORS = {
  1: "bg-red-500",
  2: "bg-orange-400",
  3: "bg-yellow-400",
  4: "bg-green-400",
  5: "bg-green-500"
}

// Demo data
const demoMoodData: MoodData[] = [
  { date: "2025-04-12", mood: 3 },
  { date: "2025-04-13", mood: 4 },
  { date: "2025-04-14", mood: 4 },
  { date: "2025-04-15", mood: 2, note: "Stressful exam day" },
  { date: "2025-04-16", mood: 3 },
  { date: "2025-04-17", mood: 5, note: "Got great results on my project!" },
  { date: "2025-04-18", mood: 4 }
]

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<1 | 2 | 3 | 4 | 5 | null>(null)
  const [moodNote, setMoodNote] = useState("")
  const [moodData] = useState<MoodData[]>(demoMoodData)

  return (
    <Card className="h-full">
      <CardHeader className="bg-studentwell-green-500 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Mood Tracker</CardTitle>
            <CardDescription className="text-green-100">
              Track your emotional wellbeing
            </CardDescription>
          </div>
          <div className="bg-white/20 p-2 rounded-full">
            <Calendar className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="today">Today's Mood</TabsTrigger>
            <TabsTrigger value="history">Mood History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-4">
            <p className="text-sm text-muted-foreground">How are you feeling today?</p>
            
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((mood) => (
                <button
                  key={mood}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                    selectedMood === mood ? "bg-muted scale-110" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedMood(mood as 1 | 2 | 3 | 4 | 5)}
                >
                  <span className="text-2xl">{MOOD_EMOJIS[mood as keyof typeof MOOD_EMOJIS]}</span>
                  <span className="text-xs mt-1">{MOOD_LABELS[mood as keyof typeof MOOD_LABELS]}</span>
                </button>
              ))}
            </div>
            
            {selectedMood && (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Add a note about why you're feeling this way (optional)
                </p>
                <textarea
                  className="w-full p-2 border rounded-md text-sm h-20 resize-none"
                  placeholder="I'm feeling this way because..."
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                />
                <button className="w-full bg-studentwell-green-500 text-white py-2 rounded-md text-sm font-medium hover:bg-studentwell-green-600 transition-colors">
                  Save Today's Mood
                </button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Your mood over the past 7 days</p>
              
              <div className="flex h-40 items-end gap-1">
                {moodData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full ${MOOD_COLORS[day.mood]} rounded-t-sm`} 
                      style={{ height: `${day.mood * 20}%` }}
                      title={day.note}
                    />
                    <div className="w-full text-center text-xs mt-1">
                      <div>{MOOD_EMOJIS[day.mood]}</div>
                      <div className="text-muted-foreground">
                        {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-3 mt-3">
                <h4 className="font-medium text-sm">Insights</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Your mood has been improving over the past week. The lowest point was on Tuesday, which you noted was a stressful exam day.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
