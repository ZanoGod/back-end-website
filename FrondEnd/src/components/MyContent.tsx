import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import RecipeDetail from './RecipeDetail';
import PostDetail from './PostDetail';
import ResourceDetail from './ResourceDetail';

interface UserContent {
  recipes: any[];
  posts: any[];
  culinary_resources: any[];
  educational_resources: any[];
}

const MyContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [content, setContent] = useState<UserContent>({
    recipes: [],
    posts: [],
    culinary_resources: [],
    educational_resources: []
  });
  const [activeTab, setActiveTab] = useState('recipes');
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [selectedResource, setSelectedResource] = useState<{item: any, type: 'culinary' | 'educational'} | null>(null);

  // Debug logging
  useEffect(() => {
    console.log('Selected recipe changed:', selectedRecipe);
  }, [selectedRecipe]);

  useEffect(() => {
    console.log('Selected resource changed:', selectedResource);
  }, [selectedResource]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyContent();
    }
  }, [isAuthenticated]);

  const fetchMyContent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/my-content.php', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setContent(data.data);
      }
    } catch (error) {
      console.error('Fetch content error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: number) => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8080/api/like-post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ post_id: postId })
      });
      fetchMyContent();
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const handleComment = async (postId: number, comment: string) => {
    if (!comment.trim()) return;
    
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8080/api/add-comment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ post_id: postId, comment })
      });
      fetchMyContent();
    } catch (error) {
      console.error('Comment error:', error);
    }
  };

  const handleEditPost = async (postId: number, data: { title: string; caption: string; photo_url?: string }) => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8080/api/edit-post.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ post_id: postId, ...data })
      });
      fetchMyContent();
    } catch (error) {
      console.error('Edit post error:', error);
    }
  };

  const handleEditRecipe = async (recipeId: number, data: any) => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8080/api/edit-recipe.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ recipe_id: recipeId, ...data })
      });
      fetchMyContent();
    } catch (error) {
      console.error('Edit recipe error:', error);
    }
  };

  const handleEditResource = async (resourceId: number, type: string, data: any) => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8080/api/edit-resource.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ resource_id: resourceId, type, ...data })
      });
      fetchMyContent();
    } catch (error) {
      console.error('Edit resource error:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading your content...</div>;
  }

  const tabs = [
    { id: 'recipes', label: 'Recipes', count: content.recipes.length },
    { id: 'posts', label: 'Posts', count: content.posts.length },
    { id: 'culinary', label: 'Culinary', count: content.culinary_resources.length },
    { id: 'educational', label: 'Educational', count: content.educational_resources.length }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Content</h2>
      
      <div className="border-b border-gray-300 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-gray-200 text-black '
                  : 'border-transparent text-brand-gray hover:text-brand-primary'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-4">
        {activeTab === 'recipes' && (
          <>
            {content.recipes.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍳</div>
                <p className="text-gray-500 text-lg">No recipes yet</p>
                <p className="text-gray-400 text-sm">Create your first recipe to get started!</p>
              </div>
            ) : (
              content.recipes.map((recipe) => (
                <div 
                  key={recipe.id} 
                  className="bg-white border border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-lg hover:border-brand-orange transition-all duration-200" 
                  onClick={() => {
                    console.log('Recipe clicked:', recipe.id);
                    setSelectedRecipe(recipe);
                  }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
                  <div className="flex gap-4 text-xs text-gray-800 mb-2">
                    <span>Cuisine: {recipe.cuisine || 'N/A'}</span>
                    <span>Difficulty: {recipe.difficulty}</span>
                    <span>Prep: {recipe.prep_time}min</span>
                    <span>Cook: {recipe.cook_time}min</span>
                  </div>
                   <div className="text-xs text-brand-orange font-medium">Click to view details →</div>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === 'posts' && (
          <>
            {content.posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-500 text-lg">No posts yet</p>
                <p className="text-gray-400 text-sm">Share your culinary journey with the community!</p>
              </div>
            ) : (
              content.posts.map((post) => (
                <div key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-brand-orange" onClick={() => setSelectedPost(post)}>
                  {post.photo_url && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img src={post.photo_url} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-brand-gray-dark text-sm mb-4 line-clamp-3">{post.caption}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-brand-accent text-sm font-medium">
                          ❤️ {post.like_count}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500 text-sm">
                          💬 {post.comment_count}
                        </span>
                      </div>
                      <span className="text-xs text-brand-orange font-medium">View Details →</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === 'culinary' && (
          <>
            {content.culinary_resources.length === 0 ? (
              <p className="text-gray-500">No culinary resources yet.</p>
            ) : (
              content.culinary_resources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg hover:border-brand-orange transition-all duration-200" 
                  onClick={() => {
                    console.log('Culinary resource clicked:', resource.id);
                    setSelectedResource({item: resource, type: 'culinary'});
                  }}
                >
                  <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                  <div className="text-xs text-brand-orange font-medium">Click to view details →</div>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === 'educational' && (
          <>
            {content.educational_resources.length === 0 ? (
              <p className="text-gray-500">No educational resources yet.</p>
            ) : (
              content.educational_resources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg hover:border-brand-orange transition-all duration-200" 
                  onClick={() => {
                    console.log('Educational resource clicked:', resource.id);
                    setSelectedResource({item: resource, type: 'educational'});
                  }}
                >
                  <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                  <div className="text-xs text-brand-orange font-medium">Click to view details →</div>
                </div>
              ))
            )}
          </>
        )}
      </div>
      
      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onEdit={handleEditRecipe}
          isOwner={true}
        />
      )}
      
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={handleLike}
          onComment={handleComment}
          onEdit={handleEditPost}
          isOwner={true}
        />
      )}
      
      {selectedResource && (
        <ResourceDetail
          resource={selectedResource.item}
          type={selectedResource.type}
          onClose={() => setSelectedResource(null)}
          onEdit={handleEditResource}
          isOwner={true}
        />
      )}
    </div>
  );
};

export default MyContent;