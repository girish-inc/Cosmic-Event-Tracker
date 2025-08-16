import { useState, useEffect, useCallback } from 'react'
import { fetchNEOs } from '../utils/nasa'
import Header from '../components/Header'
import EventList from '../components/EventList'
import Filter from '../components/Filter'
import LoadingSpinner from '../components/LoadingSpinner'

const Home = () => {
  const [neoData, setNeoData] = useState({})
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [currentStartDate, setCurrentStartDate] = useState(new Date())
  const [showHazardousOnly, setShowHazardousOnly] = useState(false)
  const [sortOrder, setSortOrder] = useState('asc')

  // Load initial NEO data
  const loadNEOs = useCallback(async (startDate, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }
      setError('')

      const data = await fetchNEOs(startDate, 7)
      
      if (isLoadMore) {
        // Merge with existing data
        setNeoData(prevData => ({ ...prevData, ...data }))
      } else {
        // Replace data
        setNeoData(data)
      }
    } catch (err) {
      setError('Failed to load NEO data. Please check your internet connection and try again.')
      console.error('Error loading NEOs:', err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  // Load initial data on component mount
  useEffect(() => {
    loadNEOs(currentStartDate)
  }, [])

  // Handle load more functionality
  const handleLoadMore = () => {
    const nextStartDate = new Date(currentStartDate)
    nextStartDate.setDate(nextStartDate.getDate() + Object.keys(neoData).length)
    setCurrentStartDate(nextStartDate)
    loadNEOs(nextStartDate, true)
  }

  // Handle refresh
  const handleRefresh = () => {
    const today = new Date()
    setCurrentStartDate(today)
    loadNEOs(today, false)
  }

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

  return (
    <div className="min-h-screen bg-primary-950">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Near-Earth Objects Tracker
          </h1>
          <p className="text-primary-300">
            Track asteroids and comets that will make close approaches to Earth
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={handleRefresh}
                className="btn-secondary ml-4"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <Filter
          showHazardousOnly={showHazardousOnly}
          setShowHazardousOnly={setShowHazardousOnly}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {/* NEO Data Summary */}
        {Object.keys(neoData).length > 0 && (
          <div className="card mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Data Summary
                </h3>
                <p className="text-primary-300">
                  Showing {Object.keys(neoData).length} days of NEO data
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={handleRefresh}
                  className="btn-secondary mr-2"
                >
                  🔄 Refresh
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Event List */}
        <EventList
          neoData={neoData}
          showHazardousOnly={showHazardousOnly}
          sortOrder={sortOrder}
        />

        {/* Load More Button */}
        {Object.keys(neoData).length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="btn-primary flex items-center justify-center mx-auto"
            >
              {loadingMore ? (
                <>
                  <LoadingSpinner size="small" className="mr-2" />
                  Loading...
                </>
              ) : (
                'Load Next 7 Days'
              )}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-primary-400 text-sm">
          <p>
            Data provided by{' '}
            <a
              href="https://api.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-300 hover:text-primary-200"
            >
              NASA's Near Earth Object Web Service
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home