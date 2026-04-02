import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  Users,
  FileText,
  Clock,
  MapPin,
  Download,
  Star,
  Target,
  Zap,
} from 'lucide-react';
import Header from '../components/Layout/Header';
import { mockAnalytics, mockVolunteers } from '../data/mockData';

export default function Analytics() {
  const impactMetrics = [
    {
      title: 'Response Time Improvement',
      value: '70%',
      description: 'Faster volunteer assignment',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Emergency Speed',
      value: '50%',
      description: 'Improved response rate',
      icon: Clock,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Hotspot Detection',
      value: '85%',
      description: 'Accuracy in early detection',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Task Completion',
      value: '40%',
      description: 'Increase in completion rate',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const monthlyData = [
    { month: 'Jan', reports: 45, resolved: 38, volunteers: 18 },
    { month: 'Feb', reports: 52, resolved: 45, volunteers: 20 },
    { month: 'Mar', reports: 68, resolved: 58, volunteers: 22 },
    { month: 'Apr', reports: 85, resolved: 72, volunteers: 24 },
    { month: 'May', reports: 92, resolved: 80, volunteers: 26 },
    { month: 'Jun', reports: 110, resolved: 95, volunteers: 28 },
  ];

  const responseTimeData = [
    { week: 'W1', time: 35 },
    { week: 'W2', time: 28 },
    { week: 'W3', time: 24 },
    { week: 'W4', time: 18 },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Header title="Analytics" subtitle="Impact reports and performance metrics" />

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {impactMetrics.map((metric) => (
            <div
              key={metric.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}
              >
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              <p className="font-medium text-gray-700 mt-1">{metric.title}</p>
              <p className="text-sm text-gray-500">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Trends */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Monthly Performance</h3>
                  <p className="text-sm text-gray-500">Reports vs Resolution rate</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Download size={14} />
                Export
              </button>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '12px',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="reports" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Response Time Improvement */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Response Time Trend</h3>
                  <p className="text-sm text-gray-500">Average response time (minutes)</p>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="time"
                  stroke="#22c55e"
                  fill="url(#greenGradient)"
                  strokeWidth={3}
                />
                <defs>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Hotspot Areas */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-xl">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Top Affected Areas</h3>
                <p className="text-sm text-gray-500">Most reported regions</p>
              </div>
            </div>

            <div className="space-y-4">
              {mockAnalytics.hotspots.map((hotspot, index) => (
                <div key={hotspot.area} className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      index === 0
                        ? 'bg-red-100 text-red-700'
                        : index === 1
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{hotspot.area}</p>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          hotspot.severity === 'critical'
                            ? 'bg-red-500'
                            : hotspot.severity === 'high'
                            ? 'bg-orange-500'
                            : 'bg-yellow-500'
                        }`}
                        style={{
                          width: `${(hotspot.reports / mockAnalytics.hotspots[0].reports) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">{hotspot.reports}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-xl">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Category Distribution</h3>
                <p className="text-sm text-gray-500">Reports by need type</p>
              </div>
            </div>

            <div className="space-y-4">
              {mockAnalytics.categoryBreakdown.map((cat) => {
                const total = mockAnalytics.categoryBreakdown.reduce((s, c) => s + c.value, 0);
                const percentage = Math.round((cat.value / total) * 100);
                const colors: Record<string, string> = {
                  Food: 'bg-orange-500',
                  Health: 'bg-red-500',
                  Education: 'bg-blue-500',
                  Rescue: 'bg-purple-500',
                  Shelter: 'bg-teal-500',
                  Awareness: 'bg-pink-500',
                };

                return (
                  <div key={cat.name} className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${colors[cat.name] || 'bg-gray-500'}`} />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                        <span className="text-sm text-gray-500">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${colors[cat.name] || 'bg-gray-500'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Volunteers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 rounded-xl">
                <Users className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Top Volunteers</h3>
                <p className="text-sm text-gray-500">This month's performers</p>
              </div>
            </div>

            <div className="space-y-3">
              {mockAnalytics.volunteerLeaderboard.map((vol, index) => (
                <div
                  key={vol.name}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
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
                    src={mockVolunteers[index]?.avatar || ''}
                    alt={vol.name}
                    className="w-8 h-8 rounded-lg bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{vol.name}</p>
                    <p className="text-xs text-gray-500">{vol.tasks} tasks</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={12} fill="currentColor" />
                    <span className="text-sm font-medium">{vol.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Report Card */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Monthly Impact Summary</h2>
              <p className="text-indigo-100 max-w-xl">
                This month, our platform helped resolve {mockAnalytics.resolvedReports} cases,
                deployed {mockAnalytics.activeVolunteers} active volunteers, and reduced average
                response time to {mockAnalytics.avgResponseTime} minutes.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 transition-colors">
                <Download size={18} />
                Download Report
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-colors">
                Share
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-white/20">
            <div>
              <p className="text-4xl font-bold">{mockAnalytics.totalReports}</p>
              <p className="text-indigo-200">Total Reports</p>
            </div>
            <div>
              <p className="text-4xl font-bold">{mockAnalytics.resolvedReports}</p>
              <p className="text-indigo-200">Cases Resolved</p>
            </div>
            <div>
              <p className="text-4xl font-bold">{mockAnalytics.activeVolunteers}</p>
              <p className="text-indigo-200">Active Volunteers</p>
            </div>
            <div>
              <p className="text-4xl font-bold">
                {Math.round((mockAnalytics.resolvedReports / mockAnalytics.totalReports) * 100)}%
              </p>
              <p className="text-indigo-200">Resolution Rate</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
