import React from 'react';

function BlogCard({ blog }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow-md hover:shadow-lg">
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-400 text-sm mb-4">
        {blog.author ? `By ${blog.author}` : 'Unknown Author'}
      </p>
      <p className="text-gray-200 line-clamp-3">{blog.message}</p>
    </div>
  );
}

export default BlogCard;
