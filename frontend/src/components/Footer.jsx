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
  Sparkles
} from 'lucide-react';

const Footer = () => (
  <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative">
              <Mountain className="w-8 h-8 text-blue-400" />
              <Sparkles className="w-4 h-4 text-indigo-400 absolute -top-1 -right-1" />
            </div>
            <h3 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
              WanderWise
            </h3>
          </div>
          <p className="text-gray-300 mb-6 max-w-md font-medium leading-relaxed">
            Your trusted companion for discovering the hidden treasures of Nepal. 
            Plan unforgettable adventures with personalized recommendations and local insights.
          </p>
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
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <FooterLink href="/" label="Home" />
            <FooterLink href="/about" label="About Us" />
            <FooterLink href="/destinations" label="Destinations" />
            <FooterLink href="/contact" label="Contact" />
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-bold mb-4">Support</h4>
          <ul className="space-y-2">
            <FooterLink href="/help" label="Help Center" />
            <FooterLink href="/faq" label="FAQ" />
            <FooterLink href="/privacy" label="Privacy Policy" />
            <FooterLink href="/terms" label="Terms of Service" />
          </ul>
        </div>
      </div>

      {/* Contact Info */}
      <div className="border-t border-gray-700 mt-8 pt-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-sm">Kathmandu, Nepal</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Phone className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-sm">+977-1-4XXXXXX</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Mail className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-sm">info@wanderwise.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
        <span className="text-gray-400 text-sm font-medium">
          &copy; {new Date().getFullYear()} WanderWise. All rights reserved.
        </span>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <span className="text-gray-400 text-sm font-medium">Made with</span>
          <Heart className="w-4 h-4 text-red-500" />
          <span className="text-gray-400 text-sm font-medium">in Nepal</span>
        </div>
      </div>
    </div>
  </footer>
);

const FooterLink = ({ href, label }) => (
  <li>
    <a 
      href={href} 
      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
    >
      {label}
    </a>
  </li>
);

const SocialLink = ({ href, icon, label }) => (
  <a 
    href={href}
    className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
    title={label}
  >
    {icon}
  </a>
);

export default Footer; 