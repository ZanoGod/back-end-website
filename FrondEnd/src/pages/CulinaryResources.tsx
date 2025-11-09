import React from 'react';

const CulinaryResourceCard = ({ title, description, videoUrl, downloadUrl, category, imageUrl }: { title: string; description: string; videoUrl?: string, downloadUrl?: string, category: string, imageUrl: string }) => (
    <div className="group bg-brand-surface/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-brand-surface/30 flex flex-col">
        <div className="relative overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 bg-brand-secondary/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {category}
                </span>
            </div>
        </div>
        <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-primary-light transition-colors leading-tight">{title}</h3>
            <p className="text-gray-300 flex-grow mb-6 leading-relaxed">{description}</p>
            <div className="flex flex-wrap gap-3">
                {videoUrl && (
                    <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="group/btn bg-gradient-primary text-white font-semibold py-3 px-6 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-6V7a2 2 0 00-2-2H5a2 2 0 00-2 2v3m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H5a2 2 0 00-2 2v3a2 2 0 002 2z" />
                        </svg>
                        Watch Tutorial
                    </a>
                )}
                {downloadUrl && (
                    <a href={downloadUrl} download className="bg-brand-surface/50 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl hover:bg-brand-surface transition-all duration-300 inline-flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                    </a>
                )}
            </div>
        </div>
    </div>
);

const CulinaryResources: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-gray to-brand-dark"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-6 py-2 bg-gradient-primary/20 backdrop-blur-sm rounded-full text-sm font-medium border border-brand-primary/30 mb-8 text-brand-primary">
              🍳 Master Your Craft
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-brand-primary-light to-brand-secondary bg-clip-text text-transparent mb-6">
              Culinary Resources
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Elevate your cooking with expert tutorials, professional techniques, and insider kitchen secrets from world-class chefs
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CulinaryResourceCard 
              title="Knife Skills Mastery"
              description="Learn professional knife techniques that will transform your prep work and boost your confidence in the kitchen."
              videoUrl="#"
              downloadUrl="#"
              category="Technique"
              imageUrl="https://picsum.photos/seed/knife/400/300"
            />
            <CulinaryResourceCard 
              title="The Art of Seasoning"
              description="Master the delicate balance of salt, acid, fat, and heat to create dishes that sing with flavor."
              videoUrl="#"
              downloadUrl="#"
              category="Fundamentals"
              imageUrl="https://picsum.photos/seed/seasoning/400/300"
            />
            <CulinaryResourceCard 
              title="Artisan Bread Baking"
              description="From mixing to shaping to baking, learn the ancient art of creating perfect homemade bread."
              videoUrl="#"
              downloadUrl="#"
              category="Baking"
              imageUrl="https://picsum.photos/seed/bread/400/300"
            />
            <CulinaryResourceCard 
              title="Professional Pantry Setup"
              description="Build a chef-quality pantry with essential ingredients, tools, and organization systems."
              downloadUrl="#"
              category="Organization"
              imageUrl="https://picsum.photos/seed/pantry/400/300"
            />
            <CulinaryResourceCard 
              title="Umami Unleashed"
              description="Discover the secrets of the fifth taste and learn to layer umami for incredible depth of flavor."
              videoUrl="#"
              category="Flavor Science"
              imageUrl="https://picsum.photos/seed/umami/400/300"
            />
            <CulinaryResourceCard 
              title="Food Preservation Guide"
              description="Master storage techniques to keep ingredients fresh longer and reduce food waste in your kitchen."
              downloadUrl="#"
              category="Storage"
              imageUrl="https://picsum.photos/seed/storage/400/300"
            />
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-20 px-6 bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-brand-secondary bg-clip-text text-transparent mb-6">
              Featured Content
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Exclusive content from renowned chefs and culinary experts
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-brand-surface/30 backdrop-blur-xl rounded-3xl overflow-hidden border border-brand-surface/30">
              <img src="https://picsum.photos/seed/masterclass/600/300" alt="Master Class" className="w-full h-64 object-cover" />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-brand-accent/20 text-brand-accent text-sm font-medium rounded-full border border-brand-accent/30">
                    Master Class
                  </span>
                  <span className="text-gray-400 text-sm">2 hours</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Advanced Sauce Making</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Learn to create the five mother sauces and their derivatives with Michelin-starred chef techniques.
                </p>
                <button className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Start Learning
                </button>
              </div>
            </div>
            
            <div className="bg-brand-surface/30 backdrop-blur-xl rounded-3xl overflow-hidden border border-brand-surface/30">
              <img src="https://picsum.photos/seed/workshop/600/300" alt="Workshop" className="w-full h-64 object-cover" />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-brand-primary/20 text-brand-primary text-sm font-medium rounded-full border border-brand-primary/30">
                    Live Workshop
                  </span>
                  <span className="text-gray-400 text-sm">Interactive</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Pasta Making Workshop</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Join our live interactive workshop and learn to make fresh pasta from scratch with expert guidance.
                </p>
                <button className="bg-brand-surface/50 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-surface transition-all duration-300 border border-brand-surface/30">
                  Join Workshop
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CulinaryResources;