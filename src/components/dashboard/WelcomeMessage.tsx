
import { Card, CardContent } from "@/components/ui/card"

export function WelcomeMessage() {
  const currentTime = new Date()
  const hour = currentTime.getHours()
  
  let greeting = "Good morning"
  if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon"
  } else if (hour >= 17) {
    greeting = "Good evening"
  }

  return (
    <Card className="border-none bg-gradient-to-r from-studentwell-blue-500 to-studentwell-teal-500 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{greeting}, Jane!</h1>
            <p className="text-blue-100 mt-1">
              Welcome to StudentWell AI. How are you feeling today?
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full text-sm">
              I'm doing well
            </button>
            <button className="bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full text-sm">
              Just okay
            </button>
            <button className="bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full text-sm">
              Need support
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
