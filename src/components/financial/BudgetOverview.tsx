
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, Coffee, Landmark, ShoppingBag, Gift, FastForward } from "lucide-react";
import { cn } from "@/lib/utils";
import { BudgetEditModal } from "./BudgetEditModal";
import type { BudgetCategory } from "./BudgetEditModal";

export function BudgetOverview() {
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([
    {
      id: "1",
      category: "Housing",
      spent: 650,
      total: 650,
      icon: <Landmark className="h-5 w-5 text-studentwell-blue-500" />,
    },
    {
      id: "2",
      category: "Groceries",
      spent: 180,
      total: 250,
      icon: <ShoppingBag className="h-5 w-5 text-studentwell-green-500" />,
    },
    {
      id: "3",
      category: "Entertainment",
      spent: 85,
      total: 100,
      icon: <Gift className="h-5 w-5 text-studentwell-orange-500" />,
    },
    {
      id: "4",
      category: "Coffee & Eating Out",
      spent: 120,
      total: 75,
      overBudget: true,
      icon: <Coffee className="h-5 w-5 text-studentwell-teal-500" />,
    },
    {
      id: "5",
      category: "Subscriptions",
      spent: 25,
      total: 40,
      icon: <FastForward className="h-5 w-5 text-studentwell-blue-500" />,
    }
  ]);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const handleSaveBudget = (categories: BudgetCategory[]) => {
    setBudgetCategories(categories);
  };
  
  // Check if we have any overspent categories
  const overspentCategory = budgetCategories.find(cat => cat.spent > cat.total);
  
  return (
    <>
      <Card>
        <CardHeader className="bg-studentwell-green-500 text-white rounded-t-lg">
          <CardTitle className="text-lg font-semibold">Monthly Budget</CardTitle>
          <CardDescription className="text-green-100">
            {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Budget Overview</h3>
            <button 
              className="text-xs font-medium text-primary"
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit Budget
            </button>
          </div>
          
          <div className="space-y-3">
            {budgetCategories.map((category) => (
              <BudgetCategoryRow key={category.id} {...category} />
            ))}
          </div>
          
          {overspentCategory && (
            <Alert className="bg-studentwell-orange-100 border-studentwell-orange-500">
              <Bell className="h-4 w-4 text-studentwell-orange-500" />
              <AlertTitle className="text-studentwell-orange-600">Budget Alert</AlertTitle>
              <AlertDescription className="text-studentwell-orange-600">
                You've spent {Math.round((overspentCategory.spent / overspentCategory.total) * 100)}% of your {overspentCategory.category.toLowerCase()} budget this month.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      <BudgetEditModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        categories={budgetCategories}
        onSave={handleSaveBudget}
      />
    </>
  );
}

interface BudgetCategoryRowProps {
  category: string;
  spent: number;
  total: number;
  icon: React.ReactNode;
  overBudget?: boolean;
}

function BudgetCategoryRow({ category, spent, total, icon, overBudget }: BudgetCategoryRowProps) {
  const progress = Math.min(Math.round((spent / total) * 100), 100);
  
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
  );
}
