import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Recommendations from './pages/Recommendations';
import Destinations from './pages/Destinations';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <AlertCircle className="w-24 h-24 text-gray-400 mx-auto mb-6" />
      <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8 font-medium">Page not found</p>
      <a 
        href="/" 
        className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        <Home className="w-4 h-4 mr-2" />
        Go Home
      </a>
    </div>
  </div>
);

export default App;
