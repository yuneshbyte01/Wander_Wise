import React from 'react';
import { 
  Mail, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  Twitter, 
  MapPin, 
  Phone,
  Heart,
  Mountain,
  Sparkles,
  Globe,
  Shield,
  Users,
  Award,
  ArrowRight,
  Download,
  Star
} from 'lucide-react';

const Footer = () => (
  <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    
    <div className="relative z-10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative">
                <Mountain className="w-10 h-10 text-blue-400" />
                <Sparkles className="w-5 h-5 text-indigo-400 absolute -top-1 -right-1" />
              </div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                WanderWise
              </h3>
            </div>
            <p className="text-gray-300 mb-8 max-w-lg font-medium leading-relaxed text-lg">
              Your trusted companion for discovering the hidden treasures of Nepal. 
              Plan unforgettable adventures with personalized recommendations and local insights.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-gray-300 text-sm font-medium">Safe Travel</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-gray-300 text-sm font-medium">Local Experts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-gray-300 text-sm font-medium">Best Prices</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="text-gray-300 text-sm font-medium">Top Rated</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <SocialLink href="mailto:info@wanderwise.com" icon={<Mail className="w-4 h-4" />} label="Email" />
              <SocialLink href="#" icon={<MessageCircle className="w-4 h-4" />} label="WhatsApp" />
              <SocialLink href="#" icon={<Facebook className="w-4 h-4" />} label="Facebook" />
              <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} label="Instagram" />
              <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} label="Twitter" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/destinations" label="Destinations" />
              <FooterLink href="/recommendations" label="Recommendations" />
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/contact" label="Contact" />
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Support</h4>
            <ul className="space-y-3">
              <FooterLink href="/help" label="Help Center" />
              <FooterLink href="/faq" label="FAQ" />
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Service" />
              <FooterLink href="/safety" label="Travel Safety" />
            </ul>
          </div>

          {/* Newsletter & App */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Stay Connected</h4>
            
            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-gray-300 text-sm mb-3">Get travel tips and updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* App Download */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center space-x-3 mb-3">
                <Globe className="w-6 h-6 text-blue-400" />
                <span className="text-white font-semibold">Download App</span>
              </div>
              <p className="text-gray-300 text-sm mb-3">Get the WanderWise mobile app for better experience</p>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Coming Soon</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 mt-12 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center md:justify-start space-x-3 p-4 bg-gray-800/30 rounded-xl">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-medium">Location</p>
                <p className="text-white text-sm font-semibold">Kathmandu, Nepal</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3 p-4 bg-gray-800/30 rounded-xl">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-medium">Phone</p>
                <p className="text-white text-sm font-semibold">+977-1-4XXXXXX</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3 p-4 bg-gray-800/30 rounded-xl">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-medium">Email</p>
                <p className="text-white text-sm font-semibold">info@wanderwise.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-black text-blue-400 mb-1">500+</div>
              <div className="text-gray-400 text-sm font-medium">Destinations</div>
            </div>
            <div>
              <div className="text-2xl font-black text-green-400 mb-1">10K+</div>
              <div className="text-gray-400 text-sm font-medium">Happy Travelers</div>
            </div>
            <div>
              <div className="text-2xl font-black text-purple-400 mb-1">98%</div>
              <div className="text-gray-400 text-sm font-medium">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-2xl font-black text-yellow-400 mb-1">24/7</div>
              <div className="text-gray-400 text-sm font-medium">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <span className="text-gray-400 text-sm font-medium">
              &copy; {new Date().getFullYear()} WanderWise. All rights reserved.
            </span>
            <div className="flex items-center space-x-4 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm font-medium">Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-gray-400 text-sm font-medium">in Nepal</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const FooterLink = ({ href, label }) => (
  <li>
    <a 
      href={href} 
      className="text-gray-300 hover:text-blue-400 transition-all duration-300 text-sm font-medium flex items-center group"
    >
      <span className="w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-4 mr-2"></span>
      {label}
    </a>
  </li>
);

const SocialLink = ({ href, icon, label }) => (
  <a 
    href={href}
    className="w-12 h-12 bg-gray-700 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
    title={label}
  >
    {icon}
  </a>
);

export default Footer; 