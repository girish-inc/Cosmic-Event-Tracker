import { useState, useEffect } from 'react';
import { fetchNEOs } from '../utils/nasa';
import EventList from '../components/EventList';
import Filter from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';

function Home() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [filters, setFilters] = useState({
    hazardous: 'all',
    sortBy: 'date',
    minDiameter: '',
    maxDiameter: ''
  });

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [events, filters]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchNEOs();
      setEvents(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('Failed to load asteroid data. Please try again later.');
      setEvents([]);
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    if (!Array.isArray(events)) {
      setFilteredEvents([]);
      return;
    }
    
    let filtered = [...events];

    // Filter by hazardous status
    if (filters.hazardous !== 'all') {
      const isHazardous = filters.hazardous === 'true';
      filtered = filtered.filter(event => event.is_potentially_hazardous_asteroid === isHazardous);
    }

    // Filter by diameter
    if (filters.minDiameter) {
      const minDiam = parseFloat(filters.minDiameter);
      filtered = filtered.filter(event => {
        const avgDiameter = (event.estimated_diameter.kilometers.estimated_diameter_min + 
                           event.estimated_diameter.kilometers.estimated_diameter_max) / 2;
        return avgDiameter >= minDiam;
      });
    }

    if (filters.maxDiameter) {
      const maxDiam = parseFloat(filters.maxDiameter);
      filtered = filtered.filter(event => {
        const avgDiameter = (event.estimated_diameter.kilometers.estimated_diameter_min + 
                           event.estimated_diameter.kilometers.estimated_diameter_max) / 2;
        return avgDiameter <= maxDiam;
      });
    }

    // Sort events
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date':
          return new Date(a.close_approach_data[0].close_approach_date) - 
                 new Date(b.close_approach_data[0].close_approach_date);
        case 'size':
          const aSize = (a.estimated_diameter.kilometers.estimated_diameter_min + 
                        a.estimated_diameter.kilometers.estimated_diameter_max) / 2;
          const bSize = (b.estimated_diameter.kilometers.estimated_diameter_min + 
                        b.estimated_diameter.kilometers.estimated_diameter_max) / 2;
          return bSize - aSize;
        case 'distance':
          return parseFloat(a.close_approach_data[0].miss_distance.kilometers) - 
                 parseFloat(b.close_approach_data[0].miss_distance.kilometers);
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="hero-section">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient">
      {/* Hero Section */}
      <section className="hero-section pt-20">
        {/* Geometric background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="geometric-shape w-96 h-96 bg-space-gradient rounded-full -top-48 -left-48 blur-3xl"></div>
          <div className="geometric-shape w-80 h-80 bg-cosmic-gradient rounded-full -top-40 -right-40 blur-2xl"></div>
          <div className="geometric-shape w-64 h-64 bg-space-500/20 rounded-full top-1/4 left-1/4 blur-xl"></div>
          <div className="geometric-shape w-48 h-48 bg-cosmic-500/20 rounded-full bottom-1/4 right-1/4 blur-lg"></div>
          
          {/* Geometric shapes */}
          <div className="geometric-shape w-32 h-32 border border-space-500/30 rotate-45 top-1/3 left-1/6"></div>
          <div className="geometric-shape w-24 h-24 border border-cosmic-500/30 rotate-12 bottom-1/3 right-1/6"></div>
          <div className="geometric-shape w-16 h-16 bg-space-400/20 top-1/2 right-1/3"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="block text-white">CONCEPT TO</span>
              <span className="block bg-cosmic-gradient bg-clip-text text-transparent">COSMIC EVENT TRACKER</span>
            </h1>
            <p className="text-xl md:text-2xl text-space-200 max-w-3xl mx-auto mb-12 leading-relaxed">
              Track near-Earth asteroids and cosmic events in real-time with advanced monitoring systems. 
              Stay informed about potentially hazardous objects and their closest approach distances to Earth.
            </p>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="glass-card p-8 text-center">
              <div className="text-4xl font-bold stats-number mb-2">
                {events.length}
              </div>
              <div className="text-white font-medium uppercase tracking-wider">Active Objects</div>
            </div>
            <div className="glass-card p-8 text-center">
              <div className="text-4xl font-bold stats-number mb-2">
                {filteredEvents.filter(e => e.is_potentially_hazardous_asteroid).length}
              </div>
              <div className="text-white font-medium uppercase tracking-wider">Hazardous Objects</div>
            </div>
            <div className="glass-card p-8 text-center">
              <div className="text-4xl font-bold stats-number mb-2">
                24/7
              </div>
              <div className="text-white font-medium uppercase tracking-wider">Monitoring</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              WE'D LIKE TO BE YOUR
            </h2>
            <h3 className="text-4xl font-bold bg-cosmic-gradient bg-clip-text text-transparent mb-6">
              MISSION ACCELERATORS
            </h3>
            <p className="text-space-200 text-lg max-w-4xl mx-auto">
              With innovative frameworks and mission-proven experience, Astro Digital removes the primary barriers to new space 
              missions, including high cost, long schedules, and significant risk. The full constellation development is formulated 
              around advanced systems, which help of ensuring a comprehensive build to guide customers through a modular approach to 
              technology infrastructure to achieve your mission goals in the shortest timeframe possible.
            </p>
          </div>
          
          <div className="mb-12">
            <Filter filters={filters} onFilterChange={handleFilterChange} />
          </div>
          
          {error ? (
            <div className="text-center py-8">
              <p className="text-cosmic-400 text-lg">{error}</p>
              <button 
                onClick={loadEvents}
                className="mt-4 btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : (
            <EventList events={filteredEvents} loading={loading} error={error} />
          )}
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-space-900/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Launch Your Mission?
          </h2>
          <p className="text-xl text-space-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get in touch with our team to discuss how we can accelerate your space infrastructure goals.
          </p>
          <button 
            onClick={() => setShowContactModal(true)}
            className="btn-primary text-lg px-10 py-4"
          >
            CONTACT US
          </button>
         </div>
       </section>
      
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-md w-full p-8 relative">
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-space-300 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-6 bg-cosmic-gradient bg-clip-text text-transparent">
              Contact Astro Digital
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-space-200 text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-space-900/50 border border-space-700/50 rounded-lg text-white placeholder-space-400 focus:outline-none focus:border-cosmic-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-space-200 text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-space-900/50 border border-space-700/50 rounded-lg text-white placeholder-space-400 focus:outline-none focus:border-cosmic-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-space-200 text-sm font-medium mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-space-900/50 border border-space-700/50 rounded-lg text-white placeholder-space-400 focus:outline-none focus:border-cosmic-500 transition-colors resize-none"
                  placeholder="Tell us about your space mission..."
                ></textarea>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 px-6 py-3 border border-space-700/50 text-space-300 rounded-lg hover:bg-space-800/50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;