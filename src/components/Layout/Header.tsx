import { Bell, Search, Plus } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onAddNew?: () => void;
  addNewLabel?: string;
}

export default function Header({ title, subtitle, onAddNew, addNewLabel }: HeaderProps) {
  const [notifications] = useState([
    { id: 1, text: 'New critical report in Ward 12', time: '2 min ago', type: 'critical' },
    { id: 2, text: 'Task completed by Rajesh Kumar', time: '15 min ago', type: 'success' },
    { id: 3, text: 'Duplicate report detected', time: '1 hour ago', type: 'warning' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="lg:pl-0 pl-12">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reports, volunteers..."
              className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Add New Button */}
          {onAddNew && (
            <button
              onClick={onAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">{addNewLabel || 'Add New'}</span>
            </button>
          )}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 transition-colors"
                      style={{
                        borderLeftColor:
                          notif.type === 'critical'
                            ? '#ef4444'
                            : notif.type === 'success'
                            ? '#22c55e'
                            : '#f59e0b',
                      }}
                    >
                      <p className="text-sm text-gray-900">{notif.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
