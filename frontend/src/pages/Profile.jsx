import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Heart, 
  Calendar, 
  Lock, 
  Save, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Settings,
  Eye,
  EyeOff
} from "lucide-react";
import { getApiUrl } from '../config/api';

export default function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    interests: "",
    budget: "",
    preferredSeason: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [expandedSections, setExpandedSections] = useState({
    personalInfo: false,
    password: false,
    preferences: false
  });
  const navigate = useNavigate();

  const seasons = ["Spring", "Summer", "Fall", "Winter"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    fetchUserProfile(userId, token);
  }, [navigate]);

  const fetchUserProfile = async (userId, token) => {
    try {
      const response = await fetch(getApiUrl(`/api/users/${userId}`), {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setUserData({
        name: data.name || "",
        email: data.email || "",
        interests: data.interests || "",
        budget: data.budget || "",
        preferredSeason: data.preferredSeason || ""
      });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load profile data" });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const PersonalInfoSection = () => {
    const [formData, setFormData] = useState({ ...userData });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSaving(true);
      setMessage({ type: "", text: "" });

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      try {
        const response = await fetch(getApiUrl(`/api/users/${userId}`), {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error("Failed to update profile");
        }

        const updatedUser = await response.json();
        setUserData(formData);
        
        if (updatedUser.name !== localStorage.getItem("userName")) {
          localStorage.setItem("userName", updatedUser.name);
          window.dispatchEvent(new Event('authChange'));
        }

        setMessage({ type: "success", text: "Personal information updated successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);

      } catch (error) {
        setMessage({ type: "error", text: "Failed to update personal information" });
      } finally {
        setIsSaving(false);
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center mb-2">
              <User className="w-4 h-4 mr-2 text-blue-600" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center mb-2">
              <Mail className="w-4 h-4 mr-2 text-blue-600" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </form>
    );
  };

  const PasswordSection = () => {
    const [passwordData, setPasswordData] = useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    const [showPasswords, setShowPasswords] = useState({
      current: false,
      new: false,
      confirm: false
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setMessage({ type: "error", text: "New passwords don't match" });
        return;
      }

      setIsSaving(true);
      setMessage({ type: "", text: "" });

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      try {
        const response = await fetch(getApiUrl(`/api/users/${userId}`), {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ password: passwordData.newPassword })
        });

        if (!response.ok) {
          throw new Error("Failed to update password");
        }

        setMessage({ type: "success", text: "Password updated successfully!" });
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);

      } catch (error) {
        setMessage({ type: "error", text: "Failed to update password" });
      } finally {
        setIsSaving(false);
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = (field) => {
      setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center mb-2">
              <Lock className="w-4 h-4 mr-2 text-blue-600" />
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleInputChange}
                className="w-full p-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center mb-2">
              <Lock className="w-4 h-4 mr-2 text-blue-600" />
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleInputChange}
                className="w-full p-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center mb-2">
              <Lock className="w-4 h-4 mr-2 text-blue-600" />
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Updating Password...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Update Password
            </>
          )}
        </button>
      </form>
    );
  };

  const PreferencesSection = () => {
    const [preferencesData, setPreferencesData] = useState({
      interests: userData.interests,
      budget: userData.budget,
      preferredSeason: userData.preferredSeason
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSaving(true);
      setMessage({ type: "", text: "" });

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      try {
        const response = await fetch(getApiUrl(`/api/users/${userId}`), {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(preferencesData)
        });

        if (!response.ok) {
          throw new Error("Failed to update preferences");
        }

        setUserData(prev => ({ ...prev, ...preferencesData }));
        setMessage({ type: "success", text: "Preferences updated successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);

      } catch (error) {
        setMessage({ type: "error", text: "Failed to update preferences" });
      } finally {
        setIsSaving(false);
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setPreferencesData(prev => ({ ...prev, [name]: value }));
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center mb-2">
              <Heart className="w-4 h-4 mr-2 text-blue-600" />
              Travel Interests
            </label>
            <textarea
              name="interests"
              value={preferencesData.interests}
              onChange={handleInputChange}
              placeholder="e.g., Beach destinations, Mountain hiking, Cultural experiences, Food tours"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              rows="3"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center mb-2">
              <span className="w-4 h-4 mr-2 text-blue-600 font-bold">₹</span>
              Budget Range (NPR)
            </label>
            <input
              type="number"
              name="budget"
              value={preferencesData.budget}
              onChange={handleInputChange}
              placeholder="e.g., 50000"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              min="0"
              step="1000"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center mb-2">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              Preferred Season
            </label>
            <select
              name="preferredSeason"
              value={preferencesData.preferredSeason}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select a season</option>
              {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving Preferences...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </>
          )}
        </button>
      </form>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
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
              <span className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4 mr-2" />
                Your Profile
              </span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              Manage Your <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Account</span>
            </h1>
            <p className="text-gray-600 font-medium">
              Update your preferences and personal information
            </p>
          </div>
        </div>

        {/* User Info Display */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-gray-600">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl flex items-center ${
            message.type === "success" 
              ? "bg-green-50 border border-green-200 text-green-700" 
              : "bg-red-50 border border-red-200 text-red-700"
          }`}>
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        {/* Collapsible Sections */}
        <div className="space-y-4">
          {/* Personal Information Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <button
              onClick={() => toggleSection('personalInfo')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Personal Information</span>
              </div>
              {expandedSections.personalInfo ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {expandedSections.personalInfo && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <PersonalInfoSection />
              </div>
            )}
          </div>

          {/* Password Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <button
              onClick={() => toggleSection('password')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Change Password</span>
              </div>
              {expandedSections.password ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {expandedSections.password && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <PasswordSection />
              </div>
            )}
          </div>

          {/* Preferences Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <button
              onClick={() => toggleSection('preferences')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Edit Preferences</span>
              </div>
              {expandedSections.preferences ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {expandedSections.preferences && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <PreferencesSection />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 