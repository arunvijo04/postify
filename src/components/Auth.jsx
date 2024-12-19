import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"; // Assuming Firestore is initialized in firebase.js
import { FaGoogle } from 'react-icons/fa';  // Google icon from react-icons
import { AiOutlineMail } from 'react-icons/ai';  // Email icon from react-icons
import bgImage from '../assets/bg.jpg'; // Background image

function Auth() {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const messages = [
    'Welcome to Our Blog Platform',
    'Create Your First Blog',
    'Explore Stories From Around the World',
  ];

  useEffect(() => {
    const typingInterval = setInterval(() => {
      const message = messages[index % messages.length];
      setCurrentText(message.slice(0, currentText.length + 1));

      if (currentText === message) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentText('');
          setIndex(index + 1);
        }, 2000); // Pause before transitioning to the next message
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentText, index]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/blogs");
    } catch (error) {
      setError("Failed to sign in with Google.");
    }
  };

  const signInWithEmail = async () => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/events");
    } catch (error) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative z-10 text-center text-white max-w-lg px-8 py-10 rounded-lg bg-black bg-opacity-50 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 animate-pulse">{currentText}</h1>
        <p className="mb-8 text-lg font-light">
          Sign in with Google or Email to create, share, and explore blogs.
        </p>

        {/* Display error message */}
        {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

        <div className="space-y-4">
          {/* Email and Password Fields */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full py-3 px-4 rounded-lg text-lg  border-none shadow-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full py-3 px-4 rounded-lg text-lg  border-none shadow-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={signInWithEmail}
              className="w-full py-3 rounded-lg text-lg font-semibold shadow-lg focus:outline-none flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              <AiOutlineMail className="w-6 h-6 mr-3" />
              Sign in with Email
            </button>
            <button
              onClick={signInWithGoogle}
              className="w-full py-3 rounded-lg text-lg font-semibold shadow-lg focus:outline-none flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 transition duration-200 ease-in-out"
            >
              <FaGoogle className="w-6 h-6 mr-3" />
              Sign in with Google
            </button>
            <p className="mb-8 text-lg font-light">
            Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
