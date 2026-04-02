import { useState } from 'react';
import { Search, Filter, Plus, X, AlertTriangle, Copy, CheckCircle } from 'lucide-react';
import Header from '../components/Layout/Header';
import ReportCard from '../components/Reports/ReportCard';
import VolunteerMatch from '../components/Volunteers/VolunteerMatch';
import { mockReports, mockVolunteers } from '../data/mockData';
import { Report } from '../types';

export default function Reports() {
  const [reports, setReports] = useState(mockReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const categories = ['all', 'food', 'health', 'education', 'rescue', 'shelter', 'awareness'];
  const statuses = ['all', 'pending', 'assigned', 'in-progress', 'completed', 'verified'];

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const duplicateCount = reports.filter((r) => r.isDuplicate).length;

  const handleAssign = (report: Report) => {
    setSelectedReport(report);
    setShowAssignModal(true);
  };

  const handleAssignVolunteer = () => {
    if (selectedReport) {
      setReports((prev) =>
        prev.map((r) => (r.id === selectedReport.id ? { ...r, status: 'assigned' as const } : r))
      );
    }
    setShowAssignModal(false);
    setSelectedReport(null);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Header
        title="Reports"
        subtitle="Manage community reports and cases"
        onAddNew={() => setShowAddModal(true)}
        addNewLabel="New Report"
      />

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Total Reports</p>
            <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <AlertTriangle size={14} className="text-red-500" />
              Pending Critical
            </p>
            <p className="text-2xl font-bold text-red-600">
              {reports.filter((r) => r.status === 'pending' && r.severity === 'critical').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Copy size={14} className="text-yellow-500" />
              Duplicates Detected
            </p>
            <p className="text-2xl font-bold text-yellow-600">{duplicateCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <CheckCircle size={14} className="text-green-500" />
              Resolved
            </p>
            <p className="text-2xl font-bold text-green-600">
              {reports.filter((r) => r.status === 'completed' || r.status === 'verified').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports by title, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onView={() => setSelectedReport(report)}
              onAssign={handleAssign}
            />
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No reports found matching your criteria</p>
          </div>
        )}
      </main>

      {/* Add Report Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Report</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Brief description of the issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Detailed description of the situation"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Food</option>
                      <option>Health</option>
                      <option>Education</option>
                      <option>Rescue</option>
                      <option>Shelter</option>
                      <option>Awareness</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Severity
                    </label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Critical</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ward, Area, City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    People Affected
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Estimated number"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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
                  <X size={20} />
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
