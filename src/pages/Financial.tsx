
import { PageLayout } from "@/components/layout/PageLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell, Coffee, CreditCard, DollarSign, FastForward, Gift, Landmark, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

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
          <Card>
            <CardHeader className="bg-studentwell-green-500 text-white rounded-t-lg">
              <CardTitle className="text-lg font-semibold">Monthly Budget</CardTitle>
              <CardDescription className="text-green-100">
                April 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Budget Overview</h3>
                <button className="text-xs font-medium text-primary">Edit Budget</button>
              </div>
              
              <div className="space-y-3">
                <BudgetCategory
                  category="Housing"
                  spent={650}
                  total={650}
                  icon={<Landmark className="h-5 w-5 text-studentwell-blue-500" />}
                />
                
                <BudgetCategory
                  category="Groceries"
                  spent={180}
                  total={250}
                  icon={<ShoppingBag className="h-5 w-5 text-studentwell-green-500" />}
                />
                
                <BudgetCategory
                  category="Entertainment"
                  spent={85}
                  total={100}
                  icon={<Gift className="h-5 w-5 text-studentwell-orange-500" />}
                />
                
                <BudgetCategory
                  category="Coffee & Eating Out"
                  spent={120}
                  total={75}
                  overBudget
                  icon={<Coffee className="h-5 w-5 text-studentwell-teal-500" />}
                />
                
                <BudgetCategory
                  category="Subscriptions"
                  spent={25}
                  total={40}
                  icon={<FastForward className="h-5 w-5 text-studentwell-blue-500" />}
                />
              </div>
              
              <Alert className="bg-studentwell-orange-100 border-studentwell-orange-500">
                <Bell className="h-4 w-4 text-studentwell-orange-500" />
                <AlertTitle className="text-studentwell-orange-600">Budget Alert</AlertTitle>
                <AlertDescription className="text-studentwell-orange-600">
                  You've spent 160% of your eating out budget this month.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
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

interface BudgetCategoryProps {
  category: string
  spent: number
  total: number
  icon: React.ReactNode
  overBudget?: boolean
}

function BudgetCategory({ category, spent, total, icon, overBudget }: BudgetCategoryProps) {
  const progress = Math.min(Math.round((spent / total) * 100), 100)
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{category}</span>
        </div>
        <div className={`text-sm ${overBudget ? 'text-red-500 font-medium' : ''}`}>
          ${spent} / ${total}
        </div>
      </div>
      {overBudget ? (
        <Progress 
          value={progress} 
          className="bg-red-100"
        />
      ) : (
        <Progress value={progress} />
      )}
    </div>
  )
}

interface FinancialCourseCardProps {
  title: string
  description: string
  progress: number
  lessons: number
  icon: React.ReactNode
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
  )
}
