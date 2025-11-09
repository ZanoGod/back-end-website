
import React from 'react';

interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed bottom-6 left-6 right-6 bg-brand-surface/90 backdrop-blur-xl text-white p-6 rounded-2xl shadow-2xl z-50 animate-slide-up border border-brand-surface/30">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-300 mb-6 sm:mb-0 leading-relaxed">
          We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={onAccept}
            className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Accept
          </button>
          <button
            onClick={onDecline}
            className="bg-brand-surface/50 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-surface transition-all duration-300"
          >
            Decline
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CookieBanner;
