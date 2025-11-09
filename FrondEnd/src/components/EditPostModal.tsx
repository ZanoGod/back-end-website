import React, { useState } from 'react';

interface Post {
  id: number;
  title: string;
  caption: string;
  photo_url?: string;
}

interface EditPostModalProps {
  post: Post;
  onClose: () => void;
  onSave: (postId: number, data: { title: string; caption: string; photo_url?: string }) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ post, onClose, onSave }) => {
  const [title, setTitle] = useState(post.title);
  const [caption, setCaption] = useState(post.caption);
  const [photoUrl, setPhotoUrl] = useState(post.photo_url || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;
    
    setSaving(true);
    try {
      await onSave(post.id, { title, caption, photo_url: photoUrl });
      onClose();
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-brand-dark">Edit Post</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                placeholder="Post title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                placeholder="What's on your mind?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL (optional)</label>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving || !title.trim()}
              className="flex-1 px-4 py-2 bg-brand-orange text-white rounded hover:bg-brand-orange-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;