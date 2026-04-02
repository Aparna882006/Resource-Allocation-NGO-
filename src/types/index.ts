export interface Report {
  id: string;
  title: string;
  description: string;
  category: 'food' | 'health' | 'education' | 'rescue' | 'shelter' | 'awareness';
  location: {
    area: string;
    ward: string;
    lat: number;
    lng: number;
  };
  severity: 'critical' | 'high' | 'medium' | 'low';
  urgency: number; // 1-10
  peopleAffected: number;
  priorityScore: number; // 0-100
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'verified';
  reportedBy: string;
  reportedAt: Date;
  isDuplicate: boolean;
  mergedWith?: string;
  assignedVolunteer?: string;
  proofImages?: string[];
}

export interface Volunteer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  skills: string[];
  location: {
    area: string;
    lat: number;
    lng: number;
  };
  availability: 'available' | 'busy' | 'offline';
  reliabilityScore: number; // 0-100
  completedTasks: number;
  avgResponseTime: number; // in minutes
  rating: number; // 1-5
  verifiedTasks: number;
  joinedAt: Date;
}

export interface Task {
  id: string;
  reportId: string;
  title: string;
  description: string;
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'assigned' | 'accepted' | 'in-progress' | 'completed' | 'verified';
  assignedTo: Volunteer;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
  location: string;
  proofImages: string[];
  matchScore: number;
  matchReason: string;
}

export interface VolunteerRecommendation {
  volunteer: Volunteer;
  matchScore: number;
  reasons: {
    skillMatch: number;
    distance: number;
    availability: boolean;
    reliabilityScore: number;
  };
  explanation: string;
}

export interface AnalyticsData {
  totalReports: number;
  resolvedReports: number;
  activeVolunteers: number;
  avgResponseTime: number;
  categoryBreakdown: { name: string; value: number }[];
  weeklyTrends: { day: string; reports: number; resolved: number }[];
  hotspots: { area: string; reports: number; severity: string }[];
  volunteerLeaderboard: { name: string; tasks: number; rating: number }[];
}
