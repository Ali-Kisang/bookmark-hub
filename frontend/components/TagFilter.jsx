import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tag as TagIcon, Hash, Filter, Bookmark, ExternalLink } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function TagFilter() {
  const [tags, setTags] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      filterBookmarksByTag(selectedTag);
    }
  }, [selectedTag, bookmarks]);

  const fetchData = async () => {
    try {
      const [tagsResponse, bookmarksResponse] = await Promise.all([
        axios.get(`${API_URL}/tags`),
        axios.get(`${API_URL}/bookmarks`)
      ]);
      
      setTags(tagsResponse.data);
      setBookmarks(bookmarksResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const filterBookmarksByTag = (tag) => {
    const filtered = bookmarks.filter(bookmark => 
      bookmark.tags && bookmark.tags.includes(tag)
    );
    setFilteredBookmarks(filtered);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const clearFilter = () => {
    setSelectedTag(null);
    setFilteredBookmarks([]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tags & Categories</h1>
        <p className="text-gray-600">Filter your bookmarks by tags</p>
      </div>

      {/* Tags Cloud */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="h-5 w-5 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-900">All Tags</h2>
          <span className="ml-auto px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
            {tags.length} tags
          </span>
        </div>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(tag)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedTag === tag
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <TagIcon className="h-4 w-4" />
                <span>{tag}</span>
                <span className="text-xs opacity-75">
                  ({bookmarks.filter(b => b.tags && b.tags.includes(tag)).length})
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <TagIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No tags yet. Add some tags to your bookmarks!</p>
          </div>
        )}
      </div>

      {/* Filtered Results */}
      {selectedTag && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-primary-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Bookmarks tagged "{selectedTag}"
                </h2>
                <p className="text-gray-600 text-sm">
                  {filteredBookmarks.length} bookmark{filteredBookmarks.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
            <button
              onClick={clearFilter}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Clear filter
            </button>
          </div>

          {filteredBookmarks.length > 0 ? (
            <div className="space-y-4">
              {filteredBookmarks.map((bookmark) => (
                <div key={bookmark.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Bookmark className="h-4 w-4 text-gray-400" />
                        <h3 className="font-medium text-gray-900">{bookmark.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {bookmark.description || 'No description'}
                      </p>
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                      >
                        {new URL(bookmark.url).hostname}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {bookmark.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 text-xs rounded-full ${
                            tag === selectedTag
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No bookmarks found with this tag.</p>
            </div>
          )}
        </div>
      )}

      {/* Tag Statistics */}
      {!selectedTag && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Most Used Tags */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Most Used Tags</h3>
            <div className="space-y-3">
              {tags
                .map(tag => ({
                  name: tag,
                  count: bookmarks.filter(b => b.tags && b.tags.includes(tag)).length
                }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5)
                .map((tag, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{tag.name}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                      {tag.count} bookmark{tag.count !== 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Tag Management Tips */}
          <div className="bg-blue-50 rounded-lg border border-blue-100 p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Tag Management Tips</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Use consistent naming (e.g., "web-dev" not "webdev", "web_development")</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Keep tags lowercase for consistency</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Combine general and specific tags (e.g., "react", "hooks", "tutorial")</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Limit to 3-5 tags per bookmark for better organization</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-blue-100">
              <Link
                to="/add"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
              >
                <TagIcon className="h-4 w-4" />
                Add bookmarks with tags
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TagFilter;