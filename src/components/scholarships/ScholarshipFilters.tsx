
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export interface FilterValues {
  searchQuery: string;
  minAmount: number | null;
  maxAmount: number | null;
  deadline: string;
  fieldsOfStudy: string[];
  eligibility: string[];
}

interface ScholarshipFiltersProps {
  onApplyFilters: (filters: FilterValues) => void;
}

const initialFilters: FilterValues = {
  searchQuery: "",
  minAmount: null,
  maxAmount: null,
  deadline: "any",
  fieldsOfStudy: [],
  eligibility: []
};

export function ScholarshipFilters({ onApplyFilters }: ScholarshipFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>(initialFilters);
  const { toast } = useToast();
  
  const allFieldsOfStudy = ["Computer Science", "Engineering", "Business", "Arts", "Medicine", "Education", "Law"];
  const allEligibility = ["Undergraduate", "Graduate", "International Students", "Underrepresented Groups"];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };
  
  const handleAmountChange = (key: 'minAmount' | 'maxAmount', value: string) => {
    const numValue = value === '' ? null : Number(value);
    setFilters(prev => ({ ...prev, [key]: numValue }));
  };
  
  const handleDeadlineChange = (value: string) => {
    setFilters(prev => ({ ...prev, deadline: value }));
  };
  
  const toggleField = (field: string) => {
    setFilters(prev => {
      const fields = prev.fieldsOfStudy.includes(field)
        ? prev.fieldsOfStudy.filter(f => f !== field)
        : [...prev.fieldsOfStudy, field];
      return { ...prev, fieldsOfStudy: fields };
    });
  };
  
  const toggleEligibility = (eligibility: string) => {
    setFilters(prev => {
      const eligibilities = prev.eligibility.includes(eligibility)
        ? prev.eligibility.filter(e => e !== eligibility)
        : [...prev.eligibility, eligibility];
      return { ...prev, eligibility: eligibilities };
    });
  };
  
  const handleApplyFilters = () => {
    // Validate min/max amounts if both are provided
    if (filters.minAmount !== null && filters.maxAmount !== null) {
      if (filters.minAmount > filters.maxAmount) {
        toast({
          title: "Invalid amount range",
          description: "Minimum amount cannot be greater than maximum amount",
          variant: "destructive"
        });
        return;
      }
    }
    
    onApplyFilters(filters);
    toast({
      title: "Filters applied",
      description: "Scholarship results have been updated based on your filters."
    });
  };
  
  const handleResetFilters = () => {
    setFilters(initialFilters);
    onApplyFilters(initialFilters);
    toast({
      title: "Filters reset",
      description: "All scholarship filters have been cleared."
    });
  };
  
  return (
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
                value={filters.searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Award Amount</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Input 
                placeholder="Min" 
                type="number"
                min="0"
                value={filters.minAmount === null ? '' : filters.minAmount}
                onChange={(e) => handleAmountChange('minAmount', e.target.value)}
              />
              <Input 
                placeholder="Max" 
                type="number"
                min="0"
                value={filters.maxAmount === null ? '' : filters.maxAmount}
                onChange={(e) => handleAmountChange('maxAmount', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Deadline</label>
            <select 
              className="w-full p-2 border rounded-md text-sm mt-1"
              value={filters.deadline}
              onChange={(e) => handleDeadlineChange(e.target.value)}
            >
              <option value="any">Any time</option>
              <option value="1month">Within 1 month</option>
              <option value="3months">Within 3 months</option>
              <option value="thisyear">This year</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium">Fields of Study</label>
            <div className="flex flex-wrap gap-1 mt-1">
              {allFieldsOfStudy.map((field) => (
                <Badge 
                  key={field} 
                  variant={filters.fieldsOfStudy.includes(field) ? "default" : "outline"} 
                  className={`cursor-pointer ${
                    filters.fieldsOfStudy.includes(field) 
                      ? "bg-studentwell-teal-500 hover:bg-studentwell-teal-600" 
                      : "hover:bg-muted"
                  }`}
                  onClick={() => toggleField(field)}
                >
                  {field}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Eligibility</label>
            <div className="space-y-2 mt-1">
              {allEligibility.map((eligibility) => (
                <div key={eligibility} className="flex items-center">
                  <Checkbox 
                    id={eligibility.replace(/\s+/g, '-').toLowerCase()}
                    checked={filters.eligibility.includes(eligibility)}
                    onCheckedChange={() => toggleEligibility(eligibility)}
                  />
                  <Label 
                    htmlFor={eligibility.replace(/\s+/g, '-').toLowerCase()} 
                    className="text-sm ml-2"
                  >
                    {eligibility}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Button 
              className="w-full bg-studentwell-teal-500 hover:bg-studentwell-teal-600"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
            <Button 
              variant="outline"
              className="w-full"
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
