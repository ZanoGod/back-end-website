import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHatIcon, FacebookIcon, InstagramIcon, TwitterIcon, PinterestIcon } from './icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-dark/95 backdrop-blur-xl border-t border-brand-surface/30 text-white pt-20 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-6 group">
                            <ChefHatIcon className="w-10 h-10 text-brand-primary group-hover:text-brand-primary-light transition-colors" />
                            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">FoodFusion</span>
                        </Link>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Promoting home cooking and culinary creativity among food enthusiasts worldwide.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/Zinwaiyan.2002/" className="text-gray-400 hover:text-brand-primary transition-all duration-300 p-2 rounded-lg hover:bg-brand-surface/30"><FacebookIcon className="w-6 h-6" /></a>
                            <a href="https://www.instagram.com/zin_waiyan_20" className="text-gray-400 hover:text-brand-primary transition-all duration-300 p-2 rounded-lg hover:bg-brand-surface/30"><InstagramIcon className="w-6 h-6" /></a>
                            <a href="https://x.com/" className="text-gray-400 hover:text-brand-primary transition-all duration-300 p-2 rounded-lg hover:bg-brand-surface/30"><TwitterIcon className="w-6 h-6" /></a>
                            <a href="https://www.pinterest.com/ideas/food-cuisines/954675036989/" className="text-gray-400 hover:text-brand-primary transition-all duration-300 p-2 rounded-lg hover:bg-brand-surface/30"><PinterestIcon className="w-6 h-6" /></a>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div>   
                        <h3 className="font-bold text-lg mb-6 tracking-wider text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-gray-400 hover:text-brand-primary transition-all duration-300 text-sm hover:translate-x-1">About Us</Link></li>
                            <li><Link to="/recipes" className="text-gray-400 hover:text-brand-primary transition-all duration-300 text-sm hover:translate-x-1">Recipe Collection</Link></li>
                            <li><Link to="/community" className="text-gray-400 hover:text-brand-primary transition-all duration-300 text-sm hover:translate-x-1">Community Cookbook</Link></li>
                            <li><Link to="/culinary-resources" className="text-gray-400 hover:text-brand-primary transition-all duration-300 text-sm hover:translate-x-1">Culinary Resources</Link></li>
                            <li><Link to="/resources" className="text-gray-400 hover:text-brand-primary transition-all duration-300 text-sm hover:translate-x-1">Educational Resources</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-brand-primary transition-all duration-300 text-sm hover:translate-x-1">Contact Us</Link></li>
                        </ul>
                    </div>
                    {/* Categories */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 tracking-wider text-white">Categories</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 text-sm hover:translate-x-1">Vegetarian</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 text-sm hover:translate-x-1">Vegan</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 text-sm hover:translate-x-1">Gluten-Free</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 text-sm hover:translate-x-1">Quick Meals</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 text-sm hover:translate-x-1">Desserts</a></li>
                        </ul>
                    </div>
                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 tracking-wider text-white">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Subscribe for weekly recipes and cooking tips.
                        </p>
                        <form className="flex rounded-xl overflow-hidden shadow-lg">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-brand-surface/50 backdrop-blur-sm text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary border-0 placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-primary text-white px-6 py-3 font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                Sub
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-brand-surface/30 mt-12 pt-8 text-center text-gray-500 text-sm">
                    <p className="mb-4">&copy; {new Date().getFullYear()} FoodFusion. All rights reserved.</p>
                    <div className="flex justify-center items-center space-x-6">
                        <a href="https://policies.google.com/" className="hover:text-brand-primary transition-colors duration-300">Privacy Policy</a>
                        <span className="text-gray-600">&bull;</span>
                        <a href="https://policies.google.com/" className="hover:text-brand-primary transition-colors duration-300">Terms of Service</a>
                        <span className="text-gray-600">&bull;</span>
                        <a href="https://policies.google.com/" className="hover:text-brand-primary transition-colors duration-300">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;