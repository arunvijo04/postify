import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');

  React.useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, 'blogs', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBlog({ id: docSnap.id, ...docSnap.data() });
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    if (!blog) return;

    const docRef = doc(db, 'blogs', id);
    await updateDoc(docRef, { likes: (blog.likes || 0) + 1 });
    setBlog({ ...blog, likes: (blog.likes || 0) + 1 });
  };

  const handleComment = async () => {
    if (!comment) return;

    const docRef = doc(db, 'blogs', id);
    await updateDoc(docRef, { comments: arrayUnion(comment) });
    setBlog({ ...blog, comments: [...(blog.comments || []), comment] });
    setComment('');
  };

  return (
    blog && (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p>{blog.message}</p>
        <p>Likes: {blog.likes || 0}</p>
        <button onClick={handleLike} className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
          Like
        </button>
        <div className="mt-4">
          <textarea
            className="w-full p-2 border mb-2"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button onClick={handleComment} className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600">
            Add Comment
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Comments</h2>
          <ul>
            {blog.comments?.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}

export default BlogDetails;
