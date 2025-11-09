import React, { useState } from "react";
import { authApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await authApi.signup({ firstName, lastName, email, password, confirmPassword });
      if (!response.success) {
        throw new Error(response.message || "Failed to create an account.");
      }
      
      if (response.token && response.user) {
        login(response.token, response.user);
        setSuccess("Account created successfully! Welcome to FoodFusion!");
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create an account. Please try again.");
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
        className="bg-brand-surface/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md m-4 transform transition-all duration-300 border border-brand-surface/30 max-h-[90vh] overflow-y-auto"
        style={
          isOpen
            ? { transform: "scale(1)", opacity: 1 }
            : { transform: "scale(0.95)", opacity: 0 }
        }
        onClick={stopPropagation}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Join Our Culinary Community
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none p-2 rounded-lg hover:bg-brand-surface/50 transition-all"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-300 mb-8 leading-relaxed">
          Create your free account to save recipes, join discussions, and more!
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full p-4 bg-brand-dark/50 backdrop-blur-sm border border-brand-surface/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-gray-400 transition-all"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full p-4 bg-brand-dark/50 backdrop-blur-sm border border-brand-surface/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-gray-400 transition-all"
            />
          </div>
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
          <p className="text-xs text-gray-400">
            Password must be at least 8 characters.
          </p>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-4 bg-brand-dark/50 backdrop-blur-sm border border-brand-surface/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-gray-400 transition-all"
          />
          {error && (
            <div className="text-sm text-left p-4 rounded-xl backdrop-blur-sm bg-red-500/20 text-red-400 border border-red-500/30">
              {error}
            </div>
          )}
          {success && (
            <div className="text-sm text-left p-4 rounded-xl backdrop-blur-sm bg-green-500/20 text-green-400 border border-green-500/30">
              {success}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-primary text-white p-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-8">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="font-medium text-brand-primary hover:text-brand-primary-light transition-colors"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};
// ...existing code...

export default JoinModal;
