import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    LogOut,
    Menu,
    X,
    ShieldCheck,
    Home
} from "lucide-react";

const AdminNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        setIsMobileMenuOpen(false);
        navigate("/login");
    };

    return (
        <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <ShieldCheck className="w-7 h-7 text-blue-600" />
                        <span className="text-xl font-bold text-blue-700">Admin Panel</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink to="/admin/dashboard" label="Dashboard" icon={<Home className="w-4 h-4" />} />
                        
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>

                    {/* Mobile Toggle Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 p-2"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200 py-4 space-y-2">
                        <MobileNavLink to="/admin/dashboard" label="Dashboard" icon={<Home className="w-4 h-4" />} />
                        
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

const NavLink = ({ to, label, icon }) => (
    <Link
        to={to}
        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50 relative group flex items-center space-x-1"
    >
        {icon}
        <span>{label}</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
);

const MobileNavLink = ({ to, label, icon }) => (
    <Link
        to={to}
        className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors flex items-center space-x-2"
    >
        {icon}
        <span>{label}</span>
    </Link>
);

export default AdminNavbar;
