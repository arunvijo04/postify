import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import bgImage from '../assets/bg.jpg'; // Using the uploaded image

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsCollection = collection(db, 'blogs');
      const blogDocs = await getDocs(blogsCollection);
      const blogData = blogDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogData);
    };

    fetchBlogs();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black bg-opacity-70 text-white rounded-lg p-6 shadow-lg max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Our Blogs</h1>
        {blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-300 mb-4">
                  {blog.message.slice(0, 100)}...
                </p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-blue-400 hover:text-blue-500"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300">No blogs available.</p>
        )}
      </div>
    </div>
  );
}

export default Blog;
