import EventCard from './EventCard'

const EventList = ({ neoData, showHazardousOnly, sortOrder }) => {
  if (!neoData || Object.keys(neoData).length === 0) {
    return (
      <div className="card text-center">
        <p className="text-primary-300">No NEO data available</p>
      </div>
    )
  }

  // Process and filter NEOs
  const processedData = Object.entries(neoData)
    .map(([date, neos]) => {
      let filteredNeos = neos
      
      // Filter hazardous only if enabled
      if (showHazardousOnly) {
        filteredNeos = neos.filter(neo => neo.is_potentially_hazardous_asteroid)
      }
      
      // Sort by closest approach date
      filteredNeos.sort((a, b) => {
        const dateA = new Date(a.close_approach_data?.[0]?.close_approach_date_full || 0)
        const dateB = new Date(b.close_approach_data?.[0]?.close_approach_date_full || 0)
        
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
      })
      
      return { date, neos: filteredNeos }
    })
    .filter(({ neos }) => neos.length > 0) // Remove dates with no NEOs after filtering
    .sort((a, b) => {
      // Sort dates
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA - dateB
    })

  if (processedData.length === 0) {
    return (
      <div className="card text-center">
        <p className="text-primary-300">
          {showHazardousOnly 
            ? 'No hazardous asteroids found in the current date range'
            : 'No NEO data available'
          }
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {processedData.map(({ date, neos }) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })

        return (
          <div key={date} className="space-y-4">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-white">{formattedDate}</h2>
              <span className="bg-primary-700 text-primary-200 text-sm px-3 py-1 rounded-full">
                {neos.length} {neos.length === 1 ? 'object' : 'objects'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {neos.map((neo) => (
                <EventCard key={neo.id} neo={neo} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default EventList