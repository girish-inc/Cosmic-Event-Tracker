import EventCard from './EventCard'
import LoadingSpinner from './LoadingSpinner'

const EventList = ({ events, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16 mx-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <p className="text-red-400 text-xl font-semibold mb-2">Error Loading Data</p>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    )
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-16 mx-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <div className="text-blue-400 text-6xl mb-4">🌌</div>
          <p className="text-white text-xl font-semibold mb-2">No Cosmic Events Found</p>
          <p className="text-gray-300">No asteroids match the selected criteria.</p>
        </div>
      </div>
    )
  }

  // Group events by date
  const groupedEvents = events.reduce((acc, event) => {
    const date = event.close_approach_data[0]?.close_approach_date || 'unknown'
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(event)
    return acc
  }, {})

  const sortedDates = Object.keys(groupedEvents).sort((a, b) => new Date(a) - new Date(b))

  return (
    <div className="mx-8 my-6 space-y-12">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card text-center p-6">
          <div className="text-3xl font-bold stats-number mb-2">
            {events.length}
          </div>
          <div className="text-white font-medium uppercase tracking-wider text-sm">Total Objects</div>
        </div>
        <div className="glass-card text-center p-6">
          <div className="text-3xl font-bold stats-number mb-2">
            {events.filter(e => e.is_potentially_hazardous_asteroid).length}
          </div>
          <div className="text-white font-medium uppercase tracking-wider text-sm">Hazardous</div>
        </div>
        <div className="glass-card text-center p-6">
          <div className="text-3xl font-bold stats-number mb-2">
            {sortedDates.length}
          </div>
          <div className="text-white font-medium uppercase tracking-wider text-sm">Active Days</div>
        </div>
      </div>

      {/* Events by Date */}
      {sortedDates.map((date) => {
        const dateEvents = groupedEvents[date]
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })

        return (
          <div key={date} className="space-y-6">
            {/* Date Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-bold text-white">{formattedDate}</h2>
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full font-semibold">
                    {dateEvents.length} {dateEvents.length === 1 ? 'object' : 'objects'}
                  </span>
                  {dateEvents.some(e => e.is_potentially_hazardous_asteroid) && (
                    <span className="bg-red-500 text-white text-sm px-4 py-2 rounded-full font-semibold">
                      ⚠️ {dateEvents.filter(e => e.is_potentially_hazardous_asteroid).length} hazardous
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dateEvents.map((event) => (
                <EventCard key={event.id} neo={event} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default EventList