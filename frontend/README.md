## 📁 **Frontend README.md**

```markdown:frontend/README.md
# 🏔️ Wander Wise - Frontend Application

React.js frontend application for the Wander Wise travel recommendation platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

### 3. Start Development Server
```bash
npm start
```

The application will open at: http://localhost:3001

## 📁 Project Structure

```
src/
├── components/          # Reusable Components
│   ├── Navbar.jsx      # Navigation bar
│   ├── WishlistButton.jsx  # Wishlist toggle button
│   └── ProtectedRoute.jsx  # Route protection
├── pages/              # Page Components
│   ├── HomePage.jsx    # Landing page
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── Destinations.jsx # Destinations listing
│   ├── Recommendations.jsx # AI recommendations
│   ├── Wishlist.jsx    # User wishlist
│   └── Profile.jsx     # User profile
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles
```

##  UI Components

### Navigation
- **Navbar**: Responsive navigation with user dropdown
- **Mobile Menu**: Collapsible mobile navigation
- **Protected Routes**: Authentication-based route protection

### Cards
- **Destination Card**: Display destination information with wishlist button
- **Recommendation Card**: Show recommendations with match scores
- **Wishlist Card**: Display saved destinations with remove option

### Forms
- **Login Form**: User authentication
- **Register Form**: User registration
- **Profile Form**: User profile management

## 🔐 Authentication

### Login Flow
1. User enters email and password
2. API call to `/api/auth/login`
3. JWT token stored in localStorage
4. User redirected to home page

### Protected Routes
- `/profile` - User profile management
- `/recommendations` - AI recommendations
- `/wishlist` - Personal wishlist

### Logout
- Clears localStorage
- Redirects to home page
- Updates navigation state

## 📱 Pages

### Home Page (`/`)
- Hero section with call-to-action
- Featured destinations
- User testimonials

### Destinations (`/destinations`)
- Grid layout of all destinations
- Advanced search and filtering
- Wishlist integration

### Recommendations (`/recommendations`)
- AI-powered destination suggestions
- Match score indicators
- Filter and sort options

### Wishlist (`/wishlist`)
- Personal saved destinations
- Remove and clear functionality
- Date tracking for added items

### Profile (`/profile`)
- User information management
- Preference settings
- Password change

## 🎯 Features

### Search & Filtering
- **Text Search**: Search by name, place, or description
- **Season Filter**: Filter by best season
- **Price Range**: Filter by budget
- **Activity Tags**: Filter by interests

### Wishlist Management
- **Add/Remove**: Toggle destinations in wishlist
- **Real-time Updates**: Status updates across pages
- **Date Tracking**: Show when items were added

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive grid layouts
- **Desktop Experience**: Enhanced desktop features

## ️ Available Scripts

### Development
```bash
npm start          # Start development server
npm test           # Run tests
npm run build      # Build for production
npm run eject      # Eject from Create React App
```

### Production
```bash
npm run build      # Create optimized build
npm run serve      # Serve production build locally
```

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "lucide-react": "^0.263.1"
}
```

### Development Dependencies
```json
{
  "tailwindcss": "^3.2.7",
  "autoprefixer": "^10.4.14",
  "postcss": "^8.4.21"
}
```

## 🎨 Styling

### Tailwind CSS
- Utility-first CSS framework
- Custom color palette
- Responsive design utilities
- Custom animations

### Custom Styles
- Gradient backgrounds
- Card hover effects
- Loading animations
- Form styling

##  Configuration

### Environment Variables
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENV=development
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    }
  },
  plugins: []
}
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm test -- --coverage
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI
2. Run `vercel` in project directory
3. Follow deployment prompts

## 🔍 Performance

### Optimization Techniques
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Responsive images with fallbacks
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Browser caching strategies

### Performance Monitoring
- Lighthouse audits
- Bundle analyzer
- Performance metrics

## 🛠️ Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React naming conventions
- Use meaningful component names
- Add proper PropTypes or TypeScript

### Best Practices
- Keep components small and focused
- Use proper state management
- Handle loading and error states
- Implement proper form validation
- Use semantic HTML

##  Support

For frontend-specific issues, create an issue in the repository or contact the frontend team.

---

Built with React ❤️