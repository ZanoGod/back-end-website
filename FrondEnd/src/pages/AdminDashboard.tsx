import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import RecipeForm from "../components/RecipeForm";
import CommunityForm from "../components/CommunityForm";
import ResourceForm from "../components/ResourceForm";
import MyContent from "../components/MyContent";

const AdminDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState("recipes");
  const [stats, setStats] = useState({
    recipe_count: 0,
    post_count: 0,
    culinary_count: 0,
    educational_count: 0,
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/dashboard.php", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            Please log in to access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      id: "recipes",
      label: "Add Recipe",
      icon: "🍳",
      count: stats.recipe_count,
    },
    {
      id: "community",
      label: "Create Post",
      icon: "👥",
      count: stats.post_count,
    },
    {
      id: "culinary",
      label: "Culinary Resources",
      icon: "📚",
      count: stats.culinary_count,
    },
    {
      id: "educational",
      label: "Educational Resources",
      icon: "🎓",
      count: stats.educational_count,
    },
    { id: "my-content", label: "My Content", icon: "📝", count: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-200 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-black">FoodFusion</h1>
          <p className="text-sm text-gray-600">Admin Dashboard</p>
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">
              {user?.firstName?.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-800">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        activeSection === item.id
                          ? "bg-white text-black"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeSection === "recipes" && (
              <RecipeForm onSuccess={fetchDashboardData} />
            )}
            {activeSection === "community" && (
              <CommunityForm onSuccess={fetchDashboardData} />
            )}
            {activeSection === "culinary" && (
              <ResourceForm type="culinary" onSuccess={fetchDashboardData} />
            )}
            {activeSection === "educational" && (
              <ResourceForm type="educational" onSuccess={fetchDashboardData} />
            )}
            {activeSection === "my-content" && <MyContent />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
