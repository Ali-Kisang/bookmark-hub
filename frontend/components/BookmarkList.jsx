import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExternalLink, Trash2, Edit, Search } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function BookmarkList() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  
    useEffect(() => {
        fetchBookmarks();
    }, []);
  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(`${API_URL}/bookmarks`);
      setBookmarks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      try {
        await axios.delete(`${API_URL}/bookmarks/${id}`);
        fetchBookmarks();
      } catch (error) {
        console.error('Error deleting bookmark:', error);
      }
    }
  };

  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookmarks</h1>
        <p className="text-gray-600">Manage and organize your favorite links</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search bookmarks by title, description, or tags..."
          className="input-field pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Bookmarks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookmarks.map((bookmark) => (
          <div key={bookmark.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{bookmark.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(bookmark.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {bookmark.description || 'No description'}
            </p>
            
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary-600 hover:text-primary-700 text-sm mb-4"
            >
              {new URL(bookmark.url).hostname}
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
            
            <div className="flex flex-wrap gap-2">
              {bookmark.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t text-xs text-gray-500">
              Added {new Date(bookmark.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {filteredBookmarks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No bookmarks found. Add your first bookmark!</p>
        </div>
      )}
    </div>
  );
}

export default BookmarkList;