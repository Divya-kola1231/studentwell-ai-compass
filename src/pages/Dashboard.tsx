
import { Brain, Coins, GraduationCap, Users } from "lucide-react"
import { PageLayout } from "@/components/layout/PageLayout"
import { WelcomeMessage } from "@/components/dashboard/WelcomeMessage"
import { DashboardCard } from "@/components/dashboard/DashboardCard"

export default function Dashboard() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <WelcomeMessage />
        
        <h2 className="text-xl font-semibold mt-8 mb-4">StudentWell AI Services</h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Mental Health Hub"
            description="Access our AI counselor, mood tracking, and self-care resources"
            icon={<Brain className="h-5 w-5 text-white" />}
            to="/mental-health"
            gradient="from-studentwell-blue-500 to-studentwell-teal-500"
          />
          
          <DashboardCard
            title="Financial Fitness"
            description="Manage your budget, learn financial skills, and track spending"
            icon={<Coins className="h-5 w-5 text-white" />}
            to="/financial"
            gradient="from-studentwell-green-500 to-studentwell-green-600"
          />
          
          <DashboardCard
            title="Scholarship Finder"
            description="Discover opportunities that match your profile and goals"
            icon={<GraduationCap className="h-5 w-5 text-white" />}
            to="/scholarships"
            gradient="from-studentwell-teal-500 to-studentwell-blue-500"
          />
          
          <DashboardCard
            title="Community Forum"
            description="Connect with peers for support, advice, and mentorship"
            icon={<Users className="h-5 w-5 text-white" />}
            to="/community"
            gradient="from-studentwell-orange-400 to-studentwell-orange-500"
          />
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-muted/50 p-6 rounded-lg text-center">
            <p className="text-muted-foreground">Your recent activity will appear here as you use the platform</p>
            <button className="mt-3 text-sm font-medium text-primary">
              Explore the platform to get started
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
