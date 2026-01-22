import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Bookmark, Plus, Tag, Home, Search } from 'lucide-react';
import TagFilter from '../components/TagFilter';
import AddBookmark from '../components/AddBookmark';
import BookmarkList from '../components/BookmarkList';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Bookmark className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">BookmarkHub</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600">
                  <Home className="h-5 w-5 mr-1" />
                  Home
                </Link>
                <Link to="/add" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600">
                  <Plus className="h-5 w-5 mr-1" />
                  Add Bookmark
                </Link>
                <Link to="/tags" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600">
                  <Tag className="h-5 w-5 mr-1" />
                  Tags
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<BookmarkList />} />
            <Route path="/add" element={<AddBookmark />} />
            <Route path="/tags" element={<TagFilter />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;