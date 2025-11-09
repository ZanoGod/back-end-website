import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PostView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const headers: any = { 'Content-Type': 'application/json' };
      if (isAuthenticated) {
        const token = localStorage.getItem('token');
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`http://localhost:8080/api/post-detail.php?id=${id}`, { headers });
      const data = await response.json();
      if (data.success) {
        setPost(data.data);
      }
    } catch (error) {
      console.error('Fetch post error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) return;
    
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8080/api/like-post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ post_id: post.id })
      });
      fetchPost();
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const handleComment = async () => {
    if (!isAuthenticated || !newComment.trim()) return;
    
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8080/api/add-comment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ post_id: post.id, comment: newComment })
      });
      setNewComment('');
      fetchPost();
    } catch (error) {
      console.error('Comment error:', error);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-6 py-12 text-center">Loading post...</div>;
  }

  if (!post) {
    return <div className="container mx-auto px-6 py-12 text-center">Post not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
      >
        ← Back
      </button>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold">
              {post.first_name?.charAt(0).toUpperCase() || 'F'}
            </div>
            <div>
              <p className="font-semibold text-brand-dark">{post.first_name} {post.last_name}</p>
              <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-brand-dark">{post.title}</h1>
        </div>

        {post.photo_url && (
          <img src={post.photo_url} alt={post.title} className="w-full h-auto object-cover" />
        )}

        <div className="p-6">
          <p className="text-gray-700 mb-6 leading-relaxed">{post.caption}</p>
          
          <div className="flex items-center gap-6 py-4 border-y border-gray-100">
            <button
              onClick={handleLike}
              disabled={!isAuthenticated}
              className={`flex items-center gap-2 ${isAuthenticated ? 'text-brand-orange hover:text-brand-orange-light' : 'text-gray-400'} transition-colors`}
            >
              <span className="text-lg">❤️</span>
              <span className="font-medium">{post.like_count}</span>
              <span className="text-sm">likes</span>
            </button>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-lg">💬</span>
              <span className="font-medium">{post.comment_count}</span>
              <span className="text-sm">comments</span>
            </div>
          </div>

          {post.liked_by && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm  text-gray-600">
                <span className="font-medium">Liked by:</span> {post.liked_by}
              </p>
            </div>
          )}

          {post.comments && (
            <div className="mt-6">
              <h3 className="font-semibold text-brand-orange mb-3">Comments</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {post.comments.split(' | ').map((comment: string, index: number) => (
                  <div key={index} className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm text-brand-gray ">{comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isAuthenticated ? (
            <div className="mt-6 border-t pt-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg  text-black focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                />
                <button
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                  className="px-6 py-3 bg-brand-orange text-white rounded-lg hover:bg-brand-orange-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg text-center">
              <p className="text-orange-700">Please log in to like and comment on posts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostView;