import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  LogOut, 
  UserPlus, 
  LogIn, 
  Menu, 
  X,
  Compass,
  Mountain,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    checkLoginStatus();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Mountain className="w-8 h-8 text-blue-600" />
                  <Sparkles className="w-4 h-4 text-indigo-500 absolute -top-1 -right-1" />
                </div>
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                  WanderWise
                </h1>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" label="Home" icon={<Compass className="w-4 h-4" />} />
            
            {isLoggedIn ? (
              <>
                <NavLink href="/recommendations" label="Recommendations" icon={<MapPin className="w-4 h-4" />} />
                <button 
                  onClick={handleLogout}
                  className="ml-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink href="/login" label="Login" icon={<LogIn className="w-4 h-4" />} />
                <a 
                  href="/register" 
                  className="ml-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="space-y-2">
              <MobileNavLink href="/" label="Home" icon={<Compass className="w-4 h-4" />} />
              
              {isLoggedIn ? (
                <>
                  <MobileNavLink href="/recommendations" label="Recommendations" icon={<MapPin className="w-4 h-4" />} />
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <MobileNavLink href="/login" label="Login" icon={<LogIn className="w-4 h-4" />} />
                  <MobileNavLink href="/register" label="Register" icon={<UserPlus className="w-4 h-4" />} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ href, label, icon }) => (
  <a 
    href={href} 
    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50 relative group flex items-center space-x-1"
  >
    {icon}
    <span>{label}</span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
  </a>
);

const MobileNavLink = ({ href, label, icon }) => (
  <a 
    href={href} 
    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors flex items-center space-x-2"
  >
    {icon}
    <span>{label}</span>
  </a>
);

export default Navbar; 