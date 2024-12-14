import React, { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../firebase';  // Assuming Firestore is initialized in firebase.js
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
      const result = await signInWithPopup(auth, provider);
      const { displayName, photoURL, email } = result.user;

      // Store user details in localStorage
      localStorage.setItem(
        'user',
        JSON.stringify({ displayName, photoURL, email })
      );

      navigate('/blogs');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signInWithEmail = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('No user found with this email.');
      } else {
        const user = querySnapshot.docs[0].data();

        // Perform email/password authentication (this example assumes no password check)
        // Add password verification here if applicable
        localStorage.setItem(
          'user',
          JSON.stringify({ displayName: user.displayName, email: user.email })
        );

        navigate('/blogs');
      }
    } catch (error) {
      console.error('Error signing in with email:', error);
      setError('An error occurred while signing in.');
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
