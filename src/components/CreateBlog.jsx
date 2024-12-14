import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import bgImage from '../assets/bg.jpg'; // Assuming bg.jpg is in the assets folder

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState('');

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
        imageUrl,
      });
      setTitle('');
      setMessage('');
      setImageUrl('');
      setPreview('');
      alert('Blog posted successfully!');
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  };

  const handlePreview = () => {
    setPreview({ title, message, imageUrl });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white p-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
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
        <input
          type="text"
          placeholder="Image URL (optional)"
          className="block w-full mb-4 p-3 border border-gray-700 bg-gray-800 rounded text-white"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          onClick={handlePreview}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
        >
          Preview
        </button>

        {preview && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{preview.title}</h2>
            <p className="text-gray-300">{preview.message}</p>
            {preview.imageUrl && (
              <img src={preview.imageUrl} alt="Preview" className="w-full mt-4 rounded" />
            )}
          </div>
        )}

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
