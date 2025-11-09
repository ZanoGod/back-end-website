import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import RecipeDetail from '../components/RecipeDetail';
import PostDetail from '../components/PostDetail';
import ResourceDetail from '../components/ResourceDetail';

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
      fetchMyContent(); // Refresh data
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

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-brand-dark mb-4">Access Denied</h1>
        <p className="text-brand-gray">Please log in to view your content.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <p className="text-brand-gray">Loading your content...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'recipes', label: 'My Recipes', count: content.recipes.length },
    { id: 'posts', label: 'My Posts', count: content.posts.length },
    { id: 'culinary', label: 'Culinary Resources', count: content.culinary_resources.length },
    { id: 'educational', label: 'Educational Resources', count: content.educational_resources.length }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-brand-dark mb-8">My Content</h1>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-brand-orange text-brand-orange'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'recipes' && (
            <div className="space-y-6">
              {content.recipes.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6">🍳</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No recipes yet</h3>
                  <p className="text-gray-500">Start sharing your favorite recipes with the community!</p>
                </div>
              ) : (
                content.recipes.map((recipe) => (
                  <div 
                    key={recipe.id} 
                    className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer hover:shadow-xl hover:border-brand-orange hover:-translate-y-1 transition-all duration-300" 
                    onClick={() => {
                      console.log('Recipe clicked:', recipe.id);
                      setSelectedRecipe(recipe);
                    }}
                  >
                    <h3 className="text-xl font-bold text-brand-dark mb-2">{recipe.title}</h3>
                    <p className="text-gray-600 mb-3">{recipe.description}</p>
                    <div className="flex gap-4 text-sm text-gray-500 mb-3">
                      <span>Cuisine: {recipe.cuisine || 'N/A'}</span>
                      <span>Difficulty: {recipe.difficulty}</span>
                      <span>Prep: {recipe.prep_time}min</span>
                      <span>Cook: {recipe.cook_time}min</span>
                      <span>Servings: {recipe.servings}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-brand-orange font-medium text-sm">View Details →</span>
                      <span className="text-xs text-gray-400">
                        {new Date(recipe.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="grid gap-6">
              {content.posts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6">📝</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No community posts yet</h3>
                  <p className="text-gray-500">Share your culinary adventures with the community!</p>
                </div>
              ) : (
                content.posts.map((post) => (
                  <div key={post.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:border-brand-orange hover:-translate-y-1" onClick={() => setSelectedPost(post)}>
                    {post.photo_url && (
                      <div className="aspect-video w-full overflow-hidden">
                        <img src={post.photo_url} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{post.caption}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-6">
                          <span className="flex items-center gap-2 text-brand-orange font-medium">
                            <span className="text-lg">❤️</span>
                            {post.like_count}
                          </span>
                          <span className="flex items-center gap-2 text-gray-500">
                            <span className="text-lg">💬</span>
                            {post.comment_count}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-brand-orange font-medium text-sm mb-1">View Details →</div>
                          <div className="text-xs text-gray-400">
                            {new Date(post.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'culinary' && (
            <div className="space-y-4">
              {content.culinary_resources.length === 0 ? (
                <p className="text-gray-500">No culinary resources posted yet.</p>
              ) : (
                content.culinary_resources.map((resource) => (
                  <div 
                    key={resource.id} 
                    className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer hover:shadow-xl hover:border-brand-orange hover:-translate-y-1 transition-all duration-300" 
                    onClick={() => {
                      console.log('Culinary resource clicked:', resource.id);
                      setSelectedResource({item: resource, type: 'culinary'});
                    }}
                  >
                    <h3 className="text-lg font-bold text-brand-dark mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-3">{resource.description}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-brand-orange font-medium text-sm">View Details →</span>
                      <span className="text-xs text-gray-400">
                        {new Date(resource.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'educational' && (
            <div className="space-y-4">
              {content.educational_resources.length === 0 ? (
                <p className="text-gray-500">No educational resources posted yet.</p>
              ) : (
                content.educational_resources.map((resource) => (
                  <div 
                    key={resource.id} 
                    className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer hover:shadow-xl hover:border-brand-orange hover:-translate-y-1 transition-all duration-300" 
                    onClick={() => {
                      console.log('Educational resource clicked:', resource.id);
                      setSelectedResource({item: resource, type: 'educational'});
                    }}
                  >
                    <h3 className="text-lg font-bold text-brand-dark mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-3">{resource.description}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-brand-orange font-medium text-sm">View Details →</span>
                      <span className="text-xs text-gray-400">
                        {new Date(resource.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
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