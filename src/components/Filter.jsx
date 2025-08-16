function Filter({ filters, onFilterChange }) {
  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="glass-card p-6 m-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter & Sort
        </h3>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Hazardous Filter */}
        <div className="space-y-2 flex-1">
          <label className="text-lg font-semibold text-white">Status</label>
          <select
            value={filters.hazardous}
            onChange={(e) => handleFilterChange('hazardous', e.target.value)}
            className="w-full p-3 border border-white border-opacity-30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white bg-white bg-opacity-10 backdrop-blur-sm"
          >
            <option value="all">All Objects</option>
            <option value="true">Hazardous Only</option>
            <option value="false">Safe Only</option>
          </select>
        </div>
        
        {/* Sort Order */}
        <div className="space-y-2 flex-1">
          <label className="text-lg font-semibold text-white">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full p-3 border border-blue-900 rounded-lg text-blue-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Approach Date</option>
            <option value="size">Size (Largest First)</option>
            <option value="distance">Distance (Closest First)</option>
          </select>
        </div>
        
        {/* Min Diameter */}
        <div className="space-y-2 flex-1">
          <label className="text-lg font-semibold text-white">Min Diameter (km)</label>
          <input
            type="number"
            placeholder="0.0"
            step="0.1"
            min="0"
            value={filters.minDiameter}
            onChange={(e) => handleFilterChange('minDiameter', e.target.value)}
            className="w-full p-3 border border-blue-900 rounded-lg text-blue-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Max Diameter */}
        <div className="space-y-2 flex-1">
          <label className="text-lg font-semibold text-white">Max Diameter (km)</label>
          <input
            type="number"
            placeholder="10.0"
            step="0.1"
            min="0"
            value={filters.maxDiameter}
            onChange={(e) => handleFilterChange('maxDiameter', e.target.value)}
            className="w-full p-3 border border-blue-900 rounded-lg text-blue-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-blue-200">
        <button
          onClick={() => onFilterChange({ hazardous: 'all', sortBy: 'date', minDiameter: '', maxDiameter: '' })}
          className="glass-button-orange"
        >
          Clear All
        </button>
        <button
          onClick={() => handleFilterChange('hazardous', 'true')}
          className="px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
        >
          ⚠️ Hazardous Only
        </button>
        <button
          onClick={() => handleFilterChange('sortBy', 'size')}
          className="px-4 py-2 bg-blue-100 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
        >
          🌌 Largest First
        </button>
        <button
          onClick={() => handleFilterChange('sortBy', 'distance')}
          className="px-4 py-2 bg-blue-100 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
        >
          🎯 Closest First
        </button>
      </div>
    </div>
  );
}

export default Filter