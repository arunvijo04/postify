import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const navigate = useNavigate();

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
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Blog Platform</h1>
        <p className="mb-6">Sign in with Google to create and explore blogs.</p>
        <button
          onClick={signInWithGoogle}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Auth;
