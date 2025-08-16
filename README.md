# 🌌 Cosmic Event Tracker

A React web application for tracking Near-Earth Objects (NEOs) using NASA's NeoWs API. Built with Vite, Tailwind CSS, and Supabase authentication.

## Features

- **User Authentication**: Secure login/signup with Supabase
- **NEO Tracking**: Fetch and display Near-Earth Objects for current and upcoming dates
- **Detailed Views**: Comprehensive NEO information including size, approach data, and hazard status
- **Filtering & Sorting**: Filter by hazardous asteroids and sort by approach date
- **Responsive Design**: Dark blue theme optimized for all devices
- **Real-time Data**: Live data from NASA's Near Earth Object Web Service

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Authentication**: Supabase
- **API**: NASA NeoWs API
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- NASA API key (optional, uses DEMO_KEY by default)

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd asteroid-tracker
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# NASA API Configuration
VITE_NASA_API_KEY=your_nasa_api_key
```

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to find your project URL and anon key
3. Update the `.env` file with your credentials
4. Authentication is handled automatically - no additional database setup required

### 4. NASA API Key (Optional)

1. Visit [NASA API Portal](https://api.nasa.gov/)
2. Generate a free API key
3. Replace `DEMO_KEY` in `.env` with your key
4. Note: DEMO_KEY has rate limits but works for testing

### 5. Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── EventCard.jsx    # Individual NEO display
│   ├── EventList.jsx    # NEO list with grouping
│   ├── Filter.jsx       # Filtering and sorting
│   ├── Header.jsx       # Navigation header
│   ├── LoadingSpinner.jsx
│   ├── Login.jsx        # Authentication
│   ├── ProtectedRoute.jsx
│   └── Signup.jsx
├── context/             # React Context
│   └── AuthContext.jsx  # Authentication state
├── pages/               # Main application pages
│   ├── EventDetail.jsx  # Detailed NEO view
│   └── Home.jsx         # Main dashboard
├── utils/               # Utility functions
│   ├── nasa.js          # NASA API integration
│   └── supabase.js      # Supabase configuration
└── App.jsx              # Main app with routing
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_NASA_API_KEY`
4. Deploy automatically on push

### Manual Build

```bash
npm run build
```

The `dist/` folder contains the production build ready for deployment.

## Usage

1. **Sign Up/Login**: Create an account or sign in
2. **View NEOs**: Browse current and upcoming Near-Earth Objects
3. **Filter Data**: Toggle hazardous asteroids only
4. **Sort Results**: Order by closest approach date
5. **View Details**: Click any NEO for comprehensive information
6. **Load More**: Fetch additional days of data

## API Rate Limits

- **DEMO_KEY**: 1,000 requests per hour
- **Personal Key**: 1,000 requests per hour (same limit, but dedicated)
- Consider implementing caching for production use

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- NASA for providing the Near Earth Object Web Service
- Supabase for authentication infrastructure
- Tailwind CSS for styling framework

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
