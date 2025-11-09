import React, { useState } from 'react';
import EditResourceModal from './EditResourceModal';

interface Resource {
  id: number;
  title: string;
  description: string;
  link: string;
  created_at: string;
}

interface ResourceDetailProps {
  resource: Resource;
  onClose: () => void;
  type: 'culinary' | 'educational';
  onEdit?: (resourceId: number, type: string, data: any) => void;
  isOwner?: boolean;
}

const ResourceDetail: React.FC<ResourceDetailProps> = ({ resource, onClose, type, onEdit, isOwner = false }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-brand-dark">{resource.title}</h2>
              <span className="text-sm text-brand-orange capitalize">{type} Resource</span>
            </div>
            <div className="flex items-center gap-2">
              {isOwner && onEdit && (
                <button
                  onClick={() => setShowEditModal(true)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Edit
                </button>
              )}
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 leading-relaxed">{resource.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Resource Link</h3>
            <div className="bg-gray-50 p-3 rounded">
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-orange hover:underline break-all"
              >
                {resource.link}
              </a>
            </div>
          </div>
          
          <div className="flex gap-3">
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-brand-orange text-white rounded hover:bg-brand-orange-light transition-colors"
            >
              Visit Resource →
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(resource.link)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
            >
              Copy Link
            </button>
          </div>
          
          <div className="mt-6 text-xs text-gray-400">
            Created: {new Date(resource.created_at).toLocaleDateString()}
          </div>
        </div>
        
        {showEditModal && onEdit && (
          <EditResourceModal
            resource={resource}
            type={type}
            onClose={() => setShowEditModal(false)}
            onSave={onEdit}
          />
        )}
      </div>
    </div>
  );
};

export default ResourceDetail;