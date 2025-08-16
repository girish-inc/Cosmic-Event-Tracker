/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Force include essential classes
  purge: {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      'max-w-sm',
      'w-full',
      'mx-auto',
      'glass-card'
    ]
  },
  safelist: [
    // Essential card layout classes
    'max-w-sm',
    'max-w-md', 
    'max-w-lg',
    'max-w-xl',
    'max-w-2xl',
    'max-w-full',
    'w-full',
    'w-auto',
    'w-1/2',
    'w-1/3', 
    'w-2/3',
    'mx-auto',
    'my-4',
    'my-6',
    
    // Grid system
    'grid-cols-1',
    'grid-cols-2', 
    'grid-cols-3',
    'md:grid-cols-2',
    'lg:grid-cols-3',
    'xl:grid-cols-4',
    
    // Spacing
    'gap-4',
    'gap-6', 
    'gap-8',
    'space-y-3',
    'space-y-6',
    'space-y-12',
    
    // Custom components
    'glass-card',
    
    // Flexbox utilities
    'flex',
    'flex-wrap',
    'flex-col',
    'flex-row',
    'justify-center',
    'items-center',
    
    // Responsive variants
    'sm:max-w-sm',
    'md:max-w-md',
    'lg:max-w-lg',
    'xl:max-w-xl',
    'sm:w-full',
    'md:w-auto',
    'lg:w-1/3'
  ],
  theme: {
    extend: {
      colors: {
        space: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        cosmic: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'space-gradient': 'linear-gradient(135deg, #1e293b, #475569)',
        'cosmic-gradient': 'linear-gradient(135deg, #6B46C1, #EC4899, #F59E0B)',
      },
    },
  },
  plugins: [],
}