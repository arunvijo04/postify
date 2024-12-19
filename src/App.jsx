import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import CreateBlog from './components/CreateBlog';
import Profile from './components/Profile';
import BlogDetails from './components/BlogDetails';
import Navbar from './components/Navbar';
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);// Check for user data

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen">
      <Navbar user={user} />
      <main>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blogs" element={user ? <Blogs /> : <Navigate to="/" />} />
          <Route path="/blog/:id" element={user ? <BlogDetails /> : <Navigate to="/" />} />
          <Route path="/create" element={user ? <CreateBlog /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
          <Route path="*" element={<div className="text-center text-gray-300 text-xl mt-20">404: Page Not Found</div>} />
        </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
