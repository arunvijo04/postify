import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const createBlog = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        message,
        userId: user.uid,
        timestamp: serverTimestamp(),
        comments: [],
        likes: 0,
      });
      setTitle('');
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <input
        type="text"
        placeholder="Title"
        className="block w-full mb-2 p-2 border"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Message"
        className="block w-full mb-2 p-2 border"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={createBlog}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Post Blog
      </button>
    </div>
  );
}

export default CreateBlog;
