import React, { useEffect, useState } from 'react';
import { 
  MapPin, 
  Users, 
  Star, 
  Target, 
  Mountain, 
  Smartphone, 
  ArrowRight, 
  Sparkles,
  Globe,
  Heart,
  Zap
} from 'lucide-react';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className={`text-center transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="mb-8">
              <span className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Discover Nepal's Hidden Treasures
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              Plan Your Next Adventure with{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                WanderWise
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Discover the hidden gems of Nepal with personalized travel recommendations, 
              local insights, and unforgettable experiences tailored just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <CTAButton 
                href="/register" 
                primary={true}
                icon={<Zap className="w-5 h-5" />}
                label="Start Your Journey"
              />
              <CTAButton 
                href="/recommendations" 
                primary={false}
                icon={<Globe className="w-5 h-5" />}
                label="Explore Destinations"
              />
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <StatCard number="500+" label="Destinations" icon={<MapPin className="w-8 h-8" />} />
              <StatCard number="10K+" label="Happy Travelers" icon={<Users className="w-8 h-8" />} />
              <StatCard number="98%" label="Satisfaction Rate" icon={<Star className="w-8 h-8" />} />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Why Choose <span className="text-blue-600">WanderWise</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Your personal travel companion for exploring the wonders of Nepal
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Target className="w-8 h-8" />}
              title="Personalized Recommendations"
              description="Get travel suggestions tailored to your preferences, budget, and travel style with our AI-powered recommendation engine."
              gradient="from-blue-500 to-cyan-500"
            />
            
            <FeatureCard 
              icon={<Mountain className="w-8 h-8" />}
              title="Local Insights"
              description="Discover hidden gems and authentic experiences beyond tourist trails with insider knowledge from local experts."
              gradient="from-green-500 to-emerald-500"
            />
            
            <FeatureCard 
              icon={<Smartphone className="w-8 h-8" />}
              title="Easy Planning"
              description="Plan your perfect trip with our intuitive platform featuring interactive maps, detailed itineraries, and real-time updates."
              gradient="from-purple-500 to-pink-500"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-8 font-medium">
            Join thousands of travelers who have discovered Nepal with WanderWise
          </p>
          <CTAButton 
            href="/register" 
            primary={true}
            icon={<Heart className="w-5 h-5" />}
            label="Get Started Today"
            className="bg-white text-blue-600 hover:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

const CTAButton = ({ href, primary, icon, label, className = "" }) => (
  <a 
    href={href} 
    className={`inline-flex items-center px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
      primary 
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700' 
        : 'bg-white text-blue-600 hover:bg-gray-50 border-2 border-blue-600'
    } ${className}`}
  >
    <span className="mr-2">{icon}</span>
    {label}
    <ArrowRight className="w-5 h-5 ml-2" />
  </a>
);

const StatCard = ({ number, label, icon }) => (
  <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
    <div className="flex justify-center mb-4 text-blue-600">{icon}</div>
    <div className="text-3xl font-black text-gray-900 mb-1">{number}</div>
    <div className="text-gray-600 font-semibold">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100">
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed font-medium">{description}</p>
  </div>
);

export default HomePage; 