const Filter = ({ showHazardousOnly, setShowHazardousOnly, sortOrder, setSortOrder }) => {
  return (
    <div className="card mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Filters & Sorting</h3>
      
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Hazardous Filter */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hazardous-filter"
            checked={showHazardousOnly}
            onChange={(e) => setShowHazardousOnly(e.target.checked)}
            className="w-4 h-4 text-primary-600 bg-primary-800 border-primary-700 rounded focus:ring-primary-500 focus:ring-2"
          />
          <label htmlFor="hazardous-filter" className="ml-2 text-primary-200">
            Show only hazardous asteroids
          </label>
        </div>

        {/* Sort Order */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sort-order" className="text-primary-200">
            Sort by date:
          </label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-primary-800 border border-primary-700 text-white rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="asc">Closest first</option>
            <option value="desc">Farthest first</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filter