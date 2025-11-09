
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-32 md:py-40 flex items-center justify-center text-white text-center px-4">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-gray to-brand-dark"></div>
            <div 
                className="absolute inset-0 opacity-30"
                style={{ backgroundImage: 'url(https://picsum.photos/seed/kitchen/1600/900)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            <div className="relative z-10 max-w-5xl">
                <span className="inline-block px-8 py-3 bg-gradient-primary/20 backdrop-blur-sm rounded-full text-sm font-medium border border-brand-primary/30 mb-8">
                    🍽️ About FoodFusion
                </span>
                <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight bg-gradient-to-r from-white via-brand-primary-light to-brand-secondary bg-clip-text text-transparent leading-tight">
                    Our Culinary Journey
                </h1>
                <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed font-light max-w-4xl mx-auto">
                    Discover the story behind FoodFusion and our passion for bringing people together through the universal language of food
                </p>
            </div>
        </section>

        {/* Story Section */}
        <section className="py-32 px-6">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="inline-block px-6 py-2 bg-gradient-primary/20 backdrop-blur-sm rounded-full text-sm font-medium border border-brand-primary/30 mb-8 text-brand-primary">
                            📚 Our Story
                        </span>
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-white to-brand-primary-light bg-clip-text text-transparent mb-8">
                            From Kitchen to Community
                        </h2>
                        <p className="text-xl text-gray-300 leading-relaxed mb-6">
                            FoodFusion began as a humble collection of family recipes shared among friends. What started in a small kitchen has grown into a global community of passionate food enthusiasts.
                        </p>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            We believe food is more than sustenance—it's connection, culture, and creativity. Every recipe tells a story, every dish brings people together.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="bg-brand-surface/30 backdrop-blur-xl rounded-3xl p-8 border border-brand-surface/30">
                            <img src="https://picsum.photos/seed/chefs/600/400" alt="Our Team" className="w-full rounded-2xl mb-6" />
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-2">Founded in 2020</h3>
                                <p className="text-gray-300">By passionate food lovers for food lovers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Mission Section */}
        <section className="py-32 px-6 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10">
            <div className="container mx-auto text-center">
                <span className="inline-block px-6 py-2 bg-gradient-primary/20 backdrop-blur-sm rounded-full text-sm font-medium border border-brand-primary/30 mb-8 text-brand-primary">
                    🎯 Our Mission
                </span>
                <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-brand-secondary bg-clip-text text-transparent mb-12">
                    Inspiring Culinary Excellence
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="bg-brand-surface/30 backdrop-blur-xl p-8 rounded-3xl border border-brand-surface/30">
                        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Inspire</h3>
                        <p className="text-gray-300">Spark creativity in kitchens worldwide through innovative recipes and techniques</p>
                    </div>
                    <div className="bg-brand-surface/30 backdrop-blur-xl p-8 rounded-3xl border border-brand-surface/30">
                        <div className="w-16 h-16 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Connect</h3>
                        <p className="text-gray-300">Build bridges between cultures and communities through shared culinary experiences</p>
                    </div>
                    <div className="bg-brand-surface/30 backdrop-blur-xl p-8 rounded-3xl border border-brand-surface/30">
                        <div className="w-16 h-16 bg-gradient-to-r from-brand-accent to-brand-secondary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Empower</h3>
                        <p className="text-gray-300">Provide tools and knowledge to help every cook reach their full potential</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Team Section */}
        <section className="py-32 px-6">
            <div className="container mx-auto">
                <div className="text-center mb-20">
                    <span className="inline-block px-6 py-2 bg-gradient-primary/20 backdrop-blur-sm rounded-full text-sm font-medium border border-brand-primary/30 mb-8 text-brand-primary">
                        👥 Meet the Team
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-brand-primary-light bg-clip-text text-transparent mb-6">
                        Passionate Food Experts
                    </h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {[1,2,3].map((i) => (
                        <div key={i} className="group bg-brand-surface/30 backdrop-blur-xl rounded-3xl overflow-hidden border border-brand-surface/30 hover:border-brand-primary/50 transition-all duration-500 hover:-translate-y-2">
                            <div className="relative overflow-hidden">
                                <img src={`https://picsum.photos/seed/chef${i}/400/400`} alt={`Chef ${i}`} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>
                            <div className="p-8 text-center">
                                <h3 className="text-2xl font-bold text-white mb-2">Chef Expert {i}</h3>
                                <p className="text-brand-primary font-medium mb-4">Culinary Director</p>
                                <p className="text-gray-300">Passionate about creating innovative recipes and sharing culinary knowledge</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Values Section */}
        <section className="py-32 px-6 bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10">
            <div className="container mx-auto text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-block px-6 py-2 bg-gradient-primary/20 backdrop-blur-sm rounded-full text-sm font-medium border border-brand-primary/30 mb-8 text-brand-primary">
                        ✨ Our Values
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-brand-secondary bg-clip-text text-transparent mb-12">
                        What Drives Us
                    </h2>
                    <p className="text-2xl text-gray-300 leading-relaxed mb-16">
                        We're committed to fostering a community where every cook feels welcome, inspired, and empowered to explore their culinary potential
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="text-left">
                            <h3 className="text-3xl font-bold text-white mb-4">🌍 Inclusivity</h3>
                            <p className="text-gray-300 text-lg">Celebrating diverse culinary traditions and welcoming cooks of all skill levels</p>
                        </div>
                        <div className="text-left">
                            <h3 className="text-3xl font-bold text-white mb-4">📚 Education</h3>
                            <p className="text-gray-300 text-lg">Providing comprehensive resources to help everyone become a better cook</p>
                        </div>
                        <div className="text-left">
                            <h3 className="text-3xl font-bold text-white mb-4">🌱 Sustainability</h3>
                            <p className="text-gray-300 text-lg">Promoting eco-friendly cooking practices and seasonal ingredient usage</p>
                        </div>
                        <div className="text-left">
                            <h3 className="text-3xl font-bold text-white mb-4">🚀 Innovation</h3>
                            <p className="text-gray-300 text-lg">Constantly evolving our platform with cutting-edge features and technologies</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default About;
