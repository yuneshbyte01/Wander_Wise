import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Eye, 
  ArrowLeft,
  Sparkles,
  Trash2,
  Mountain,
  AlertTriangle
} from "lucide-react";
import { getApiUrl } from '../config/api';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const navigate = useNavigate();

  const fetchWishlist = useCallback(async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(getApiUrl(`/api/wishlist/${userId}`), {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const wishlistData = await response.json();
      
      if (Array.isArray(wishlistData)) {
        setWishlist(wishlistData);
      } else {
        setWishlist([]);
      }
      
      setError("");
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to load wishlist: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // Listen for wishlist changes from other components
  useEffect(() => {
    const handleWishlistChange = () => {
      fetchWishlist();
    };

    window.addEventListener('wishlistChange', handleWishlistChange);
    return () => {
      window.removeEventListener('wishlistChange', handleWishlistChange);
    };
  }, [fetchWishlist]);

  const removeFromWishlist = async (destinationId) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setError("Authentication required");
      return;
    }

    try {
      const response = await fetch(getApiUrl(`/api/wishlist/${userId}/${destinationId}`), {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || `HTTP ${response.status}`);
      }

      setWishlist(prev => prev.filter(item => item.destinationId !== destinationId));
      setError("");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      setError(`Failed to remove from wishlist: ${error.message}`);
    }
  };

  const clearWishlist = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    setIsClearing(true);
    try {
      const response = await fetch(getApiUrl(`/api/wishlist/${userId}/clear`), {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || `HTTP ${response.status}`);
      }

      setWishlist([]);
      setShowClearConfirm(false);
      setError("");
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      setError(`Failed to clear wishlist: ${error.message}`);
    } finally {
      setIsClearing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-blue-600 font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-flex items-center bg-gradient-to-r from-red-100 to-pink-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4 mr-2" />
                Your Wishlist
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              My <span className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">Favorites</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Your saved destinations and dream adventures
            </p>
          </div>
        </div>

        {/* Error Message - Only show for actual errors, not empty wishlist */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Clear All Button - Only show when there are items */}
        {wishlist.length > 0 && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowClearConfirm(true)}
              disabled={isClearing}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isClearing ? "Clearing..." : "Clear All"}
            </button>
          </div>
        )}

        {/* Wishlist Content */}
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start exploring destinations and add them to your wishlist!</p>
            <button
              onClick={() => navigate("/destinations")}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <Mountain className="w-5 h-5 mr-2" />
              Explore Destinations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <WishlistCard 
                key={item.id} 
                item={item} 
                onRemove={removeFromWishlist}
              />
            ))}
          </div>
        )}

        {/* Clear Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Clear Wishlist</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove all items from your wishlist? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={clearWishlist}
                  disabled={isClearing}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {isClearing ? "Clearing..." : "Clear All"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const WishlistCard = ({ item, onRemove }) => {
  const tags = item.destinationTags ? item.destinationTags.split(',').map(tag => tag.trim()) : [];

  // Format the added date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 relative group">
      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.destinationId)}
        className="absolute top-4 right-4 z-10 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 transform hover:scale-110"
        title="Remove from wishlist"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Added Date Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
          Added {formatDate(item.addedAt)}
        </div>
      </div>

      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-red-400 to-pink-500 relative overflow-hidden">
        {item.destinationImageUrl ? (
          <img 
            src={item.destinationImageUrl} 
            alt={item.destinationName}
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
            <h3 className="text-xl font-bold text-gray-900 mb-1">{item.destinationName}</h3>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{item.destinationPlace}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-green-600 font-semibold">
              <span className="mr-1 font-bold">₹</span>
              <span>{item.destinationCost?.toLocaleString()} NPR</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {item.destinationDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {item.destinationDescription}
          </p>
        )}

        {/* Season */}
        {item.destinationSeason && (
          <div className="flex items-center text-gray-600 mb-3">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">Best in {item.destinationSeason}</span>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium"
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
        <button className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
}; 