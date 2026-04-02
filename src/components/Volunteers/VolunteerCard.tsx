import { MapPin, Star, Clock, CheckCircle, Award } from 'lucide-react';
import { Volunteer } from '../../types';

interface VolunteerCardProps {
  volunteer: Volunteer;
  onSelect?: (volunteer: Volunteer) => void;
  selected?: boolean;
}

export default function VolunteerCard({ volunteer, onSelect, selected }: VolunteerCardProps) {
  const getAvailabilityStyle = (status: string) => {
    switch (status) {
      case 'available':
        return { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' };
      case 'busy':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' };
    }
  };

  const style = getAvailabilityStyle(volunteer.availability);

  return (
    <div
      onClick={() => onSelect?.(volunteer)}
      className={`bg-white rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
        selected
          ? 'border-indigo-500 shadow-lg shadow-indigo-100'
          : 'border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={volunteer.avatar}
            alt={volunteer.name}
            className="w-14 h-14 rounded-xl bg-gray-100"
          />
          <span
            className={`absolute -bottom-1 -right-1 w-4 h-4 ${style.dot} rounded-full border-2 border-white`}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900">{volunteer.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-gray-400" />
                <span className="text-sm text-gray-500">{volunteer.location.area}</span>
              </div>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
            >
              {volunteer.availability}
            </span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1 mt-3">
            {volunteer.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-xs font-medium"
              >
                {skill}
              </span>
            ))}
            {volunteer.skills.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-xs">
                +{volunteer.skills.length - 3}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <Award size={14} className="text-indigo-500" />
              <span className="text-sm font-semibold text-gray-900">
                {volunteer.reliabilityScore}%
              </span>
              <span className="text-xs text-gray-400">reliability</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-gray-900">
                {volunteer.rating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-500" />
              <span className="text-sm font-semibold text-gray-900">
                {volunteer.completedTasks}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-gray-400" />
              <span className="text-sm text-gray-600">{volunteer.avgResponseTime}m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
