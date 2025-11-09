import React, { useState } from 'react';
import EditPostModal from './EditPostModal';

interface Post {
  id: number;
  title: string;
  caption: string;
  photo_url?: string;
  like_count: number;
  comment_count: number;
  liked_by?: string;
  comments?: string;
  created_at: string;
}

interface PostDetailProps {
  post: Post;
  onClose: () => void;
  onLike: (postId: number) => void;
  onComment: (postId: number, comment: string) => void;
  onEdit?: (postId: number, data: { title: string; caption: string; photo_url?: string }) => void;
  isOwner?: boolean;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onClose, onLike, onComment, onEdit, isOwner = false }) => {
  const [newComment, setNewComment] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const handleComment = () => {
    if (newComment.trim()) {
      onComment(post.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-brand-dark flex-1">{post.title}</h2>
            <div className="flex items-center gap-2">
              {isOwner && onEdit && (
                <button
                  onClick={() => setShowEditModal(true)}
                  className="px-3 py-1 text-sm text-brand-dark bg-gray-200 border-gray-800 rounded hover:bg-gray-800 transition-colors hover:text-white"
                >
                  Edit
                </button>
              )}
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
          </div>
          
          {post.photo_url && (
            <img src={post.photo_url} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          )}
          
          <div className="mb-4">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.caption}</p>
          </div>
          
          <div className="flex items-center gap-6 mb-4 py-3 border-y border-gray-100">
            <button
              onClick={() => onLike(post.id)}
              className="flex items-center gap-2 text-brand-orange hover:text-brand-orange-light transition-colors"
            >
              <span className="text-lg">❤️</span>
              <span className="font-medium">{post.like_count}</span>
              <span className="text-sm text-gray-600">likes</span>
            </button>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-lg">💬</span>
              <span className="font-medium">{post.comment_count}</span>
              <span className="text-sm">comments</span>
            </div>
          </div>

          {post.liked_by && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Liked by:</span> {post.liked_by}
              </p>
            </div>
          )}

          {post.comments && (
            <div className="mb-4">
              <h3 className="font-semibold mb-3 text-brand-orange">Comments</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {post.comments.split(' | ').map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">{comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-100 pt-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 p-3 border border-brand-bg  rounded-lg text-brand-dark focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
              />
              <button
                onClick={handleComment}
                disabled={!newComment.trim()}
                className="px-6 py-3 bg-brand-orange text-white rounded-lg text-sm hover:bg-brand-orange-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-400 text-center">
            Created: {new Date(post.created_at).toLocaleDateString()}
          </div>
        </div>
        
        {showEditModal && onEdit && (
          <EditPostModal
            post={post}
            onClose={() => setShowEditModal(false)}
            onSave={onEdit}
          />
        )}
      </div>
    </div>
  );
};

export default PostDetail;