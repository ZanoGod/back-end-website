
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-gray to-brand-dark"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-6 py-2 bg-gradient-primary/20 backdrop-blur-sm rounded-full text-sm font-medium border border-brand-primary/30 mb-8 text-brand-primary">
              📧 Get In Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-brand-primary-light to-brand-secondary bg-clip-text text-transparent mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Have a question, recipe request, or feedback? We'd love to hear from you and help with your culinary journey!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-brand-surface/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-brand-surface/30">
              <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-4 bg-brand-dark/50 backdrop-blur-sm border border-brand-surface/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-gray-400 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-4 bg-brand-dark/50 backdrop-blur-sm border border-brand-surface/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-gray-400 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">Select a Topic</label>
                  <select id="topic" className="w-full p-4 bg-brand-dark/50 backdrop-blur-sm border border-brand-surface/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all">
                    <option className="bg-brand-dark">General Inquiry</option>
                    <option className="bg-brand-dark">Recipe Request</option>
                    <option className="bg-brand-dark">Feedback</option>
                    <option className="bg-brand-dark">Partnership</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full p-4 bg-brand-dark/50 backdrop-blur-sm border border-brand-surface/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-gray-400 transition-all resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-primary text-white p-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-brand-surface/30 backdrop-blur-xl p-8 rounded-3xl border border-brand-surface/30">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Email Us</h3>
                <p className="text-gray-300 mb-4">Get in touch via email for detailed inquiries</p>
                <a href="mailto:hello@foodfusion.com" className="text-brand-primary hover:text-brand-primary-light transition-colors font-medium">
                  hello@foodfusion.com
                </a>
              </div>

              <div className="bg-brand-surface/30 backdrop-blur-xl p-8 rounded-3xl border border-brand-surface/30">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Visit Us</h3>
                <p className="text-gray-300 mb-4">Come visit our culinary headquarters</p>
                <p className="text-gray-300">
                  123 Culinary Street<br />
                  Food District, FC 12345<br />
                  United States
                </p>
              </div>

              <div className="bg-brand-surface/30 backdrop-blur-xl p-8 rounded-3xl border border-brand-surface/30">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-accent to-brand-secondary rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Response Time</h3>
                <p className="text-gray-300 mb-4">We typically respond within</p>
                <p className="text-brand-primary font-bold text-xl">24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
