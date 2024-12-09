import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user info from localStorage
    navigate('/'); // Redirect to the landing page
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      {/* Navigation Links */}
      <div>
        <Link to="/blogs" className="mr-4 hover:text-gray-400">
          Blogs
        </Link>
        <Link to="/create" className="mr-4 hover:text-gray-400">
          Create Blog
        </Link>
      </div>

      {/* User Profile Section */}
      <div className="relative flex items-center">
        {user && (
          <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="mr-4">{user.displayName}</span>
          </div>
        )}

        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded shadow-lg z-10">
            <button
              onClick={() => navigate('/profile')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-600"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
