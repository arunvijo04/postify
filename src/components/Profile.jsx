import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Profile() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, 'blogs'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBlogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Blogs</h1>
      <div className="grid gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-gray-700">{blog.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
