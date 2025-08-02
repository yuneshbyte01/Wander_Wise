import React from 'react';
import { Home, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center px-6 py-10">
                <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                <h1 className="text-5xl font-bold text-gray-900 mb-3">404</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Oops! The page you’re looking for doesn’t exist.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <Home className="w-5 h-5 mr-2" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
