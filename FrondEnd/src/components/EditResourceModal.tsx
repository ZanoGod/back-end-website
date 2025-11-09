import React, { useState } from 'react';

interface Resource {
  id: number;
  title: string;
  description: string;
  link: string;
}

interface EditResourceModalProps {
  resource: Resource;
  type: 'culinary' | 'educational';
  onClose: () => void;
  onSave: (resourceId: number, type: string, data: any) => void;
}

const EditResourceModal: React.FC<EditResourceModalProps> = ({ resource, type, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: resource.title,
    description: resource.description,
    link: resource.link
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.title.trim()) return;
    
    setSaving(true);
    try {
      await onSave(resource.id, type, formData);
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
            <h2 className="text-xl font-bold text-brand-dark">Edit {type === 'culinary' ? 'Culinary' : 'Educational'} Resource</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving || !formData.title.trim()}
              className="flex-1 px-4 py-2 bg-brand-orange text-white rounded hover:bg-brand-orange-light disabled:opacity-50"
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

export default EditResourceModal;