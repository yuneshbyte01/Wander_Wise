import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌄 WanderWise
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your Personal Travel Companion for Nepal
          </p>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-primary-600 mb-4">
              Welcome!
            </h2>
            <p className="text-gray-700 mb-4">
              React + Tailwind CSS is working perfectly! 🎉
            </p>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
