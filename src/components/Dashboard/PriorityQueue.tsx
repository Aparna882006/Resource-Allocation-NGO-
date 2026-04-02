import { AlertTriangle, Clock, Users, MapPin, ArrowRight } from 'lucide-react';
import { Report } from '../../types';

interface PriorityQueueProps {
  reports: Report[];
  onViewReport: (report: Report) => void;
}

export default function PriorityQueue({ reports, onViewReport }: PriorityQueueProps) {
  const sortedReports = [...reports]
    .filter((r) => !r.isDuplicate && r.status === 'pending')
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 5);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getPriorityColor = (score: number) => {
    if (score >= 90) return 'from-red-500 to-red-600';
    if (score >= 70) return 'from-orange-500 to-orange-600';
    if (score >= 50) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Priority Queue</h3>
              <p className="text-sm text-gray-500">Urgent cases needing attention</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            {sortedReports.length} Pending
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {sortedReports.map((report) => (
          <div
            key={report.id}
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onViewReport(report)}
          >
            <div className="flex items-start gap-4">
              {/* Priority Score */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getPriorityColor(
                    report.priorityScore
                  )} flex items-center justify-center text-white font-bold shadow-lg`}
                >
                  {report.priorityScore}
                </div>
                <span className="text-xs text-gray-400 mt-1">Score</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-gray-900 truncate">{report.title}</h4>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(
                      report.severity
                    )}`}
                  >
                    {report.severity}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1 line-clamp-1">{report.description}</p>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {report.location.area}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {report.peopleAffected} affected
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(report.reportedAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              {/* Action */}
              <button className="p-2 hover:bg-indigo-100 rounded-lg transition-colors group">
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <button className="w-full py-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          View All Reports →
        </button>
      </div>
    </div>
  );
}
