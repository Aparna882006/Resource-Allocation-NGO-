import { MapPin, AlertTriangle, TrendingUp } from 'lucide-react';

interface Hotspot {
  area: string;
  reports: number;
  severity: string;
}

interface HotspotMapProps {
  hotspots: Hotspot[];
}

export default function HotspotMap({ hotspots }: HotspotMapProps) {
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { bg: 'bg-red-500', ring: 'ring-red-300', text: 'text-red-700' };
      case 'high':
        return { bg: 'bg-orange-500', ring: 'ring-orange-300', text: 'text-orange-700' };
      default:
        return { bg: 'bg-yellow-500', ring: 'ring-yellow-300', text: 'text-yellow-700' };
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-xl">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Crisis Hotspots</h3>
              <p className="text-sm text-gray-500">Areas requiring immediate attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Heatmap Representation */}
      <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="aspect-video relative rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-white">
          {/* Map Grid Background */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-px bg-gray-200">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="bg-gray-50" />
            ))}
          </div>

          {/* Hotspot Markers */}
          {hotspots.map((hotspot, index) => {
            const style = getSeverityStyle(hotspot.severity);
            const positions = [
              { top: '20%', left: '30%' },
              { top: '40%', left: '60%' },
              { top: '60%', left: '25%' },
              { top: '35%', left: '75%' },
              { top: '70%', left: '50%' },
            ];
            const pos = positions[index] || { top: '50%', left: '50%' };

            return (
              <div
                key={hotspot.area}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ top: pos.top, left: pos.left }}
              >
                {/* Pulse Animation */}
                <div
                  className={`absolute w-12 h-12 ${style.bg} opacity-30 rounded-full animate-ping`}
                />
                <div
                  className={`absolute w-16 h-16 ${style.bg} opacity-20 rounded-full animate-pulse`}
                  style={{ animationDelay: '0.5s' }}
                />

                {/* Main Marker */}
                <div
                  className={`relative w-8 h-8 ${style.bg} rounded-full ring-4 ${style.ring} flex items-center justify-center shadow-lg transform group-hover:scale-125 transition-transform`}
                >
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                    <p className="font-semibold">{hotspot.area}</p>
                    <p className="text-gray-300">{hotspot.reports} reports</p>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className="border-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur rounded-lg p-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full" /> Critical
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-orange-500 rounded-full" /> High
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-500 rounded-full" /> Medium
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hotspot List */}
      <div className="p-4 space-y-2">
        {hotspots.slice(0, 3).map((hotspot) => {
          const style = getSeverityStyle(hotspot.severity);
          return (
            <div
              key={hotspot.area}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 ${style.bg} rounded-full`} />
                <span className="font-medium text-gray-900">{hotspot.area}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className={`w-4 h-4 ${style.text}`} />
                <span className={`font-semibold ${style.text}`}>{hotspot.reports}</span>
                <span className="text-gray-400 text-sm">reports</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
