import { useState } from 'react';
import { Search, Filter, UserPlus, X, Award, Star, CheckCircle, Clock } from 'lucide-react';
import Header from '../components/Layout/Header';
import VolunteerCard from '../components/Volunteers/VolunteerCard';
import { mockVolunteers } from '../data/mockData';
import { Volunteer } from '../types';

export default function Volunteers() {
  const [volunteers] = useState(mockVolunteers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const availabilities = ['all', 'available', 'busy', 'offline'];
  const allSkills = [...new Set(volunteers.flatMap((v) => v.skills))];

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch =
      volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.location.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesAvailability =
      selectedAvailability === 'all' || volunteer.availability === selectedAvailability;
    const matchesSkill =
      selectedSkill === 'all' ||
      volunteer.skills.some((s) => s.toLowerCase().includes(selectedSkill.toLowerCase()));

    return matchesSearch && matchesAvailability && matchesSkill;
  });

  const stats = {
    total: volunteers.length,
    available: volunteers.filter((v) => v.availability === 'available').length,
    avgReliability: Math.round(
      volunteers.reduce((sum, v) => sum + v.reliabilityScore, 0) / volunteers.length
    ),
    totalTasks: volunteers.reduce((sum, v) => sum + v.completedTasks, 0),
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Header
        title="Volunteers"
        subtitle="Manage and assign volunteers"
        onAddNew={() => setShowAddModal(true)}
        addNewLabel="Add Volunteer"
      />

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Total Volunteers</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Available Now
            </p>
            <p className="text-2xl font-bold text-green-600">{stats.available}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Award size={14} className="text-indigo-500" />
              Avg Reliability
            </p>
            <p className="text-2xl font-bold text-indigo-600">{stats.avgReliability}%</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <CheckCircle size={14} className="text-green-500" />
              Total Tasks Done
            </p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
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
                placeholder="Search volunteers by name, location, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Availability Filter */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {availabilities.map((avail) => (
                  <option key={avail} value={avail}>
                    {avail.charAt(0).toUpperCase() + avail.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Filter */}
            <div>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Skills</option>
                {allSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Volunteers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredVolunteers.map((volunteer) => (
            <VolunteerCard
              key={volunteer.id}
              volunteer={volunteer}
              onSelect={setSelectedVolunteer}
              selected={selectedVolunteer?.id === volunteer.id}
            />
          ))}
        </div>

        {filteredVolunteers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No volunteers found matching your criteria</p>
          </div>
        )}

        {/* Leaderboard */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-orange-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-xl">
                <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Volunteer Leaderboard</h3>
                <p className="text-sm text-gray-500">Top performers this month</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {[...volunteers]
              .sort((a, b) => b.completedTasks - a.completedTasks)
              .slice(0, 5)
              .map((volunteer, index) => (
                <div
                  key={volunteer.id}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                      index === 0
                        ? 'bg-yellow-100 text-yellow-700'
                        : index === 1
                        ? 'bg-gray-200 text-gray-700'
                        : index === 2
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </div>
                  <img
                    src={volunteer.avatar}
                    alt={volunteer.name}
                    className="w-10 h-10 rounded-lg bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{volunteer.name}</p>
                    <p className="text-sm text-gray-500">{volunteer.skills[0]}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{volunteer.completedTasks}</p>
                    <p className="text-xs text-gray-500">tasks</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="font-medium">{volunteer.rating}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>

      {/* Add Volunteer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Volunteer</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter volunteer name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ward / Area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills (Select multiple)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.slice(0, 8).map((skill) => (
                      <label
                        key={skill}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors"
                      >
                        <input type="checkbox" className="rounded text-indigo-600" />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
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
                    <UserPlus size={18} />
                    Add Volunteer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Volunteer Detail Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Volunteer Profile</h2>
                <button
                  onClick={() => setSelectedVolunteer(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="text-center mb-6">
                <img
                  src={selectedVolunteer.avatar}
                  alt={selectedVolunteer.name}
                  className="w-24 h-24 rounded-2xl mx-auto bg-gray-100 mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">{selectedVolunteer.name}</h3>
                <p className="text-gray-500">{selectedVolunteer.location.area}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-indigo-50 rounded-xl">
                  <Award className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">
                    {selectedVolunteer.reliabilityScore}%
                  </p>
                  <p className="text-xs text-gray-500">Reliability</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-xl">
                  <Star className="w-5 h-5 text-yellow-600 mx-auto mb-1" fill="currentColor" />
                  <p className="text-lg font-bold text-gray-900">{selectedVolunteer.rating}</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">
                    {selectedVolunteer.completedTasks}
                  </p>
                  <p className="text-xs text-gray-500">Tasks</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedVolunteer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Avg Response Time: {selectedVolunteer.avgResponseTime} minutes
                    </p>
                    <p className="text-sm text-gray-500">
                      Verified Tasks: {selectedVolunteer.verifiedTasks}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
