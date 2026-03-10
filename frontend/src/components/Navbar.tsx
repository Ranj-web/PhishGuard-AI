import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600">PhishGuard AI</h1>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link to="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                {token && (
                  <>
                    <Link to="/scan" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      Scan URL
                    </Link>
                    <Link to="/monitor" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      Monitor
                    </Link>
                    <Link to="/simulation" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      Simulation
                    </Link>
                    <Link to="/dashboard" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      Dashboard
                    </Link>
                    <Link to="/education" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      Education
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
