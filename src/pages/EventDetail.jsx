import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchNEODetails, getAverageDiameter, formatCloseApproachDate } from '../utils/nasa'
import LoadingSpinner from '../components/LoadingSpinner'
import Header from '../components/Header'

const EventDetail = () => {
  const { id } = useParams()
  const [neo, setNeo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadNEODetails = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await fetchNEODetails(id)
        setNeo(data)
      } catch (err) {
        setError('Failed to load NEO details. Please try again.')
        console.error('Error loading NEO details:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadNEODetails()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-950">
        <Header />
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner size="large" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-950">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="card text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!neo) {
    return (
      <div className="min-h-screen bg-primary-950">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="card text-center">
            <p className="text-primary-300 mb-4">NEO not found</p>
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const averageDiameter = getAverageDiameter(neo)
  const isHazardous = neo.is_potentially_hazardous_asteroid

  return (
    <div className="min-h-screen bg-primary-950">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-primary-400 hover:text-primary-300 flex items-center">
            ← Back to Home
          </Link>
        </div>

        <div className="card">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-white mb-2">{neo.name}</h1>
              <p className="text-primary-300">NEO Reference ID: {neo.neo_reference_id}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {isHazardous && (
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                  ⚠️ Potentially Hazardous
                </span>
              )}
              <span className="bg-primary-700 text-primary-200 px-3 py-1 rounded-full text-sm">
                {averageDiameter} km diameter
              </span>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Basic Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-primary-300">Absolute Magnitude:</span>
                  <span className="text-white">{neo.absolute_magnitude_h}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-300">Potentially Hazardous:</span>
                  <span className={isHazardous ? 'text-red-400' : 'text-green-400'}>
                    {isHazardous ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Size Estimates</h3>
              <div className="space-y-3">
                {neo.estimated_diameter?.kilometers && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-primary-300">Min Diameter:</span>
                      <span className="text-white">
                        {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} km
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-300">Max Diameter:</span>
                      <span className="text-white">
                        {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-300">Average Diameter:</span>
                      <span className="text-white">{averageDiameter} km</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Close Approach Data */}
          {neo.close_approach_data && neo.close_approach_data.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Close Approach Data</h3>
              <div className="space-y-4">
                {neo.close_approach_data.map((approach, index) => (
                  <div key={index} className="bg-primary-800 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <span className="text-primary-300 block">Date & Time:</span>
                        <span className="text-white">
                          {formatCloseApproachDate(approach.close_approach_date_full)}
                        </span>
                      </div>
                      <div>
                        <span className="text-primary-300 block">Miss Distance:</span>
                        <span className="text-white">
                          {parseFloat(approach.miss_distance.kilometers).toLocaleString()} km
                        </span>
                      </div>
                      <div>
                        <span className="text-primary-300 block">Relative Velocity:</span>
                        <span className="text-white">
                          {parseFloat(approach.relative_velocity.kilometers_per_hour).toLocaleString()} km/h
                        </span>
                      </div>
                      <div>
                        <span className="text-primary-300 block">Orbiting Body:</span>
                        <span className="text-white">{approach.orbiting_body}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Links */}
          <div className="border-t border-primary-700 pt-6">
            <h3 className="text-xl font-semibold text-white mb-4">External Resources</h3>
            <div className="flex flex-wrap gap-4">
              {neo.nasa_jpl_url && (
                <a
                  href={neo.nasa_jpl_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View on NASA JPL →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail