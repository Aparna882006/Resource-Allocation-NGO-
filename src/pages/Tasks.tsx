import { useState } from 'react';
import { Search, Filter, X, Clock, CheckCircle, Play, AlertTriangle } from 'lucide-react';
import Header from '../components/Layout/Header';
import TaskCard from '../components/Tasks/TaskCard';
import TaskTimeline from '../components/Tasks/TaskTimeline';
import { mockTasks } from '../data/mockData';
import { Task } from '../types';

export default function Tasks() {
  const [tasks, setTasks] = useState(mockTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const priorities = ['all', 'critical', 'high', 'medium', 'low'];
  const statuses = ['all', 'assigned', 'accepted', 'in-progress', 'completed', 'verified'];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleUpdateStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus, updatedAt: new Date() } : t))
    );
  };

  const stats = {
    total: tasks.length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed' || t.status === 'verified').length,
    overdue: tasks.filter((t) => new Date(t.deadline) < new Date() && t.status !== 'verified')
      .length,
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Header title="Tasks" subtitle="Track and manage volunteer assignments" />

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Play size={14} className="text-yellow-500" />
              In Progress
            </p>
            <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <CheckCircle size={14} className="text-green-500" />
              Completed
            </p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <AlertTriangle size={14} className="text-red-500" />
              Overdue
            </p>
            <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
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
                placeholder="Search tasks by title, description, or volunteer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
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

        {/* Task Status Pipeline */}
        <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Task Pipeline</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {statuses.slice(1).map((status) => {
              const count = tasks.filter((t) => t.status === status).length;
              const colors: Record<string, string> = {
                assigned: 'bg-blue-100 text-blue-700 border-blue-200',
                accepted: 'bg-indigo-100 text-indigo-700 border-indigo-200',
                'in-progress': 'bg-yellow-100 text-yellow-700 border-yellow-200',
                completed: 'bg-green-100 text-green-700 border-green-200',
                verified: 'bg-emerald-100 text-emerald-700 border-emerald-200',
              };
              return (
                <div
                  key={status}
                  className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 ${colors[status]} min-w-[120px] text-center`}
                >
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm capitalize">{status.replace('-', ' ')}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTasks.map((task) => (
            <div key={task.id} onClick={() => setSelectedTask(task)} className="cursor-pointer">
              <TaskCard task={task} onUpdateStatus={handleUpdateStatus} />
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks found matching your criteria</p>
          </div>
        )}
      </main>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-sm text-gray-400">#{selectedTask.id}</span>
                  <h2 className="text-xl font-bold text-gray-900">{selectedTask.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Timeline */}
              <TaskTimeline currentStatus={selectedTask.status} />

              {/* Task Details */}
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                  <p className="text-gray-900">{selectedTask.description}</p>
                </div>

                {/* AI Match Info */}
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {selectedTask.matchScore}%
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">AI Match Score</p>
                      <p className="text-sm text-gray-500">{selectedTask.matchReason}</p>
                    </div>
                  </div>
                </div>

                {/* Assigned Volunteer */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <img
                    src={selectedTask.assignedTo.avatar}
                    alt={selectedTask.assignedTo.name}
                    className="w-12 h-12 rounded-xl bg-white"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{selectedTask.assignedTo.name}</p>
                    <p className="text-sm text-gray-500">
                      {selectedTask.assignedTo.completedTasks} tasks completed • ⭐{' '}
                      {selectedTask.assignedTo.rating}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl font-medium hover:bg-indigo-200 transition-colors">
                    Contact
                  </button>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{selectedTask.location}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-medium text-gray-900 flex items-center gap-2">
                      <Clock size={14} />
                      {new Date(selectedTask.deadline).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                  {selectedTask.status !== 'verified' && (
                    <button
                      onClick={() => {
                        const nextStatus: Record<string, Task['status']> = {
                          assigned: 'accepted',
                          accepted: 'in-progress',
                          'in-progress': 'completed',
                          completed: 'verified',
                        };
                        handleUpdateStatus(
                          selectedTask.id,
                          nextStatus[selectedTask.status] || 'verified'
                        );
                        setSelectedTask(null);
                      }}
                      className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Update Status
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
