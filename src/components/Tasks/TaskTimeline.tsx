import { CheckCircle, Circle, Clock, Play, Shield } from 'lucide-react';

interface TimelineStep {
  status: string;
  label: string;
  time?: string;
  completed: boolean;
  current: boolean;
}

interface TaskTimelineProps {
  currentStatus: string;
}

export default function TaskTimeline({ currentStatus }: TaskTimelineProps) {
  const statusOrder = ['assigned', 'accepted', 'in-progress', 'completed', 'verified'];
  const currentIndex = statusOrder.indexOf(currentStatus);

  const steps: TimelineStep[] = [
    {
      status: 'assigned',
      label: 'Assigned',
      time: currentIndex >= 0 ? '2:30 PM' : undefined,
      completed: currentIndex > 0,
      current: currentIndex === 0,
    },
    {
      status: 'accepted',
      label: 'Accepted',
      time: currentIndex >= 1 ? '2:35 PM' : undefined,
      completed: currentIndex > 1,
      current: currentIndex === 1,
    },
    {
      status: 'in-progress',
      label: 'In Progress',
      time: currentIndex >= 2 ? '2:45 PM' : undefined,
      completed: currentIndex > 2,
      current: currentIndex === 2,
    },
    {
      status: 'completed',
      label: 'Completed',
      time: currentIndex >= 3 ? '4:15 PM' : undefined,
      completed: currentIndex > 3,
      current: currentIndex === 3,
    },
    {
      status: 'verified',
      label: 'Verified',
      time: currentIndex >= 4 ? '4:30 PM' : undefined,
      completed: currentIndex >= 4,
      current: currentIndex === 4,
    },
  ];

  const getIcon = (step: TimelineStep) => {
    if (step.completed) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    if (step.current) {
      switch (step.status) {
        case 'assigned':
          return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />;
        case 'accepted':
          return <CheckCircle className="w-5 h-5 text-indigo-500 animate-pulse" />;
        case 'in-progress':
          return <Play className="w-5 h-5 text-yellow-500 animate-pulse" />;
        case 'completed':
          return <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />;
        case 'verified':
          return <Shield className="w-5 h-5 text-emerald-500 animate-pulse" />;
        default:
          return <Circle className="w-5 h-5 text-gray-300" />;
      }
    }
    return <Circle className="w-5 h-5 text-gray-300" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-6">Task Progress</h3>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-indigo-500 transition-all duration-500"
            style={{ width: `${(currentIndex / (statusOrder.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => (
            <div key={step.status} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                  step.completed
                    ? 'bg-green-100'
                    : step.current
                    ? 'bg-indigo-100 ring-4 ring-indigo-50'
                    : 'bg-gray-100'
                }`}
              >
                {getIcon(step)}
              </div>
              <p
                className={`mt-2 text-xs font-medium ${
                  step.completed || step.current ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.label}
              </p>
              {step.time && <p className="text-xs text-gray-400">{step.time}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
