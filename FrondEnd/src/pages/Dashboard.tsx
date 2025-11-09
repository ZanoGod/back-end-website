import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import RecipeForm from "../components/RecipeForm";
import CommunityForm from "../components/CommunityForm";
import ResourceForm from "../components/ResourceForm";
import MyContent from "../components/MyContent";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("mycontent");
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
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-brand-dark mb-4">
          Access Denied
        </h1>
        <p className="text-brand-gray">
          Please log in to access your dashboard.
        </p>
      </div>
    );
  }

  const tabs = [
    {
      id: "mycontent",
      label: "My Content",
      count:
        stats.recipe_count +
        stats.post_count +
        stats.culinary_count +
        stats.educational_count,
    },
    { id: "recipes", label: "Add Recipe", count: stats.recipe_count },
    { id: "community", label: "Add Post", count: stats.post_count },
    {
      id: "culinary",
      label: "Add Culinary Resource",
      count: stats.culinary_count,
    },
    {
      id: "educational",
      label: "Add Educational Resource",
      count: stats.educational_count,
    },
  ];

  const StatCard = ({ icon, title, count, color, gradient }: any) => (
    <div className={`relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm bg-white/80 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${gradient}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{count}</p>
        </div>
        <div className={`p-3 rounded-xl ${color} text-white`}>
          {icon}
        </div>
      </div>
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-10 -mt-10"></div>
    </div>
  );

  const ActionCard = ({ icon, title, description, onClick, active }: any) => (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left w-full ${
        active ? 'bg-gray-200 border-gray-300' : 'bg-white/80 hover:bg-white/90'
      }`}
    >
      <div className="flex items-center mb-3">
        <div className={`p-2 rounded-lg ${active ? 'bg-gray-400' : 'bg-gray-100'} mr-3`}>
          <div className={active ? 'text-black' : 'text-gray-600'}>{icon}</div>
        </div>
        <h3 className="font-semibold text-black">{title}</h3>
      </div>
      <p className="text-sm text-black">{description}</p>
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome back, {user?.firstName}! 🍳
          </h1>
          <p className="text-gray-600 text-lg">
            Your culinary journey dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
            title="Recipes Created"
            count={stats.recipe_count}
            color="bg-gradient-to-r from-green-500 to-emerald-500"
            gradient="hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50"
          />
          <StatCard
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/></svg>}
            title="Community Posts"
            count={stats.post_count}
            color="bg-gradient-to-r from-blue-500 to-cyan-500"
            gradient="hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50"
          />
          <StatCard
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>}
            title="Culinary Resources"
            count={stats.culinary_count}
            color="bg-gradient-to-r from-purple-500 to-pink-500"
            gradient="hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50"
          />
          <StatCard
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>}
            title="Educational Content"
            count={stats.educational_count}
            color="bg-gradient-to-r from-orange-500 to-red-500"
            gradient="hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50"
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ActionCard
            icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/></svg>}
            title="My Content"
            description="View and manage all your content"
            onClick={() => setActiveTab('mycontent')}
            active={activeTab === 'mycontent'}
          />
          <ActionCard
            icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/></svg>}
            title="Add Recipe"
            description="Share your culinary masterpiece"
            onClick={() => setActiveTab('recipes')}
            active={activeTab === 'recipes'}
          />
          <ActionCard
            icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/></svg>}
            title="Add Post"
            description="Connect with the community"
            onClick={() => setActiveTab('community')}
            active={activeTab === 'community'}
          />
          <ActionCard
            icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>}
            title="Culinary Resource"
            description="Add cooking techniques & tips"
            onClick={() => setActiveTab('culinary')}
            active={activeTab === 'culinary'}
          />
          <ActionCard
            icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>}
            title="Educational Content"
            description="Share learning materials"
            onClick={() => setActiveTab('educational')}
            active={activeTab === 'educational'}
          />
        </div>

        {/* Content Area */}
        <div className="backdrop-blur-sm bg-white/80 rounded-2xl border border-white/20 shadow-xl p-8">
          {activeTab === "mycontent" && <MyContent />}
          {activeTab === "recipes" && (
            <RecipeForm onSuccess={fetchDashboardData} />
          )}
          {activeTab === "community" && (
            <CommunityForm onSuccess={fetchDashboardData} />
          )}
          {activeTab === "culinary" && (
            <ResourceForm type="culinary" onSuccess={fetchDashboardData} />
          )}
          {activeTab === "educational" && (
            <ResourceForm type="educational" onSuccess={fetchDashboardData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
