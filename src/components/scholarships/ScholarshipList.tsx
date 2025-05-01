
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, GraduationCap, Tag, UserCheck } from "lucide-react";
import type { FilterValues } from "./ScholarshipFilters";
import { useToast } from "@/components/ui/use-toast";

export interface Scholarship {
  id: string;
  title: string;
  organization: string;
  amount: number;
  deadline: string;
  deadlineDate: Date;
  matchScore: number;
  tags: string[];
  description?: string;
  eligibility?: string[];
  fieldOfStudy?: string[];
}

interface ScholarshipListProps {
  filters: FilterValues;
}

export function ScholarshipList({ filters }: ScholarshipListProps) {
  const [activeTab, setActiveTab] = useState("matches");
  const [savedScholarships, setSavedScholarships] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Mock data for scholarships
  const allScholarships: Scholarship[] = [
    {
      id: "1",
      title: "Future Tech Leaders Scholarship",
      organization: "Tech Industry Association",
      amount: 5000,
      deadline: "May 15, 2025",
      deadlineDate: new Date("2025-05-15"),
      matchScore: 95,
      tags: ["Technology", "Leadership", "Innovation"],
      description: "For students pursuing degrees in computer science, information technology, or related fields who demonstrate leadership potential.",
      eligibility: ["Undergraduate", "Graduate"],
      fieldOfStudy: ["Computer Science", "Engineering"]
    },
    {
      id: "2",
      title: "Academic Excellence Award",
      organization: "National Education Foundation",
      amount: 2500,
      deadline: "June 1, 2025",
      deadlineDate: new Date("2025-06-01"),
      matchScore: 88,
      tags: ["Academic Merit", "GPA 3.5+", "Essay Required"],
      description: "Recognizes outstanding academic achievement across all fields of study.",
      eligibility: ["Undergraduate"],
      fieldOfStudy: ["Any"]
    },
    {
      id: "3",
      title: "Diversity in STEM Scholarship",
      organization: "Future Scientists Initiative",
      amount: 3000,
      deadline: "May 30, 2025",
      deadlineDate: new Date("2025-05-30"),
      matchScore: 85,
      tags: ["STEM", "Diversity", "Underrepresented Groups"],
      description: "Supports students from underrepresented groups pursuing careers in science, technology, engineering, or mathematics.",
      eligibility: ["Undergraduate", "Graduate", "Underrepresented Groups"],
      fieldOfStudy: ["Computer Science", "Engineering", "Medicine"]
    },
    {
      id: "4",
      title: "Community Service Scholarship",
      organization: "Community Foundation",
      amount: 1500,
      deadline: "July 15, 2025",
      deadlineDate: new Date("2025-07-15"),
      matchScore: 82,
      tags: ["Volunteer Work", "Community Impact", "Leadership"],
      description: "For students who have made significant contributions to their communities through volunteer service.",
      eligibility: ["Undergraduate"],
      fieldOfStudy: ["Any"]
    },
    {
      id: "5",
      title: "Business Innovation Grant",
      organization: "Entrepreneurs Association",
      amount: 4000,
      deadline: "August 5, 2025",
      deadlineDate: new Date("2025-08-05"),
      matchScore: 78,
      tags: ["Entrepreneurship", "Business Plan", "Innovation"],
      description: "Supports students with innovative business ideas or startup concepts.",
      eligibility: ["Undergraduate", "Graduate"],
      fieldOfStudy: ["Business"]
    },
    {
      id: "6",
      title: "Creative Arts Fellowship",
      organization: "Arts Council",
      amount: 2800,
      deadline: "June 22, 2025",
      deadlineDate: new Date("2025-06-22"),
      matchScore: 76,
      tags: ["Portfolio Required", "Creative Project", "Arts"],
      description: "For students demonstrating exceptional talent in visual arts, performing arts, or creative writing.",
      eligibility: ["Undergraduate", "Graduate"],
      fieldOfStudy: ["Arts"]
    },
    {
      id: "7",
      title: "International Student Award",
      organization: "Global Education Foundation",
      amount: 3500,
      deadline: "May 20, 2025",
      deadlineDate: new Date("2025-05-20"),
      matchScore: 72,
      tags: ["International", "Leadership", "Academic Merit"],
      description: "Dedicated to supporting international students pursuing higher education.",
      eligibility: ["Undergraduate", "Graduate", "International Students"],
      fieldOfStudy: ["Any"]
    },
    {
      id: "8",
      title: "Healthcare Professionals Scholarship",
      organization: "Health Services Association",
      amount: 4500,
      deadline: "July 30, 2025",
      deadlineDate: new Date("2025-07-30"),
      matchScore: 70,
      tags: ["Healthcare", "Community Service", "Essay Required"],
      description: "For students pursuing careers in healthcare fields who demonstrate commitment to community service.",
      eligibility: ["Undergraduate", "Graduate"],
      fieldOfStudy: ["Medicine"]
    }
  ];
  
  // Filter scholarships based on active filters
  const filterScholarships = (scholarships: Scholarship[]): Scholarship[] => {
    return scholarships.filter(scholarship => {
      // Search query filter
      if (filters.searchQuery && !scholarship.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) && 
          !scholarship.organization.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !scholarship.tags.some(tag => tag.toLowerCase().includes(filters.searchQuery.toLowerCase()))) {
        return false;
      }
      
      // Amount filters
      if (filters.minAmount !== null && scholarship.amount < filters.minAmount) {
        return false;
      }
      if (filters.maxAmount !== null && scholarship.amount > filters.maxAmount) {
        return false;
      }
      
      // Deadline filter
      if (filters.deadline !== 'any') {
        const today = new Date();
        const deadline = scholarship.deadlineDate;
        
        if (filters.deadline === '1month' && (deadline.getTime() - today.getTime() > 30 * 24 * 60 * 60 * 1000)) {
          return false;
        }
        if (filters.deadline === '3months' && (deadline.getTime() - today.getTime() > 90 * 24 * 60 * 60 * 1000)) {
          return false;
        }
        if (filters.deadline === 'thisyear' && deadline.getFullYear() > today.getFullYear()) {
          return false;
        }
      }
      
      // Fields of study filter
      if (filters.fieldsOfStudy.length > 0 && 
          !filters.fieldsOfStudy.some(field => 
            scholarship.fieldOfStudy?.includes(field) || scholarship.fieldOfStudy?.includes('Any')
          )) {
        return false;
      }
      
      // Eligibility filter
      if (filters.eligibility.length > 0 && 
          !filters.eligibility.some(eligibility => 
            scholarship.eligibility?.includes(eligibility)
          )) {
        return false;
      }
      
      return true;
    });
  };
  
  const filteredScholarships = filterScholarships(allScholarships);
  
  // Sort by match score for "matches" tab
  const matchedScholarships = [...filteredScholarships].sort((a, b) => b.matchScore - a.matchScore);
  
  // Sort by deadline (ascending) for "deadlines" tab
  const deadlineScholarships = [...filteredScholarships].sort(
    (a, b) => a.deadlineDate.getTime() - b.deadlineDate.getTime()
  );
  
  // Filter for saved scholarships
  const savedScholarshipsList = filteredScholarships.filter(s => savedScholarships.includes(s.id));
  
  const toggleSaveScholarship = (id: string) => {
    if (savedScholarships.includes(id)) {
      setSavedScholarships(savedScholarships.filter(sid => sid !== id));
      toast({
        title: "Scholarship removed",
        description: "The scholarship has been removed from your saved list."
      });
    } else {
      setSavedScholarships([...savedScholarships, id]);
      toast({
        title: "Scholarship saved",
        description: "The scholarship has been added to your saved list."
      });
    }
  };
  
  return (
    <div className="flex-1">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="matches">Best Matches</TabsTrigger>
          <TabsTrigger value="deadlines">Upcoming Deadlines</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="matches" className="mt-4 space-y-4">
          <div className="text-sm text-muted-foreground">
            Showing {matchedScholarships.length} scholarships matched to your profile
          </div>
          
          {matchedScholarships.length > 0 ? (
            matchedScholarships.map(scholarship => (
              <ScholarshipCard 
                key={scholarship.id} 
                scholarship={scholarship} 
                isSaved={savedScholarships.includes(scholarship.id)}
                onToggleSave={toggleSaveScholarship}
              />
            ))
          ) : (
            <div className="bg-muted/50 p-6 rounded-lg text-center">
              <p className="text-muted-foreground">No matching scholarships found. Try adjusting your filters.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="deadlines" className="mt-4 space-y-4">
          <div className="text-sm text-muted-foreground">
            Showing {deadlineScholarships.length} scholarships by upcoming deadlines
          </div>
          
          {deadlineScholarships.length > 0 ? (
            deadlineScholarships.map(scholarship => (
              <ScholarshipCard 
                key={scholarship.id} 
                scholarship={scholarship}
                isSaved={savedScholarships.includes(scholarship.id)}
                onToggleSave={toggleSaveScholarship}
              />
            ))
          ) : (
            <div className="bg-muted/50 p-6 rounded-lg text-center">
              <p className="text-muted-foreground">No scholarships found with upcoming deadlines.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved" className="mt-4 space-y-4">
          <div className="text-sm text-muted-foreground">
            Showing {savedScholarshipsList.length} saved scholarships
          </div>
          
          {savedScholarshipsList.length > 0 ? (
            savedScholarshipsList.map(scholarship => (
              <ScholarshipCard 
                key={scholarship.id} 
                scholarship={scholarship}
                isSaved={true}
                onToggleSave={toggleSaveScholarship}
              />
            ))
          ) : (
            <div className="bg-muted/50 p-6 rounded-lg text-center">
              <p className="text-muted-foreground">You haven't saved any scholarships yet.</p>
              <p className="text-sm text-muted-foreground mt-2">Save scholarships by clicking the save button on any scholarship card.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ScholarshipCardProps {
  scholarship: Scholarship;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

function ScholarshipCard({ scholarship, isSaved, onToggleSave }: ScholarshipCardProps) {
  return (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{scholarship.title}</h3>
            <p className="text-sm text-muted-foreground">{scholarship.organization}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">${scholarship.amount.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarClock className="h-3 w-3 mr-1" />
              {scholarship.deadline}
            </div>
          </div>
        </div>
        
        <div className="my-3 flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {scholarship.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
          <Badge className="bg-studentwell-teal-500 flex items-center gap-1">
            <UserCheck className="h-3 w-3" />
            {scholarship.matchScore}% Match
          </Badge>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <Button variant="outline" size="sm" className="text-xs">
            <GraduationCap className="h-3 w-3 mr-1" />
            View Details
          </Button>
          <div className="flex gap-2">
            <Button 
              variant={isSaved ? "default" : "outline"}
              size="sm" 
              className={`text-xs ${isSaved ? "bg-studentwell-teal-500 hover:bg-studentwell-teal-600" : ""}`}
              onClick={() => onToggleSave(scholarship.id)}
            >
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button size="sm" className="text-xs">Apply Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
