
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Community: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunityPosts();
  }, [isAuthenticated]);

  const fetchCommunityPosts = async () => {
    try {
      const headers: any = { 'Content-Type': 'application/json' };
      if (isAuthenticated) {
        const token = localStorage.getItem('token');
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch('http://localhost:8080/api/community.php', { headers });
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Fetch community posts error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <span className="inline-block px-6 py-2 bg-gradient-primary/20 backdrop-blur-sm rounded-full text-sm font-medium border border-brand-primary/30 mb-8 text-brand-primary">
          👥 Community Hub
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-brand-primary-light to-brand-secondary bg-clip-text text-transparent mb-6">
          Share & Discover
        </h1>
        <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
          Connect with passionate food lovers, share your culinary creations, and get inspired by the community
        </p>
        <div className="w-32 h-1 bg-gradient-primary mx-auto mt-8 rounded-full"></div>
      </div>

      {!isAuthenticated && (
        <div className="bg-brand-accent/20 border border-brand-accent/30 backdrop-blur-xl text-white p-6 rounded-2xl shadow-xl mb-16 max-w-3xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🔐</div>
            <div>
              <h3 className="font-bold text-lg mb-2">Join the Community</h3>
              <p>Please <button className="font-bold underline text-brand-accent hover:text-brand-accent/80 transition-colors">sign in</button> to share your recipes and interact with fellow food enthusiasts.</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mb-4"></div>
          <p className="text-gray-300 text-lg">Loading community posts...</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {posts.length > 0 ? (
            posts.map(post => (
              <div 
                key={post.id} 
                className="group bg-brand-surface/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-brand-surface/30"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <div className="p-6 flex items-center justify-between border-b border-brand-surface/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-bold text-lg">
                      {post.first_name?.charAt(0).toUpperCase() || 'F'}
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">{post.first_name} {post.last_name}</p>
                      <p className="text-sm text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-brand-primary transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
                
                <div className="px-6 pt-4">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-primary-light transition-colors">{post.title}</h3>
                </div>
                
                {post.photo_url && (
                  <div className="px-6 mb-4">
                    <img src={post.photo_url} alt={post.title} className="w-full h-80 object-cover rounded-2xl"/>
                  </div>
                )}
                
                <div className="p-6">
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">{post.caption}</p>
                  <div className="flex items-center gap-6 text-gray-400">
                    <div className="flex items-center gap-2 hover:text-red-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="font-medium">{post.like_count} likes</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-brand-secondary transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="font-medium">{post.comment_count} comments</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">💬</div>
              <h3 className="text-2xl font-bold text-white mb-4">No Posts Yet</h3>
              <p className="text-gray-300 text-lg">Be the first to share your culinary creation with the community!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Community;
