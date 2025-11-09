import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './src/context/AuthContext';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import ScrollToTop from './src/components/ScrollToTop';
import Home from './src/pages/Home';
import About from './src/pages/About';
import Recipes from './src/pages/Recipes';
import RecipeView from './src/pages/RecipeView';
import Community from './src/pages/Community';
import PostView from './src/pages/PostView';
import Resources from './src/pages/Resources';
import CulinaryResources from './src/pages/CulinaryResources';
import Contact from './src/pages/Contact';
import AdminDashboard from './src/pages/AdminDashboard';
import JoinModal from './src/components/JoinModal';
import LoginModal from './src/components/LoginModal';
import CookieBanner from './src/components/CookieBanner';

const App: React.FC = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleJoinClick = () => setIsJoinModalOpen(true);
  const handleLoginClick = () => setIsLoginModalOpen(true);

  const handleCloseModals = () => {
    setIsJoinModalOpen(false);
    setIsLoginModalOpen(false);
  };

  const handleSwitchToLogin = () => {
    setIsJoinModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleSwitchToJoin = () => {
    setIsLoginModalOpen(false);
    setIsJoinModalOpen(true);
  };

  const handleCookieAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieBanner(false);
  };

  const handleCookieDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowCookieBanner(false);
  };

  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-gradient-dark font-sans text-white">
          <Header onJoinClick={handleJoinClick} onLoginClick={handleLoginClick} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipe/:id" element={<RecipeView />} />
              <Route path="/community" element={<Community />} />
              <Route path="/post/:id" element={<PostView />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/culinary-resources" element={<CulinaryResources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
          <JoinModal 
            isOpen={isJoinModalOpen} 
            onClose={handleCloseModals} 
            onSwitchToLogin={handleSwitchToLogin}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={handleCloseModals}
            onSwitchToJoin={handleSwitchToJoin}
          />
          {showCookieBanner && (
              <CookieBanner onAccept={handleCookieAccept} onDecline={handleCookieDecline} />
          )}
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;