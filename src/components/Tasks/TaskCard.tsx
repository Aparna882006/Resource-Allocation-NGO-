import {
  Clock,
  MapPin,
  User,
  CheckCircle,
  AlertTriangle,
  Play,
  Camera,
  ExternalLink,
} from 'lucide-react';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onUpdateStatus?: (taskId: string, status: Task['status']) => void;
}

export default function TaskCard({ task, onUpdateStatus }: TaskCardProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'assigned':
        return { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock };
      case 'accepted':
        return { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: CheckCircle };
      case 'in-progress':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Play };
      case 'completed':
        return { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle };
      case 'verified':
        return { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock };
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'border-l-red-500 bg-red-50/50';
      case 'high':
        return 'border-l-orange-500 bg-orange-50/50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50/50';
      default:
        return 'border-l-green-500 bg-green-50/50';
    }
  };

  const statusStyle = getStatusStyle(task.status);
  const StatusIcon = statusStyle.icon;

  const getNextStatus = (): Task['status'] | null => {
    switch (task.status) {
      case 'assigned':
        return 'accepted';
      case 'accepted':
        return 'in-progress';
      case 'in-progress':
        return 'completed';
      case 'completed':
        return 'verified';
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();

  const timeRemaining = () => {
    const now = new Date();
    const deadline = new Date(task.deadline);
    const diff = deadline.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (diff < 0) return 'Overdue';
    if (hours > 24) return `${Math.floor(hours / 24)}d remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden border-l-4 ${getPriorityStyle(
        task.priority
      )}`}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-gray-400">#{task.id}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                  task.priority === 'critical'
                    ? 'border-red-200 bg-red-100 text-red-700'
                    : task.priority === 'high'
                    ? 'border-orange-200 bg-orange-100 text-orange-700'
                    : task.priority === 'medium'
                    ? 'border-yellow-200 bg-yellow-100 text-yellow-700'
                    : 'border-green-200 bg-green-100 text-green-700'
                }`}
              >
                {task.priority}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">{task.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusStyle.bg} ${statusStyle.text}`}
          >
            <StatusIcon size={14} />
            <span className="text-sm font-medium capitalize">{task.status.replace('-', ' ')}</span>
          </div>
        </div>

        {/* Match Score Banner */}
        <div className="mb-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {task.matchScore}%
              </div>
              <span className="text-sm font-medium text-gray-700">AI Match Score</span>
            </div>
            <p className="text-xs text-gray-500 max-w-[200px] truncate">{task.matchReason}</p>
          </div>
        </div>

        {/* Assigned Volunteer */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
          <img
            src={task.assignedTo.avatar}
            alt={task.assignedTo.name}
            className="w-10 h-10 rounded-lg bg-white"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900">{task.assignedTo.name}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <User size={10} />
                {task.assignedTo.completedTasks} tasks
              </span>
              <span className="flex items-center gap-1">
                ⭐ {task.assignedTo.rating}
              </span>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <ExternalLink size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {task.location}
          </span>
          <span
            className={`flex items-center gap-1.5 ${
              timeRemaining() === 'Overdue' ? 'text-red-600 font-medium' : ''
            }`}
          >
            {timeRemaining() === 'Overdue' ? (
              <AlertTriangle size={14} />
            ) : (
              <Clock size={14} />
            )}
            {timeRemaining()}
          </span>
        </div>

        {/* Proof Images */}
        {task.proofImages.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
              <Camera size={12} />
              Completion Proof ({task.proofImages.length})
            </p>
            <div className="flex gap-2">
              {task.proofImages.map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400"
                >
                  <Camera size={20} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        {nextStatus && onUpdateStatus && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => onUpdateStatus(task.id, nextStatus)}
              className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Mark as {nextStatus.replace('-', ' ')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
