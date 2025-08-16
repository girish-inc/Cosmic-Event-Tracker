import { Link } from 'react-router-dom'
import { getAverageDiameter, formatCloseApproachDate } from '../utils/nasa'

const EventCard = ({ neo }) => {
  const averageDiameter = getAverageDiameter(neo)
  const closeApproach = neo.close_approach_data?.[0]
  const isHazardous = neo.is_potentially_hazardous_asteroid

  return (
    <div className="card hover:bg-primary-800 transition-colors duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white truncate pr-2">
          {neo.name}
        </h3>
        <div className="flex items-center space-x-2 flex-shrink-0">
          {isHazardous && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              ⚠️ Hazardous
            </span>
          )}
          <span className="bg-primary-700 text-primary-200 text-xs px-2 py-1 rounded-full">
            {averageDiameter} km
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-primary-300">
        <div className="flex justify-between">
          <span>Diameter (avg):</span>
          <span className="text-white">{averageDiameter} km</span>
        </div>
        
        {closeApproach && (
          <>
            <div className="flex justify-between">
              <span>Closest Approach:</span>
              <span className="text-white">
                {formatCloseApproachDate(closeApproach.close_approach_date_full)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Miss Distance:</span>
              <span className="text-white">
                {parseFloat(closeApproach.miss_distance.kilometers).toLocaleString()} km
              </span>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-primary-700">
        <Link
          to={`/event/${neo.id}`}
          className="text-primary-400 hover:text-primary-300 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}

export default EventCard