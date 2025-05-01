
import { PageLayout } from "@/components/layout/PageLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Coffee, CreditCard, DollarSign, Landmark } from "lucide-react"
import { cn } from "@/lib/utils"
import { BudgetOverview } from "@/components/financial/BudgetOverview"

export default function Financial() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Financial Fitness Center</h1>
          <p className="text-muted-foreground">
            Tools to help you manage your money and learn financial skills
          </p>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <BudgetOverview />
          
          <Card>
            <CardHeader className="bg-studentwell-blue-500 text-white rounded-t-lg">
              <CardTitle className="text-lg font-semibold">Financial Insights</CardTitle>
              <CardDescription className="text-blue-100">
                Analyze your spending patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <Tabs defaultValue="spending">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="spending">Spending</TabsTrigger>
                  <TabsTrigger value="saving">Saving</TabsTrigger>
                  <TabsTrigger value="debts">Debts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="spending" className="space-y-4 mt-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Spending by Category</span>
                      <span className="text-muted-foreground">This Month</span>
                    </div>
                    
                    <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
                      <p className="text-muted-foreground">Spending chart will appear here</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Spending Insights</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <ShoppingBag className="h-4 w-4 text-studentwell-green-500 mt-0.5" />
                        <span>Your grocery spending is 15% lower than last month.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Coffee className="h-4 w-4 text-red-500 mt-0.5" />
                        <span>Eating out has increased by 32% compared to your average.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CreditCard className="h-4 w-4 text-studentwell-blue-500 mt-0.5" />
                        <span>You have no late fees this month - great job!</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="saving" className="mt-4">
                  <div className="bg-muted/50 p-6 rounded-lg text-center">
                    <p className="text-muted-foreground">Saving content will appear here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="debts" className="mt-4">
                  <div className="bg-muted/50 p-6 rounded-lg text-center">
                    <p className="text-muted-foreground">Debt tracking will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Financial Education</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FinancialCourseCard
              title="Budgeting Basics"
              description="Learn how to create and stick to a practical student budget"
              progress={80}
              lessons={5}
              icon={<DollarSign className="h-5 w-5 text-studentwell-green-500" />}
            />
            
            <FinancialCourseCard
              title="Student Loans 101"
              description="Understanding loan types, interest rates, and repayment options"
              progress={30}
              lessons={8}
              icon={<Landmark className="h-5 w-5 text-studentwell-blue-500" />}
            />
            
            <FinancialCourseCard
              title="Credit Cards & Credit Scores"
              description="Building credit responsibly while avoiding debt traps"
              progress={0}
              lessons={6}
              icon={<CreditCard className="h-5 w-5 text-studentwell-teal-500" />}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

function ShoppingBag(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
      <path d="M3 6h18"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  )
}

interface FinancialCourseCardProps {
  title: string;
  description: string;
  progress: number;
  lessons: number;
  icon: React.ReactNode;
}

function FinancialCourseCard({ title, description, progress, lessons, icon }: FinancialCourseCardProps) {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">{progress}% complete</span>
            <span className="text-muted-foreground">{lessons} lessons</span>
          </div>
          <Progress value={progress} />
          <div className="flex justify-end mt-2">
            <button className="text-xs font-medium text-primary">
              {progress > 0 ? "Continue" : "Start Course"}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Re-export Progress from ui components
import { Progress } from "@/components/ui/progress";
