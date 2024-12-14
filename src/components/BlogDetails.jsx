import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { db } from '../firebase';

function BlogDetails() {
  const { id } = useParams(); // Get blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogDocRef = doc(db, 'blogs', id);
      const docSnap = await getDoc(blogDocRef);

      if (docSnap.exists()) {
        const blogData = docSnap.data();
        setBlog(blogData);
        setLikes(blogData.likes);
        setComments(blogData.comments || []);
      } else {
        console.log('No such blog!');
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    const blogDocRef = doc(db, 'blogs', id);
    await updateDoc(blogDocRef, {
      likes: increment(1), // Increment the like count by 1
    });
    setLikes(likes + 1); // Update the likes count locally
  };

  const handleCommentSubmit = async () => {
    if (!newComment) return; // Prevent submitting empty comments

    const user = { userName: 'Anonymous', userPhoto: '/default-avatar.jpg' }; // Replace with actual user data
    const blogDocRef = doc(db, 'blogs', id);

    await updateDoc(blogDocRef, {
      comments: arrayUnion({ userName: user.userName, userPhoto: user.userPhoto, message: newComment }),
    });

    setComments([...comments, { userName: user.userName, userPhoto: user.userPhoto, message: newComment }]);
    setNewComment(''); // Reset the comment input
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white p-8"
      style={{ backgroundImage: `url(${blog.imageUrl || '/default-bg.jpg'})` }}
    >
      <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Blog Header */}
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-300 mb-4">{new Date(blog.timestamp.seconds * 1000).toLocaleString()}</p>

        {/* User Info */}
        <div className="flex items-center mb-6">
          <img
            src={blog.userPhoto || '/default-avatar.jpg'}
            alt="User"
            className="w-12 h-12 rounded-full mr-4"
          />
          <p className="text-xl">{blog.userName}</p>
        </div>

        {/* Blog Image */}
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt="Blog"
            className="w-full mb-4 rounded"
          />
        )}

        {/* Blog Content */}
        <p className="text-gray-300 mb-6">{blog.message}</p>

        {/* Like Section */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleLike}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none"
          >
            Like ({likes})
          </button>
        </div>

        {/* Comments Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Comments ({comments.length})</h2>
          <div>
            {comments.length === 0 ? (
              <p className="text-gray-300">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded mb-4">
                  <div className="flex items-center mb-2">
                    <img
                      src={comment.userPhoto || '/default-avatar.jpg'}
                      alt="Commenter"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <p className="text-lg font-semibold">{comment.userName}</p>
                  </div>
                  <p className="text-gray-300">{comment.message}</p>
                </div>
              ))
            )}
          </div>

          {/* Add New Comment */}
          <div className="mt-6">
            <textarea
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-700 bg-gray-800 rounded text-white"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
