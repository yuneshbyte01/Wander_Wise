import { useState, useEffect } from "react";
import { 
  Search, 
  Globe, 
  Mountain, 
  MapPin, 
  Calendar, 
  Eye,
  Sparkles
} from "lucide-react";
import WishlistButton from '../components/WishlistButton';

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedTags, setSelectedTags] = useState([]);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/destinations');
      if (response.ok) {
        const data = await response.json();
        setDestinations(data);
        setFilteredDestinations(data);
      } else {
        setError("Failed to load destinations");
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setError("Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Filter destinations based on search and filters
  useEffect(() => {
    let filtered = destinations;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(destination =>
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Season filter
    if (selectedSeason) {
      filtered = filtered.filter(destination =>
        destination.bestSeason === selectedSeason
      );
    }

    // Price range filter
    if (priceRange.min !== "" || priceRange.max !== "") {
      filtered = filtered.filter(destination => {
        const cost = destination.averageCost || 0;
        const min = priceRange.min !== "" ? Number(priceRange.min) : 0;
        const max = priceRange.max !== "" ? Number(priceRange.max) : Infinity;
        return cost >= min && cost <= max;
      });
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(destination => {
        if (!destination.tags) return false;
        const destinationTags = destination.tags.toLowerCase().split(',').map(tag => tag.trim());
        return selectedTags.some(tag => destinationTags.includes(tag.toLowerCase()));
      });
    }

    setFilteredDestinations(filtered);
  }, [destinations, searchTerm, selectedSeason, priceRange, selectedTags]);

  // Listen for wishlist changes
  useEffect(() => {
    const handleWishlistChange = () => {
      // Force re-render of destination cards to update wishlist buttons
      setFilteredDestinations([...filteredDestinations]);
    };

    window.addEventListener('wishlistChange', handleWishlistChange);
    return () => {
      window.removeEventListener('wishlistChange', handleWishlistChange);
    };
  }, [filteredDestinations]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSeason("");
    setSelectedTags([]);
    setPriceRange({ min: "", max: "" });
  };

  // Get unique seasons and tags
  const seasons = [...new Set(destinations.map(d => d.bestSeason).filter(Boolean))];
  const allTags = [...new Set(
    destinations
      .flatMap(d => d.tags ? d.tags.split(',').map(tag => tag.trim()) : [])
      .filter(Boolean)
  )];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              Explore Nepal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Discover <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Amazing Destinations</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Find your perfect adventure in Nepal with our curated collection of destinations
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations, places, or activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-4 gap-4">
            {/* Season Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Best Season</label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
              >
                <option value="">All Seasons</option>
                {seasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range (NPR)</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  className="w-1/2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="w-1/2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Activities & Interests</label>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/50 text-gray-700 hover:bg-blue-50 border border-gray-200'
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            Showing {filteredDestinations.length} of {destinations.length} destinations
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Destinations Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map(destination => (
              <DestinationCard 
                key={destination.id} 
                destination={destination}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const DestinationCard = ({ destination }) => {
  const tags = destination.tags ? destination.tags.split(',').map(tag => tag.trim()) : [];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 relative group">
      {/* Wishlist Button */}
      <div className="absolute top-4 right-4 z-10">
        <WishlistButton 
          destinationId={destination.id}
          className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
        />
      </div>

      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
        {destination.imageUrl ? (
          <img 
            src={destination.imageUrl} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Mountain className="w-16 h-16 text-white/80" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.name}</h3>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{destination.place}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-green-600 font-semibold">
              <span className="mr-1 font-bold">₹</span>
              <span>{destination.averageCost?.toLocaleString()} NPR</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {destination.description}
        </p>

        {/* Season */}
        {destination.bestSeason && (
          <div className="flex items-center text-gray-600 mb-3">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">Best in {destination.bestSeason}</span>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
}; 