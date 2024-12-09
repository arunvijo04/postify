import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const createBlog = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error('User not logged in!');
      return;
    }

    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        message,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userPhoto: user.photoURL || '',
        timestamp: serverTimestamp(),
        comments: [],
        likes: 0,
      });
      setTitle('');
      setMessage('');
      alert('Blog posted successfully!');
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create a New Blog</h1>
        <input
          type="text"
          placeholder="Title"
          className="block w-full mb-4 p-3 border border-gray-700 bg-gray-800 rounded text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your blog here..."
          className="block w-full mb-4 p-3 border border-gray-700 bg-gray-800 rounded text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={createBlog}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Post Blog
        </button>
      </div>
    </div>
  );
}

export default CreateBlog;
