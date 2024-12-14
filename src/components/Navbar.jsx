import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown menu

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user info from localStorage
    navigate('/'); // Redirect to the landing page
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the document
    setDropdownVisible(!dropdownVisible); // Toggle the dropdown visibility
  };

  // Close the dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-semibold">
        <Link to="/" className="hover:text-gray-400">
          Postify
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

        {/* Dropdown menu */}
        {dropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-40 w-48 bg-gray-700 text-white rounded shadow-lg z-10 transition-all ease-in-out duration-200"
          >
            <button
              onClick={() => navigate('/create')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-600"
            >
              Create Blog
            </button>
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
