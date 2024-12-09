import React, { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);
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
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-6 animate-pulse">{currentText}</h1>
        <p className="mb-6 text-lg">
          Sign in with Google to create, share, and explore blogs.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={signInWithGoogle}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Auth;
