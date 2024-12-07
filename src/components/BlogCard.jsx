import React from 'react';

function BlogCard({ blog }) {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <p className="text-gray-700">{blog.message}</p>
      <p className="text-gray-500 text-sm">Likes: {blog.likes || 0}</p>
    </div>
  );
}

export default BlogCard;
