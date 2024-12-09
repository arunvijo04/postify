import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'blogs'), (snapshot) => {
      setBlogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/blog/${id}`); // Navigate to the details page for the clicked blog
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">All Blogs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => handleCardClick(blog.id)}
            className="cursor-pointer transition-transform transform hover:scale-105"
          >
            <div className="bg-gray-800 text-white p-4 rounded shadow-md hover:shadow-lg">
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-400 text-sm mb-4">
        {blog.author ? `By ${blog.author}` : 'Unknown Author'}
      </p>
      <p className="text-gray-200 line-clamp-3">{blog.message}</p>
    </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
