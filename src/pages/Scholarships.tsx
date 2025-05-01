
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { ScholarshipFilters, FilterValues } from "@/components/scholarships/ScholarshipFilters";
import { ScholarshipList } from "@/components/scholarships/ScholarshipList";

const initialFilters: FilterValues = {
  searchQuery: "",
  minAmount: null,
  maxAmount: null,
  deadline: "any",
  fieldsOfStudy: [],
  eligibility: []
};

export default function Scholarships() {
  const [filters, setFilters] = useState<FilterValues>(initialFilters);
  
  const handleApplyFilters = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };
  
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
          <ScholarshipFilters onApplyFilters={handleApplyFilters} />
          <ScholarshipList filters={filters} />
        </div>
      </div>
    </PageLayout>
  )
}
