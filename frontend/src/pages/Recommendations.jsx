import { useState, useEffect, useCallback } from "react";
import { 
  Target, 
  RefreshCw, 
  Calendar, 
  Eye,
  Mountain,
  MapPin
} from "lucide-react";
import WishlistButton from '../components/WishlistButton';
import Toast from '../components/Toast';
import { getApiUrl } from '../config/api';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortBy, setSortBy] = useState("matchScore");
  const [toast, setToast] = useState(null);

  const seasons = ["Spring", "Summer", "Autumn", "Winter", "Monsoon"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setError("Please log in to view recommendations");
      setIsLoading(false);
      return;
    }

    fetchRecommendations(userId, token);
  }, []);

  const fetchRecommendations = async (userId, token) => {
    try {
      const response = await fetch(getApiUrl(`/api/recommendations/${userId}`), {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      console.log("Recommendations data:", data); // Debug log
      setRecommendations(data);
      setFilteredRecommendations(data);
    } catch (err) {
      setError("Failed to load recommendations. Please try again later.");
      console.error("Error fetching recommendations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      fetchRecommendations(userId, token);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSeason("");
    setPriceRange({ min: 0, max: 100000 });
    setSortBy("matchScore");
  };

  const getMatchScoreColor = (score) => {
    if (score >= 3) return "bg-green-100 text-green-800";
    if (score >= 2) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getMatchScoreIcon = (score) => {
    if (score >= 3) return "💡";
    if (score >= 2) return "⭐";
    return "💡";
  };

  useEffect(() => {
    let filtered = recommendations.filter(recommendation => {
      const matchesSearch = recommendation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recommendation.tags?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSeason = !selectedSeason || recommendation.bestSeason === selectedSeason;

      const matchesPrice = recommendation.averageCost >= priceRange.min && 
                          recommendation.averageCost <= priceRange.max;

      return matchesSearch && matchesSeason && matchesPrice;
    });

    // Sort
    switch (sortBy) {
      case "price":
        filtered.sort((a, b) => a.averageCost - b.averageCost);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // matchScore
        filtered.sort((a, b) => b.matchScore - a.matchScore);
    }

    setFilteredRecommendations(filtered);
  }, [recommendations, searchTerm, selectedSeason, priceRange, sortBy]);

  // Listen for wishlist changes
  useEffect(() => {
    const handleWishlistChange = () => {
      // Force re-render of recommendation cards to update wishlist buttons
      setFilteredRecommendations([...filteredRecommendations]);
    };

    window.addEventListener('wishlistChange', handleWishlistChange);
    return () => {
      window.removeEventListener('wishlistChange', handleWishlistChange);
    };
  }, [filteredRecommendations]);

  const handleWishlistChange = useCallback(({ action, destinationId, undo }) => {
    const recommendation = recommendations.find(r => r.id === destinationId);
    if (!recommendation) return;

    const message = action === 'add' 
      ? `${recommendation.name} added to wishlist`
      : `${recommendation.name} removed from wishlist`;
    
    setToast({
      message,
      onUndo: undo,
      onClose: () => setToast(null)
    });
  }, [recommendations]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Your <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">Personalized</span> Recommendations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Discover destinations perfectly matched to your interests and preferences
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          {/* Search and Refresh */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search recommendations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
              />
            </div>
            <button
              onClick={handleRefresh}
              className="bg-purple-600 text-white px-6 py-4 rounded-xl hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh
            </button>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-4 gap-4">
            {/* Season Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Best Season</label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
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
                  className="w-1/2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="w-1/2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
              >
                <option value="matchScore">Match Score</option>
                <option value="price">Price (Low to High)</option>
                <option value="name">Name (A-Z)</option>
              </select>
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
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            Showing {filteredRecommendations.length} of {recommendations.length} recommendations
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Recommendations Grid */}
        {filteredRecommendations.length === 0 ? (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recommendations found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or refresh for new recommendations</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecommendations.map((recommendation, index) => (
              <RecommendationCard 
                key={index} 
                recommendation={recommendation} 
                rank={index + 1}
                getMatchScoreColor={getMatchScoreColor}
                getMatchScoreIcon={getMatchScoreIcon}
                handleWishlistChange={handleWishlistChange}
              />
            ))}
          </div>
        )}
      </div>
      {/* Toast Notification */}
      {toast && < Toast {...toast} />}
    </div>
  );
}

const RecommendationCard = ({ recommendation, rank, getMatchScoreColor, getMatchScoreIcon, handleWishlistChange }) => {
  const tags = recommendation.tags ? recommendation.tags.split(',').map(tag => tag.trim()) : [];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 relative">
      {/* Rank Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
          #{rank}
        </div>
      </div>

      {/* Wishlist Button */}
      <div className="absolute top-4 right-4 z-10">
        <WishlistButton 
          destinationId={recommendation.id}
          className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
          onWishlistChange={handleWishlistChange}
        />
      </div>

      {/* Match Score Badge */}
      <div className="absolute top-12 right-4 z-10">
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getMatchScoreColor(recommendation.matchScore)}`}>
          <span className="mr-1">{getMatchScoreIcon(recommendation.matchScore)}</span>
          {recommendation.matchScore}%
        </div>
      </div>

      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 relative overflow-hidden">
        {recommendation.imageUrl ? (
          <img 
            src={recommendation.imageUrl} 
            alt={recommendation.name}
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
            <h3 className="text-xl font-bold text-gray-900 mb-1">{recommendation.name}</h3>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{recommendation.place || "Perfect Match"}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-green-600 font-semibold">
              <span className="mr-1 font-bold">₹</span>
              <span>{recommendation.averageCost?.toLocaleString()} NPR</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {recommendation.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {recommendation.description}
          </p>
        )}

        {/* Season */}
        {recommendation.bestSeason && (
          <div className="flex items-center text-gray-600 mb-3">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">Best in {recommendation.bestSeason}</span>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium"
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
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
}; 