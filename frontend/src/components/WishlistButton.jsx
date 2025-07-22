import { useState, useEffect, useCallback } from 'react';
import { Heart } from 'lucide-react';

export default function WishlistButton({ destinationId, className = "", onWishlistChange }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkWishlistStatus = useCallback(async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setIsInWishlist(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/wishlist/${userId}/check/${destinationId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const isInWishlist = await response.json();
        setIsInWishlist(isInWishlist);
      } else {
        setIsInWishlist(false);
      }
    } catch (error) {
      console.error("Error checking wishlist status:", error);
      setIsInWishlist(false);
    }
  }, [destinationId]);

  useEffect(() => {
    checkWishlistStatus();
  }, [checkWishlistStatus]);

  useEffect(() => {
    const handleWishlistChange = () => {
      checkWishlistStatus();
    };

    window.addEventListener('wishlistChange', handleWishlistChange);
    return () => {
      window.removeEventListener('wishlistChange', handleWishlistChange);
    };
  }, [checkWishlistStatus]);

  const toggleWishlist = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("Please log in to add destinations to your wishlist");
      return;
    }

    setIsLoading(true);

    try {
      const method = isInWishlist ? "DELETE" : "POST";
      const response = await fetch(`http://localhost:8080/api/wishlist/${userId}/${destinationId}`, {
        method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        setIsInWishlist(!isInWishlist);
        window.dispatchEvent(new Event('wishlistChange'));
        if (onWishlistChange) {
          onWishlistChange({
            action: method === "POST" ? "add" : "remove",
            destinationId,
            undo: async () => {
              // Undo the last action
              await toggleWishlist();
            }
          });
        }
      } else {
        let errorMessage = "Failed to toggle wishlist";
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorResponse = await response.json();
          errorMessage = errorResponse.message || errorMessage;
        } else {
          const text = await response.text();
          errorMessage = text || errorMessage;
        }
        console.error(errorMessage);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={isLoading}
      className={`${className} transition-all duration-300 ${
        isInWishlist 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
    </button>
  );
} 