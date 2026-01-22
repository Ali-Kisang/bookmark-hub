import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Zap, Filter, Users, ArrowRight, CheckCircle } from 'lucide-react';

function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Organize Your Digital World with
            <span className="text-primary-600"> BookmarkHub</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A modern, fast, and intuitive way to save, organize, and access your favorite links across all your devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/add"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/tags"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <Filter className="mr-2 h-5 w-5" />
              Browse by Tags
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Why Choose BookmarkHub?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Organization</h3>
            <p className="text-gray-600">
              Use tags, categories, and search to organize thousands of bookmarks. Never lose a link again.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Unlimited tags and categories
              </li>
              <li className="flex items-center text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Full-text search
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
            <p className="text-gray-600">
              Built with FastAPI and React for instant search and navigation. Your bookmarks load in milliseconds.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Instant search results
              </li>
              <li className="flex items-center text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Offline capability ready
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Cross-Platform</h3>
            <p className="text-gray-600">
              Access your bookmarks from any device. Docker-powered for easy deployment anywhere.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Responsive design
              </li>
              <li className="flex items-center text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                One-click Docker deployment
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">∞</div>
            <div className="text-sm text-gray-600 mt-1">Unlimited Bookmarks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">⚡</div>
            <div className="text-sm text-gray-600 mt-1">Fast Search</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">🔒</div>
            <div className="text-sm text-gray-600 mt-1">Private & Secure</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">🐳</div>
            <div className="text-sm text-gray-600 mt-1">Docker Ready</div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-2xl mb-2">1</div>
            <h3 className="font-semibold mb-2">Add Bookmarks</h3>
            <p className="text-sm text-gray-600">Save links with titles, descriptions, and tags</p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-2xl mb-2">2</div>
            <h3 className="font-semibold mb-2">Organize</h3>
            <p className="text-sm text-gray-600">Use tags to categorize and filter</p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-2xl mb-2">3</div>
            <h3 className="font-semibold mb-2">Access Anywhere</h3>
            <p className="text-sm text-gray-600">Find what you need in seconds</p>
          </div>
        </div>
        <Link
          to="/add"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Start Adding Bookmarks Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}

export default Home;