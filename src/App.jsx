import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import CreateBlog from './components/CreateBlog';
import Profile from './components/Profile';
import BlogDetails from './components/BlogDetails';
import Navbar from './components/Navbar';

function App() {
  const user = localStorage.getItem('user'); // Check for user data

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen">
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={user ? <Navigate to="/blogs" /> : <Auth />} />
          <Route path="/blogs" element={user ? <Blogs /> : <Navigate to="/" />} />
          <Route path="/blog/:id" element={user ? <BlogDetails /> : <Navigate to="/" />} />
          <Route path="/create" element={user ? <CreateBlog /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
          <Route path="*" element={<div className="text-center text-gray-300 text-xl mt-20">404: Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
