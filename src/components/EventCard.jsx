import { Link } from 'react-router-dom';
import { getAverageDiameter, formatCloseApproachDate } from '../utils/nasa';

function EventCard({ neo }) {
  const averageDiameter = getAverageDiameter(neo);
  const closeApproachDate = formatCloseApproachDate(neo.close_approach_data[0]?.close_approach_date);
  const missDistance = neo.close_approach_data[0]?.miss_distance?.kilometers;

  return (
    <div className="glass-card p-6 m-4 text-white">
      {/* Header with status indicator */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">
          {neo.name}
        </h3>
        <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
          neo.is_potentially_hazardous_asteroid 
            ? 'text-white' 
            : 'text-white'
        }`} style={{backgroundColor: neo.is_potentially_hazardous_asteroid ? '#EF4444' : '#22C55E'}}>
          {neo.is_potentially_hazardous_asteroid ? '⚠️ Hazardous' : '✅ Safe'}
        </div>
      </div>
      
      {/* Data grid */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center p-3 rounded-lg border" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255, 255, 255, 0.1)'}}>
          <span className="text-gray-200 font-semibold">Diameter</span>
          <span className="text-white font-bold">{averageDiameter} km</span>
        </div>
        
        <div className="flex justify-between items-center p-3 rounded-lg border" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255, 255, 255, 0.1)'}}>
          <span className="text-gray-200 font-semibold">Closest Approach</span>
          <span className="text-white font-bold">{closeApproachDate}</span>
        </div>
        
        {missDistance && (
          <div className="flex justify-between items-center p-3 rounded-lg border" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255, 255, 255, 0.1)'}}>
            <span className="text-gray-200 font-semibold">Miss Distance</span>
            <span className="text-white font-bold">{parseFloat(missDistance).toLocaleString()} km</span>
          </div>
        )}
      </div>
      
      {/* Action button */}
      <div className="pt-4 border-t" style={{borderColor: 'rgba(255, 255, 255, 0.1)'}}>
        <Link 
          to={`/event/${neo.id}`}
          className="underline w-full text-center block font-medium transition-colors"
          style={{color: '#6B46C1'}}
          onMouseEnter={(e) => e.target.style.color = '#553C9A'}
          onMouseLeave={(e) => e.target.style.color = '#6B46C1'}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;