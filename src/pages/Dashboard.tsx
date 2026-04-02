import { useState } from 'react';
import {
  FileText,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';
import Header from '../components/Layout/Header';
import StatsCard from '../components/Dashboard/StatsCard';
import PriorityQueue from '../components/Dashboard/PriorityQueue';
import HotspotMap from '../components/Dashboard/HotspotMap';
import TrendChart from '../components/Dashboard/TrendChart';
import CategoryChart from '../components/Dashboard/CategoryChart';
import { mockReports, mockAnalytics, mockVolunteers } from '../data/mockData';
import { Report } from '../types';
import VolunteerMatch from '../components/Volunteers/VolunteerMatch';

export default function Dashboard() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const stats = [
    {
      title: 'Total Reports',
      value: mockAnalytics.totalReports,
      change: '+12% from last week',
      changeType: 'positive' as const,
      icon: FileText,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
    {
      title: 'Active Volunteers',
      value: mockAnalytics.activeVolunteers,
      change: '+3 new this week',
      changeType: 'positive' as const,
      icon: Users,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
    },
    {
      title: 'Resolved Cases',
      value: mockAnalytics.resolvedReports,
      change: '72% resolution rate',
      changeType: 'positive' as const,
      icon: CheckCircle,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
    },
    {
      title: 'Avg Response Time',
      value: `${mockAnalytics.avgResponseTime}m`,
      change: '-5m improvement',
      changeType: 'positive' as const,
      icon: Clock,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
    },
  ];

  const pendingCritical = mockReports.filter(
    (r) => !r.isDuplicate && r.status === 'pending' && r.severity === 'critical'
  ).length;

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setShowAssignModal(true);
  };

  const handleAssignVolunteer = () => {
    setShowAssignModal(false);
    setSelectedReport(null);
    // In real app, this would update the backend
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Header
        title="Dashboard"
        subtitle="Smart Resource Allocation & Volunteer Coordination"
      />

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        {/* Alert Banner */}
        {pendingCritical > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl text-white flex items-center gap-4 shadow-lg">
            <div className="p-2 bg-white/20 rounded-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">
                {pendingCritical} Critical Cases Need Immediate Attention
              </p>
              <p className="text-sm text-white/80">
                Ward 12 flagged as hotspot with 28 reports in last 48 hours
              </p>
            </div>
            <button className="px-4 py-2 bg-white text-red-600 rounded-xl font-medium hover:bg-white/90 transition-colors">
              View Now
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Priority Queue - Takes 2 columns */}
          <div className="xl:col-span-2">
            <PriorityQueue reports={mockReports} onViewReport={handleViewReport} />
          </div>

          {/* Hotspot Map */}
          <div>
            <HotspotMap hotspots={mockAnalytics.hotspots} />
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <TrendChart data={mockAnalytics.weeklyTrends} />
          <CategoryChart data={mockAnalytics.categoryBreakdown} />
        </div>

        {/* Quick Stats */}
        <div className="mt-6 p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6" />
            <h3 className="text-xl font-bold">Impact Metrics</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-3xl font-bold">70%</p>
              <p className="text-indigo-200 text-sm">Faster Volunteer Assignment</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50%</p>
              <p className="text-indigo-200 text-sm">Improved Response Speed</p>
            </div>
            <div>
              <p className="text-3xl font-bold">85%</p>
              <p className="text-indigo-200 text-sm">Hotspot Early Detection</p>
            </div>
            <div>
              <p className="text-3xl font-bold">40%</p>
              <p className="text-indigo-200 text-sm">Higher Completion Rate</p>
            </div>
          </div>
        </div>
      </main>

      {/* Assignment Modal */}
      {showAssignModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Assign Volunteer</h2>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
              <VolunteerMatch
                report={selectedReport}
                volunteers={mockVolunteers}
                onAssign={handleAssignVolunteer}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
