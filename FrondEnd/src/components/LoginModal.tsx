import React, { useState, useEffect } from "react";
import { authApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToJoin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToJoin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const { login } = useAuth();

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setError(null);
      setIsBlocked(false);
      setRemainingTime(0);
    }
  }, [isOpen]);

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isBlocked && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setIsBlocked(false);
            setError(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBlocked, remainingTime]);

  if (!isOpen) return null;

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authApi.login({ email, password });
      if (!response.success) {
        throw new Error(response.message || "Invalid email or password.");
      }

      if (response.token && response.user) {
        login(response.token, response.user);
        onClose();
      }
    } catch (err: any) {
      let errorMessage = err.message || "Failed to log in. Please check your credentials.";

      // Decode HTML entities
      errorMessage = errorMessage.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

      console.log('Login error message:', errorMessage);
      console.log('Full error object:', err);

      setError(errorMessage);

      // Check if it's a rate limit error - be more flexible with detection
      if (errorMessage.toLowerCase().includes('too many') ||
          errorMessage.toLowerCase().includes('locked') ||
          errorMessage.toLowerCase().includes('blocked') ||
          errorMessage.toLowerCase().includes('rate limit') ||
          errorMessage.toLowerCase().includes('wait')) {
        console.log('Rate limit detected, setting blocked state');
        setIsBlocked(true);
        setRemainingTime(60);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="bg-brand-surface/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md m-4 transform transition-all duration-300 border border-brand-surface/30"
        style={
          isOpen
            ? { transform: "scale(1)", opacity: 1 }
            : { transform: "scale(0.95)", opacity: 0 }
        }
        onClick={stopPropagation}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">Welcome Back!</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none p-2 rounded-lg hover:bg-brand-surface/50 transition-all"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-300 mb-8 leading-relaxed">
          Log in to your account to continue your culinary journey.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 bg-brand-dark/50 backdrop-blur-sm border border-brand-surface/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-gray-400 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 bg-brand-dark/50 backdrop-blur-sm border border-brand-surface/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-gray-400 transition-all"
          />

          {isBlocked && (
            <div className="bg-red-500/20 text-red-400 border border-red-500/30 p-6 rounded-xl backdrop-blur-sm text-center">
              <div className="text-xl font-bold text-red-400 mb-3">
                🔒 Account Temporarily Locked
              </div>
              <div className="text-4xl font-mono font-bold text-red-300 mb-3">
                {Math.floor(remainingTime / 60).toString().padStart(2, '0')}:
                {(remainingTime % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-red-400">
                Too many failed attempts. Please wait {remainingTime} seconds.
              </div>
            </div>
          )}

          {error && !isBlocked && (
            <div className="bg-red-500/20 text-red-400 border border-red-500/30 p-4 rounded-xl backdrop-blur-sm">
              {error}
            </div>
          )}

          <div className="text-right">
            <a href="#" className="text-sm text-brand-primary hover:text-brand-primary-light transition-colors">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            disabled={isLoading || isBlocked}
            className={`w-full p-4 rounded-xl font-bold transition-all duration-300 ${
              isBlocked 
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                : 'bg-gradient-primary text-white hover:shadow-xl transform hover:scale-[1.02] shadow-lg'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? "Logging In..." : isBlocked ? `🔒 Wait ${remainingTime}s` : "Log In"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-8">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToJoin}
            className="font-medium text-brand-primary hover:text-brand-primary-light transition-colors"
          >
            Join now
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
