import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNEODetails, getAverageDiameter, formatCloseApproachDate } from '../utils/nasa';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';

function EventDetail() {
  const { id } = useParams();
  const [neo, setNeo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadNEODetails = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchNEODetails(id);
        setNeo(data);
      } catch (err) {
        setError('Failed to load NEO details. Please try again.');
        console.error('Error loading NEO details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadNEODetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 flex justify-center items-center h-96">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 max-w-6xl mx-auto px-4 py-8">
          <div className="rounded-lg shadow-lg p-8 text-center text-white" style={{backgroundColor: 'rgba(31, 41, 55, 0.8)'}}>
            <p className="text-red-400 mb-4 text-lg font-medium">{error}</p>
            <Link to="/" className="text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2" style={{backgroundColor: '#6B46C1'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#553C9A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#6B46C1'}>
              <span>←</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!neo) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 max-w-6xl mx-auto px-4 py-8">
          <div className="rounded-lg shadow-lg p-8 text-center text-white" style={{backgroundColor: 'rgba(31, 41, 55, 0.8)'}}>
            <p className="text-gray-200 mb-4 text-lg font-medium">NEO not found</p>
            <Link to="/" className="text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2" style={{backgroundColor: '#6B46C1'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#553C9A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#6B46C1'}>
              <span>←</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const averageDiameter = getAverageDiameter(neo);
  const isHazardous = neo.is_potentially_hazardous_asteroid;

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-20 max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="transition-colors flex items-center text-lg font-medium group text-white" style={{color: '#6B46C1'}} onMouseEnter={(e) => e.target.style.color = '#553C9A'} onMouseLeave={(e) => e.target.style.color = '#6B46C1'}>
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span className="ml-2">Back to Home</span>
          </Link>
        </div>

        <div className="rounded-lg shadow-lg p-8 text-white" style={{backgroundColor: 'rgba(31, 41, 55, 0.8)'}}>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-4xl font-bold text-white mb-3 tracking-wide">{neo.name}</h1>
              <p className="text-gray-200 text-lg font-medium">NEO Reference ID: <span style={{color: '#6B46C1'}}>{neo.neo_reference_id}</span></p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {isHazardous && (
                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ⚠️ Potentially Hazardous
                </span>
              )}
              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                 🌍 {averageDiameter} km diameter
               </span>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span style={{color: '#6B46C1'}}>📊</span>
                  Basic Information
                </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg border" style={{backgroundColor: 'rgba(55, 65, 81, 0.6)', borderColor: 'rgba(75, 85, 99, 0.6)'}}>
                    <span className="text-gray-200 font-medium">Absolute Magnitude:</span>
                    <span className="text-white font-semibold">{neo.absolute_magnitude_h}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border" style={{backgroundColor: 'rgba(55, 65, 81, 0.6)', borderColor: 'rgba(75, 85, 99, 0.6)'}}>
                    <span className="text-gray-200 font-medium">Potentially Hazardous:</span>
                    <span className={`font-semibold ${isHazardous ? 'text-red-400' : 'text-green-400'}`}>
                      {isHazardous ? 'Yes ⚠️' : 'No ✅'}
                    </span>
                  </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span style={{color: '#6B46C1'}}>📏</span>
                  Size Estimates
                </h3>
              <div className="space-y-4">
                {neo.estimated_diameter?.kilometers && (
                  <>
                    <div className="flex justify-between items-center p-3 rounded-lg border" style={{backgroundColor: 'rgba(55, 65, 81, 0.6)', borderColor: 'rgba(75, 85, 99, 0.6)'}}>
                        <span className="text-gray-200 font-medium">Min Diameter:</span>
                        <span className="text-white font-semibold">
                          {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} km
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg border" style={{backgroundColor: 'rgba(55, 65, 81, 0.6)', borderColor: 'rgba(75, 85, 99, 0.6)'}}>
                        <span className="text-gray-200 font-medium">Max Diameter:</span>
                        <span className="text-white font-semibold">
                          {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg border" style={{backgroundColor: 'rgba(55, 65, 81, 0.6)', borderColor: 'rgba(75, 85, 99, 0.6)'}}>
                         <span className="text-gray-200 font-medium">Average Diameter:</span>
                         <span className="font-semibold" style={{color: '#6B46C1'}}>{averageDiameter} km</span>
                       </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Close Approach Data */}
          {neo.close_approach_data && neo.close_approach_data.length > 0 && (
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span style={{color: '#6B46C1'}}>🚀</span>
                Close Approach Data
              </h3>
              <div className="space-y-6">
                {neo.close_approach_data.slice(0, 3).map((approach, index) => (
                  <div key={index} className="rounded-lg p-6 border transition-all duration-300" style={{backgroundColor: 'rgba(55, 65, 81, 0.6)', borderColor: 'rgba(75, 85, 99, 0.6)'}}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center md:text-left">
                        <span className="text-gray-200 font-medium text-sm uppercase tracking-wide">📅 Date:</span>
                        <p className="text-white font-semibold text-lg mt-1">
                          {formatCloseApproachDate(approach.close_approach_date_full)}
                        </p>
                      </div>
                      <div className="text-center md:text-left">
                        <span className="text-gray-200 font-medium text-sm uppercase tracking-wide">⚡ Velocity:</span>
                        <p className="font-semibold text-lg mt-1" style={{color: '#6B46C1'}}>
                          {parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(0)} km/h
                        </p>
                      </div>
                      <div className="text-center md:text-left">
                        <span className="text-gray-200 font-medium text-sm uppercase tracking-wide">🎯 Miss Distance:</span>
                        <p className="text-green-400 font-semibold text-lg mt-1">
                          {parseFloat(approach.miss_distance.kilometers).toFixed(0)} km
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Links */}
          <div className="border-t pt-8" style={{borderColor: 'rgba(75, 85, 99, 0.6)'}}>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span style={{color: '#6B46C1'}}>🔗</span>
              External Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href={`https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=${neo.neo_reference_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors" style={{backgroundColor: 'rgba(107, 70, 193, 0.2)'}}>
                    <span className="text-xl" style={{color: '#6B46C1'}}>🌌</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">NASA JPL Database</h4>
                    <p className="text-gray-200 text-sm">View detailed orbital data</p>
                  </div>
                </div>
              </a>
              <a
                href={`https://cneos.jpl.nasa.gov/ca/`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-6 border transition-all duration-300 group"
                style={{backgroundColor: 'rgba(55, 65, 81, 0.6)', borderColor: 'rgba(75, 85, 99, 0.6)'}}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors" style={{backgroundColor: 'rgba(107, 70, 193, 0.2)'}}>
                    <span className="text-xl" style={{color: '#6B46C1'}}>📊</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">CNEOS Close Approaches</h4>
                    <p className="text-gray-200 text-sm">Browse all close approaches</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;