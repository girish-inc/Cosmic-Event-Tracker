const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  return (
    <div className={`flex flex-col justify-center items-center my-12 ${className}`}>
      {/* Outer rotating ring */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-transparent rounded-full animate-spin`}
          style={{ 
            animationDuration: '1s',
            borderTopColor: '#6B46C1',
            borderRightColor: '#553C9A'
          }}
        ></div>
        
        {/* Inner pulsing core */}
        <div
          className={`absolute inset-2 rounded-full animate-pulse`}
          style={{ 
            animationDuration: '2s',
            backgroundColor: '#6B46C1'
          }}
        ></div>
        
        {/* Center dot */}
        <div className="absolute inset-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"></div>
      </div>
      
      {/* Loading text */}
      <div className="mt-4 text-gray-300 text-sm font-medium animate-pulse">
        <span className="inline-flex items-center">
          <svg className="w-4 h-4 mr-2" style={{color: '#6B46C1'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Loading cosmic data...
        </span>
      </div>
    </div>
  )
}

export default LoadingSpinner