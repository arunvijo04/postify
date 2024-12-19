import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; 

const Navbar = ({user})=> {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); 
  const location = useLocation();// Reference to the dropdown menu

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
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

  const isAdminPage = location.pathname === "/register"; 

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-semibold">
        <Link to="/blogs" className="hover:text-gray-400">
          Postify
        </Link>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center space-x-4 md:space-x-6">
      {!user ? (
          <>
            <Link
              to="/"
              className="text-base md:text-lg text-blue-600 hover:text-blue-800 font-semibold transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-base md:text-lg text-blue-600 hover:text-blue-800 font-semibold transition duration-300"
            >
              Register
            </Link>
          </>
        ) : isAdminPage ? (
          <button
            onClick={handleLogout}
            className="text-base md:text-lg text-red-600 hover:text-blue-800 font-semibold transition duration-300"
          >
            Logout
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <img
              src={user.photoURL} // Display user's profile image
              alt="User Profile"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
            />
            <span
              onClick={toggleDropdown} // Trigger navigation to Profile page
              className="text-base md:text-lg font-semibold text-blue-600 cursor-pointer hover:text-blue-800"
            >
              {user.displayName || user.email}
            </span>
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
