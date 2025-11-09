
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { ChefHatIcon } from './icons';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';

interface HeaderProps {
    onJoinClick: () => void;
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onJoinClick, onLoginClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await authApi.logout();
            logout();
        } catch (error) {
            console.error('Logout error:', error);
            logout();
        }
    };

    const linkClasses = "py-3 px-4 block rounded-xl transition-all duration-300 font-medium";
    const activeLinkClasses = "bg-gradient-primary text-white shadow-lg";
    const inactiveLinkClasses = "text-gray-300 hover:bg-surface/50 hover:text-white backdrop-blur-sm";

    return (
        <header className="bg-brand-dark/90 backdrop-blur-xl sticky top-0 z-50 shadow-2xl border-b border-brand-surface/30">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <NavLink to="/" className="flex items-center gap-3 group">
                        <ChefHatIcon className="w-10 h-10 text-brand-primary group-hover:text-brand-primary-light transition-colors" />
                        <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">FoodFusion</span>
                    </NavLink>

                    <div className="hidden lg:flex items-center space-x-2">
                        {NAV_LINKS.map(link => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center space-x-3">
                        {isAuthenticated ? (
                            <>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                                >
                                    Dashboard
                                </NavLink>
                                <span className="text-gray-300 font-medium px-3">
                                    Welcome, {user?.firstName}!
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="py-3 px-6 rounded-xl bg-red-500/80 text-white font-medium hover:bg-red-500 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={onLoginClick}
                                    className="py-3 px-6 rounded-xl text-gray-300 font-medium hover:bg-brand-surface/50 transition-all duration-300 backdrop-blur-sm">
                                    Login
                                </button>
                                <button
                                    onClick={onJoinClick}
                                    className="py-3 px-6 rounded-xl bg-gradient-primary text-white font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    Join
                                </button>
                            </>
                        )}
                    </div>

                    <button
                        className="lg:hidden text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-brand-surface/50"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="lg:hidden mt-6">
                        <div className="flex flex-col space-y-3 bg-brand-surface/50 backdrop-blur-xl rounded-2xl p-4 border border-brand-surface/30">
                             {NAV_LINKS.map(link => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) => `${linkClasses} text-center ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            {isAuthenticated ? (
                                <>
                                    <NavLink
                                        to="/dashboard"
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) => `${linkClasses} text-center ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <span className="text-center text-gray-300 font-medium py-2">
                                        Welcome, {user?.firstName}!
                                    </span>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="py-3 px-6 rounded-xl bg-red-500/80 text-white font-medium hover:bg-red-500 transition-all duration-300 backdrop-blur-sm shadow-lg"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            onLoginClick();
                                            setIsMenuOpen(false);
                                        }}
                                        className="py-3 px-6 rounded-xl text-gray-300 font-medium hover:bg-brand-surface/50 transition-all duration-300">
                                        Login
                                    </button>
                                    <button
                                        onClick={() => {
                                            onJoinClick();
                                            setIsMenuOpen(false);
                                        }}
                                        className="py-3 px-6 rounded-xl bg-gradient-primary text-white font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        Join
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
