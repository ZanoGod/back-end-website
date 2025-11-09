import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center text-white text-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-gray to-brand-dark"></div>
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{ 
                        backgroundImage: 'url(https://picsum.photos/seed/spices/1600/900)', 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        transform: `translateY(${scrollY * 0.5}px)`,
                        filter: 'blur(1px)'
                    }}
                ></div>
                
                <div className="absolute top-20 left-10 w-20 h-20 bg-brand-primary/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-32 right-16 w-32 h-32 bg-brand-secondary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 right-20 w-16 h-16 bg-brand-accent/20 rounded-full blur-xl animate-pulse delay-500"></div>
                
                <div className="relative z-10 max-w-5xl animate-fade-in-up">
                    <span className="inline-block px-8 py-3 bg-gradient-primary/20 backdrop-blur-sm rounded-full text-sm font-medium border border-brand-primary/30 mb-8">
                        ✨ Welcome to FoodFusion
                    </span>
                    <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tight bg-gradient-to-r from-white via-brand-primary-light to-brand-secondary bg-clip-text text-transparent leading-none">
                        Culinary
                        <br />Excellence
                    </h1>
                    <p className="text-2xl md:text-3xl mb-16 max-w-3xl mx-auto text-gray-300 leading-relaxed font-light">
                        Discover extraordinary recipes, connect with passionate chefs, and elevate your cooking journey
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/recipes">
                            <button className="group bg-gradient-primary text-white font-bold py-5 px-12 rounded-2xl text-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 shadow-xl">
                                Explore Recipes
                                <svg className="inline w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </Link>
                        <Link to="/community">
                            <button className="group bg-brand-surface/50 backdrop-blur-xl text-white font-bold py-5 px-12 rounded-2xl text-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-brand-surface/30">
                                Join Community
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <span className="inline-block px-6 py-2 bg-gradient-primary/20 backdrop-blur-sm rounded-full text-sm font-medium border border-brand-primary/30 mb-8 text-brand-primary">
                            🚀 Platform Features
                        </span>
                        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-brand-primary-light bg-clip-text text-transparent mb-6">
                            Everything You Need
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            From recipe discovery to community engagement, we've built the ultimate culinary platform
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group bg-brand-surface/30 backdrop-blur-xl p-8 rounded-3xl border border-brand-surface/30 hover:border-brand-primary/50 transition-all duration-500 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Recipe Library</h3>
                            <p className="text-gray-300 leading-relaxed">Access thousands of curated recipes from professional chefs and home cooks worldwide</p>
                        </div>
                        
                        <div className="group bg-brand-surface/30 backdrop-blur-xl p-8 rounded-3xl border border-brand-surface/30 hover:border-brand-secondary/50 transition-all duration-500 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Community Hub</h3>
                            <p className="text-gray-300 leading-relaxed">Connect with fellow food enthusiasts, share your creations, and get inspired</p>
                        </div>
                        
                        <div className="group bg-brand-surface/30 backdrop-blur-xl p-8 rounded-3xl border border-brand-surface/30 hover:border-brand-accent/50 transition-all duration-500 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-r from-brand-accent to-brand-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Smart Learning</h3>
                            <p className="text-gray-300 leading-relaxed">AI-powered recommendations and educational resources to improve your skills</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 px-6 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10">
                <div className="container mx-auto text-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="group">
                            <div className="text-5xl md:text-6xl font-black bg-gradient-primary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">50K+</div>
                            <div className="text-gray-300 font-medium">Recipes</div>
                        </div>
                        <div className="group">
                            <div className="text-5xl md:text-6xl font-black bg-gradient-primary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">25K+</div>
                            <div className="text-gray-300 font-medium">Chefs</div>
                        </div>
                        <div className="group">
                            <div className="text-5xl md:text-6xl font-black bg-gradient-primary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">100K+</div>
                            <div className="text-gray-300 font-medium">Community</div>
                        </div>
                        <div className="group">
                            <div className="text-5xl md:text-6xl font-black bg-gradient-primary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">4.9★</div>
                            <div className="text-gray-300 font-medium">Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recipe Showcase */}
            <section className="py-32 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <span className="inline-block px-6 py-2 bg-gradient-primary/20 backdrop-blur-sm rounded-full text-sm font-medium border border-brand-primary/30 mb-8 text-brand-primary">
                            🍳 Featured Recipes
                        </span>
                        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-brand-secondary bg-clip-text text-transparent mb-6">
                            Trending Now
                        </h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1,2,3].map((i) => (
                            <div key={i} className="group bg-brand-surface/30 backdrop-blur-xl rounded-3xl overflow-hidden border border-brand-surface/30 hover:border-brand-primary/50 transition-all duration-500 hover:-translate-y-2">
                                <div className="relative overflow-hidden">
                                    <img src={`https://picsum.photos/seed/recipe${i}/400/300`} alt="Recipe" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute top-4 right-4 bg-brand-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                                        ⭐ 4.9
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-primary-light transition-colors">
                                        Gourmet Recipe {i}
                                    </h3>
                                    <p className="text-gray-300 mb-4">Delicious and easy to make recipe perfect for any occasion</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-brand-primary font-medium">30 min</span>
                                        <button className="text-brand-primary hover:text-brand-primary-light transition-colors">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-16">
                        <Link to="/recipes">
                            <button className="bg-gradient-primary text-white font-bold py-4 px-10 rounded-2xl text-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                                View All Recipes
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20">
                <div className="container mx-auto text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white to-brand-primary-light bg-clip-text text-transparent mb-8">
                            Start Your Culinary Journey
                        </h2>
                        <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
                            Join thousands of passionate cooks and discover your next favorite recipe today
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/recipes">
                                <button className="bg-gradient-primary text-white font-bold py-5 px-12 rounded-2xl text-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                                    Get Started Free
                                </button>
                            </Link>
                            <Link to="/about">
                                <button className="bg-brand-surface/50 backdrop-blur-xl text-white font-bold py-5 px-12 rounded-2xl text-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-brand-surface/30">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Home;