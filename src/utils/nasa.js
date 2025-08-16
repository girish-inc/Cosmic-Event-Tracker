const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1'

// Format date to YYYY-MM-DD
const formatDate = (date) => {
  return date.toISOString().split('T')[0]
}

// Get date range for API calls
const getDateRange = (startDate, days = 7) => {
  // Use current date if no startDate provided
  const start = startDate ? new Date(startDate) : new Date()
  const end = new Date(start)
  end.setDate(start.getDate() + days - 1)
  
  return {
    start_date: formatDate(start),
    end_date: formatDate(end)
  }
}

// Fetch NEOs for a date range
export const fetchNEOs = async (startDate, days = 7) => {
  try {
    const { start_date, end_date } = getDateRange(startDate, days)
    const url = `${BASE_URL}/feed?start_date=${start_date}&end_date=${end_date}&api_key=${NASA_API_KEY}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Flatten the near_earth_objects object into a single array
    const neosByDate = data.near_earth_objects
    const allNeos = []
    
    for (const date in neosByDate) {
      allNeos.push(...neosByDate[date])
    }
    
    return allNeos
  } catch (error) {
    console.error('Error fetching NEOs:', error)
    throw error
  }
}

// Fetch detailed NEO information by ID
export const fetchNEODetails = async (neoId) => {
  try {
    const url = `${BASE_URL}/neo/${neoId}?api_key=${NASA_API_KEY}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching NEO details:', error)
    throw error
  }
}

// Helper function to get average diameter in kilometers
export const getAverageDiameter = (neo) => {
  const diameter = neo.estimated_diameter?.kilometers
  if (!diameter) return 'Unknown'
  
  const avg = (diameter.estimated_diameter_min + diameter.estimated_diameter_max) / 2
  return avg.toFixed(2)
}

// Helper function to format close approach date
export const formatCloseApproachDate = (dateString) => {
  if (!dateString) return 'Unknown'
  
  const date = new Date(dateString)
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}