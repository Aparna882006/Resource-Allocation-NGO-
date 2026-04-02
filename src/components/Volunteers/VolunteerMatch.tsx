import { Sparkles, MapPin, Award, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Volunteer, Report } from '../../types';

interface VolunteerMatchProps {
  report: Report;
  volunteers: Volunteer[];
  onAssign: (volunteer: Volunteer) => void;
}

export default function VolunteerMatch({ report, volunteers, onAssign }: VolunteerMatchProps) {
  // Smart matching algorithm simulation
  const getMatchScore = (volunteer: Volunteer): { score: number; reasons: string[] } => {
    let score = 0;
    const reasons: string[] = [];

    // Skill match (40%)
    const categorySkillMap: Record<string, string[]> = {
      food: ['Food Distribution', 'Cooking', 'Nutrition', 'Logistics'],
      health: ['Medical', 'Healthcare', 'First Aid'],
      education: ['Teaching', 'Education', 'Child Care'],
      rescue: ['Rescue Operations', 'Swimming', 'First Aid'],
      shelter: ['Logistics', 'Coordination', 'Distribution'],
      awareness: ['Community Outreach', 'Public Speaking', 'Awareness'],
    };

    const requiredSkills = categorySkillMap[report.category] || [];
    const matchedSkills = volunteer.skills.filter((s) =>
      requiredSkills.some((rs) => s.toLowerCase().includes(rs.toLowerCase()))
    );

    if (matchedSkills.length > 0) {
      score += 40 * (matchedSkills.length / requiredSkills.length);
      reasons.push(`${matchedSkills[0]} skill match`);
    }

    // Availability (20%)
    if (volunteer.availability === 'available') {
      score += 20;
      reasons.push('Available now');
    } else if (volunteer.availability === 'busy') {
      score += 5;
    }

    // Reliability (25%)
    score += (volunteer.reliabilityScore / 100) * 25;
    if (volunteer.reliabilityScore >= 90) {
      reasons.push(`High reliability (${volunteer.reliabilityScore}%)`);
    }

    // Response time (15%)
    if (volunteer.avgResponseTime <= 15) {
      score += 15;
      reasons.push(`Fast response (${volunteer.avgResponseTime}min avg)`);
    } else if (volunteer.avgResponseTime <= 30) {
      score += 10;
    }

    // Simulate distance calculation
    const distance = (1 + Math.random() * 4).toFixed(1);
    reasons.push(`${distance}km away`);

    return { score: Math.round(score), reasons };
  };

  const rankedVolunteers = volunteers
    .map((v) => ({ volunteer: v, ...getMatchScore(v) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl shadow-sm">
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Volunteer Recommendations</h3>
            <p className="text-sm text-gray-500">
              Smart matching for: <span className="font-medium">{report.title}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {rankedVolunteers.map((match, index) => (
          <div
            key={match.volunteer.id}
            className={`relative p-4 rounded-xl border-2 transition-all hover:shadow-md ${
              index === 0
                ? 'border-indigo-200 bg-indigo-50/50'
                : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            {/* Rank Badge */}
            {index === 0 && (
              <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-lg">
                🏆 Best Match
              </div>
            )}

            <div className="flex items-start gap-4">
              {/* Match Score */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                    index === 0
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
                      : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}
                >
                  {match.score}%
                </div>
                <span className="text-xs text-gray-400 mt-1">Match</span>
              </div>

              {/* Volunteer Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <img
                    src={match.volunteer.avatar}
                    alt={match.volunteer.name}
                    className="w-10 h-10 rounded-lg bg-gray-100"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{match.volunteer.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin size={12} />
                      {match.volunteer.location.area}
                    </div>
                  </div>
                </div>

                {/* Match Reasons - Explainable AI */}
                <div className="mt-3 p-3 bg-white rounded-lg border border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    🤖 AI Explanation:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {match.reasons.map((reason, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Award size={12} className="text-indigo-500" />
                    {match.volunteer.reliabilityScore}% reliable
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle size={12} className="text-green-500" />
                    {match.volunteer.completedTasks} tasks
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-orange-500" />
                    {match.volunteer.avgResponseTime}min avg
                  </span>
                </div>
              </div>

              {/* Assign Button */}
              <button
                onClick={() => onAssign(match.volunteer)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  index === 0
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Assign
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          ✨ Recommendations based on skill match, distance, availability, and reliability score
        </p>
      </div>
    </div>
  );
}
