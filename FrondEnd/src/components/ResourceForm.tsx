import React, { useState } from "react";

interface ResourceFormProps {
  type: "culinary" | "educational";
  onSuccess: () => void;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ type, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const endpoint =
        type === "culinary"
          ? "culinary-resources.php"
          : "educational-resources.php";

      const response = await fetch(`http://localhost:8080/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage(
          `${
            type === "culinary" ? "Culinary" : "Educational"
          } resource created successfully!`
        );
        setFormData({ title: "", description: "", link: "" });
        onSuccess();
      } else {
        setMessage(data.message || "Failed to create resource");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resourceType = type === "culinary" ? "Culinary" : "Educational";
  const emoji = type === "culinary" ? "👨‍🍳" : "📚";
  const gradientColor = type === "culinary" ? "from-purple-500 to-pink-500" : "from-green-500 to-teal-500";
  const ringColor = type === "culinary" ? "focus:ring-purple-500" : "focus:ring-green-500";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent mb-2`}>
          {emoji} Add {resourceType} Resource
        </h2>
        <p className="text-gray-600">
          {type === "culinary" ? "Share cooking techniques and tips" : "Share educational content and guides"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Section */}
        <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/20 shadow-lg">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <span className={`w-8 h-8 bg-gradient-to-r ${gradientColor} rounded-full flex items-center justify-center text-white text-sm mr-3`}>1</span>
            Resource Title
          </h3>
          
          <input
            type="text"
            placeholder={`${emoji} What's your resource about?`}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className={`w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-all duration-200 placeholder-gray-500 text-black`}
          />
        </div>

        {/* Description Section */}
        <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/20 shadow-lg">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <span className={`w-8 h-8 bg-gradient-to-r ${gradientColor} rounded-full flex items-center justify-center text-white text-sm mr-3`}>2</span>
            Description
          </h3>
          
          <textarea
            placeholder={`📝 Describe your ${type === "culinary" ? "cooking technique or tip" : "educational content"}...\n\nWhat will people learn?\nWhy is it useful?`}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className={`w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-all duration-200 placeholder-gray-500 resize-none text-black`}
          />
          
          <div className="mt-2 text-right">
            <span className="text-sm text-gray-500">
              {formData.description.length} characters
            </span>
          </div>
        </div>

        {/* Link Section */}
        <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/20 shadow-lg">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <span className={`w-8 h-8 bg-gradient-to-r ${gradientColor} rounded-full flex items-center justify-center text-white text-sm mr-3`}>3</span>
            Resource Link
          </h3>
          
          <input
            type="url"
            placeholder="🔗 https://example.com/your-resource"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            required
            className={`w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-all duration-200 placeholder-gray-500 text-black`}
          />
          
          {formData.link && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Preview:</p>
              <a 
                href={formData.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:text-blue-600 text-sm break-all"
              >
                {formData.link}
              </a>
            </div>
          )}
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
          className={`w-full bg-gradient-to-r ${gradientColor} text-white p-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Resource...
            </span>
          ) : (
            `🚀 Create ${resourceType} Resource`
          )}
        </button>
      </form>
    </div>
  );
};

export default ResourceForm;
