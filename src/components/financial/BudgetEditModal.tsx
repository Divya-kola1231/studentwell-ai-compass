
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export interface BudgetCategory {
  id: string;
  category: string;
  spent: number;
  total: number;
  icon: React.ReactNode;
  overBudget?: boolean;
}

interface BudgetEditModalProps {
  open: boolean;
  onClose: () => void;
  categories: BudgetCategory[];
  onSave: (categories: BudgetCategory[]) => void;
}

export function BudgetEditModal({ open, onClose, categories, onSave }: BudgetEditModalProps) {
  const [editedCategories, setEditedCategories] = useState<BudgetCategory[]>(categories);
  const { toast } = useToast();
  
  const handleInputChange = (id: string, value: string) => {
    const updatedCategories = editedCategories.map(category => {
      if (category.id === id) {
        const newTotal = parseFloat(value) || 0;
        return {
          ...category,
          total: newTotal,
          overBudget: category.spent > newTotal
        };
      }
      return category;
    });
    
    setEditedCategories(updatedCategories);
  };
  
  const handleSave = () => {
    // Validate all budgets are positive numbers
    const hasInvalidBudgets = editedCategories.some(cat => cat.total < 0);
    
    if (hasInvalidBudgets) {
      toast({
        title: "Invalid budget amounts",
        description: "All budget amounts must be positive numbers.",
        variant: "destructive"
      });
      return;
    }
    
    // Save the updated categories
    onSave(editedCategories);
    toast({
      title: "Budget updated",
      description: "Your monthly budget has been updated successfully."
    });
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Monthly Budget</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          {editedCategories.map((category) => (
            <div key={category.id} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {category.icon}
                <Label htmlFor={`budget-${category.id}`}>{category.category}</Label>
              </div>
              
              <div className="flex items-center">
                <span className="mr-2 text-sm">$</span>
                <Input
                  id={`budget-${category.id}`}
                  type="number"
                  min="0"
                  value={category.total}
                  onChange={(e) => handleInputChange(category.id, e.target.value)}
                  className="w-24"
                />
              </div>
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
