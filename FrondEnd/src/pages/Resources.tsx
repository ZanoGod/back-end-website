import React from 'react';

const EducationalResourceCard = ({ title, description, imageUrl, downloadUrl, category }: { title: string; description: string; imageUrl: string; downloadUrl: string; category: string }) => (
    <div className="group bg-brand-surface/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-brand-surface/30 flex flex-col">
        <div className="relative overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute top-4 right-4">
                <span className="inline-block px-3 py-1 bg-brand-primary/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {category}
                </span>
            </div>
        </div>
        <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-primary-light transition-colors leading-tight">{title}</h3>
            <p className="text-gray-300 flex-grow mb-6 leading-relaxed">{description}</p>
            <a href={downloadUrl} download className="group/link bg-gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 self-start">
                Download Guide
                <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </a>
        </div>
    </div>
);

const Resources: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-gray to-brand-dark"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-6 py-2 bg-gradient-primary/20 backdrop-blur-sm rounded-full text-sm font-medium border border-brand-primary/30 mb-8 text-brand-primary">
              📚 Learning Hub
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-brand-primary-light to-brand-secondary bg-clip-text text-transparent mb-6">
              Educational Resources
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Master culinary techniques with our comprehensive guides, tutorials, and downloadable resources designed for every skill level
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EducationalResourceCard 
              title="Knife Skills Mastery"
              description="Complete guide to professional knife techniques, safety, and maintenance for efficient cooking."
              imageUrl="https://picsum.photos/seed/knives/400/300"
              downloadUrl="#"
              category="Technique"
            />
            <EducationalResourceCard 
              title="Flavor Pairing Guide"
              description="Discover the science behind flavor combinations and create harmonious dishes every time."
              imageUrl="https://picsum.photos/seed/spices2/400/300"
              downloadUrl="#"
              category="Theory"
            />
            <EducationalResourceCard 
              title="Cooking Methods Explained"
              description="Master various cooking techniques from sautéing to sous vide with detailed instructions."
              imageUrl="https://picsum.photos/seed/cooking/400/300"
              downloadUrl="#"
              category="Methods"
            />
            <EducationalResourceCard 
              title="Baking Fundamentals"
              description="Essential baking science, measurements, and techniques for perfect pastries and breads."
              imageUrl="https://picsum.photos/seed/baking/400/300"
              downloadUrl="#"
              category="Baking"
            />
            <EducationalResourceCard 
              title="Meal Planning Mastery"
              description="Strategic approach to meal planning, prep techniques, and kitchen organization systems."
              imageUrl="https://picsum.photos/seed/planning/400/300"
              downloadUrl="#"
              category="Planning"
            />
            <EducationalResourceCard 
              title="International Cuisines"
              description="Explore authentic techniques and ingredients from cuisines around the world."
              imageUrl="https://picsum.photos/seed/world/400/300"
              downloadUrl="#"
              category="Culture"
            />
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 px-6 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-brand-primary-light bg-clip-text text-transparent mb-6">
              More Learning Resources
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Expand your culinary knowledge with these additional tools and guides
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-brand-surface/30 backdrop-blur-xl p-8 rounded-3xl border border-brand-surface/30">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Video Tutorials</h3>
              <p className="text-gray-300 mb-6">Step-by-step video guides for complex techniques and recipes</p>
              <button className="text-brand-primary hover:text-brand-primary-light transition-colors font-medium flex items-center gap-2">
                Watch Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-6V7a2 2 0 00-2-2H5a2 2 0 00-2 2v3m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H5a2 2 0 00-2 2v3a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            
            <div className="bg-brand-surface/30 backdrop-blur-xl p-8 rounded-3xl border border-brand-surface/30">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Recipe Collections</h3>
              <p className="text-gray-300 mb-6">Curated recipe books organized by cuisine, skill level, and dietary needs</p>
              <button className="text-brand-secondary hover:text-brand-secondary/80 transition-colors font-medium flex items-center gap-2">
                Browse Collections
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;