import React, { useState } from "react";

interface CommunityFormProps {
  onSuccess: () => void;
}

const CommunityForm: React.FC<CommunityFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    photo_url: "",
    caption: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/community.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Community post created successfully!");
        setFormData({ title: "", photo_url: "", caption: "" });
        onSuccess();
      } else {
        setMessage(data.message || "Failed to create post");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
          💬 Share Your Story
        </h2>
        <p className="text-gray-600">Connect with fellow food enthusiasts</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Post Title Section */}
        <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/20 shadow-lg">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm mr-3">1</span>
            Post Title
          </h3>
          
          <input
            type="text"
            placeholder="✨ What's your post about?"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-black"
          />
        </div>

        {/* Photo Section */}
        <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/20 shadow-lg">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white text-sm mr-3">2</span>
            Add a Photo
          </h3>
          
          <input
            type="url"
            placeholder="📸 Photo URL (optional)"
            value={formData.photo_url}
            onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
            className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-black"
          />
          
          {formData.photo_url && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img 
                src={formData.photo_url} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Caption Section */}
        <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/20 shadow-lg">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm mr-3">3</span>
            Your Story
          </h3>
          
          <textarea
            placeholder="📝 Share your thoughts, experiences, or ask questions...&#10;&#10;What inspired this dish?&#10;Any cooking tips to share?&#10;How did it turn out?"
            value={formData.caption}
            onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
            rows={6}
            className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 resize-none text-black"
          />
          
          <div className="mt-2 text-right">
            <span className="text-sm text-gray-500">
              {formData.caption.length} characters
            </span>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-xl text-center font-medium ${
            message.includes("success") 
              ? "bg-green-100 text-green-700 border border-green-200" 
              : "bg-red-100 text-red-700 border border-red-200"
          }`}>
            {message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Post...
            </span>
          ) : (
            "🚀 Share Post"
          )}
        </button>
      </form>
    </div>
  );
};

export default CommunityForm;
