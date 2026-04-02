import {
  MapPin,
  Users,
  Clock,
  AlertTriangle,
  Copy,
  User,
  ArrowRight,
  Utensils,
  Heart,
  BookOpen,
  LifeBuoy,
  Home,
  Megaphone,
} from 'lucide-react';
import { Report } from '../../types';

interface ReportCardProps {
  report: Report;
  onView?: (report: Report) => void;
  onAssign?: (report: Report) => void;
}

export default function ReportCard({ report, onView, onAssign }: ReportCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food':
        return Utensils;
      case 'health':
        return Heart;
      case 'education':
        return BookOpen;
      case 'rescue':
        return LifeBuoy;
      case 'shelter':
        return Home;
      case 'awareness':
        return Megaphone;
      default:
        return AlertTriangle;
    }
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'food':
        return { bg: 'bg-orange-100', text: 'text-orange-600' };
      case 'health':
        return { bg: 'bg-red-100', text: 'text-red-600' };
      case 'education':
        return { bg: 'bg-blue-100', text: 'text-blue-600' };
      case 'rescue':
        return { bg: 'bg-purple-100', text: 'text-purple-600' };
      case 'shelter':
        return { bg: 'bg-teal-100', text: 'text-teal-600' };
      case 'awareness':
        return { bg: 'bg-pink-100', text: 'text-pink-600' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  const getSeverityStyle = (severity: string) => {
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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-700';
      case 'assigned':
        return 'bg-blue-100 text-blue-700';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'verified':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const CategoryIcon = getCategoryIcon(report.category);
  const categoryStyle = getCategoryStyle(report.category);

  const getPriorityGradient = (score: number) => {
    if (score >= 90) return 'from-red-500 to-red-600';
    if (score >= 70) return 'from-orange-500 to-orange-600';
    if (score >= 50) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (report.isDuplicate) {
    return (
      <div className="bg-gray-50 rounded-2xl p-5 border-2 border-dashed border-gray-200 opacity-60">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-xl">
            <Copy className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="font-medium text-gray-700 flex items-center gap-2">
              Duplicate Detected
              <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                Merged with #{report.mergedWith}
              </span>
            </p>
            <p className="text-sm text-gray-500">{report.title}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Priority Score */}
          <div className="flex flex-col items-center">
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getPriorityGradient(
                report.priorityScore
              )} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
            >
              {report.priorityScore}
            </div>
            <span className="text-xs text-gray-400 mt-1">Priority</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-gray-400">#{report.id}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getSeverityStyle(
                  report.severity
                )}`}
              >
                {report.severity}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
                  report.status
                )}`}
              >
                {report.status}
              </span>
            </div>

            <h3 className="font-semibold text-gray-900 mt-2 line-clamp-1">{report.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{report.description}</p>

            {/* Category Badge */}
            <div className="flex items-center gap-2 mt-3">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text}`}
              >
                <CategoryIcon size={12} />
                {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-400" />
            {report.location.area}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-gray-400" />
            {report.peopleAffected} affected
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-gray-400" />
            {timeAgo(report.reportedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={14} className="text-gray-400" />
            {report.reportedBy}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          {report.status === 'pending' && onAssign && (
            <button
              onClick={() => onAssign(report)}
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
              Assign Volunteer
              <ArrowRight size={16} />
            </button>
          )}
          <button
            onClick={() => onView?.(report)}
            className={`py-2.5 px-4 rounded-xl font-medium transition-colors flex items-center gap-2 ${
              report.status === 'pending'
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'flex-1 bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            View Details
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
