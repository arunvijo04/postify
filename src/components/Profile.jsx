import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import bgImage from '../assets/bg.jpg';

function Profile() {
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedContent, setEditedContent] = useState({ title: '', message: '' });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    setUser({
      email: currentUser.email,
      displayName: currentUser.displayName,
    });

    const q = query(collection(db, 'blogs'), where('userId', '==', currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBlogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (blog) => {
    setEditing(blog.id);
    setEditedContent({ title: blog.title, message: blog.message });
  };

  const handleSave = async (id) => {
    const docRef = doc(db, 'blogs', id);
    await updateDoc(docRef, {
      title: editedContent.title,
      message: editedContent.message,
    });

    setEditing(null);
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, 'blogs', id);
    await deleteDoc(docRef);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white p-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* User Details Section */}
        {user && (
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Welcome, {user.displayName || 'User'}!</h1>
            <p className="text-gray-300">Email: {user.email}</p>
          </div>
        )}

        {/* User Blogs Section */}
        <h2 className="text-3xl font-bold mb-4">My Blogs</h2>
        <div className="space-y-4">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="bg-gray-800 p-4 rounded shadow-sm">
                {editing === blog.id ? (
                  <div>
                    <input
                      type="text"
                      className="w-full p-2 mb-2 border"
                      value={editedContent.title}
                      onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                    />
                    <textarea
                      className="w-full p-2 mb-2 border"
                      value={editedContent.message}
                      onChange={(e) =>
                        setEditedContent({ ...editedContent, message: e.target.value })
                      }
                    />
                    <button
                      onClick={() => handleSave(blog.id)}
                      className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold">{blog.title}</h3>
                    <p className="text-gray-300">{blog.message}</p>
                    <div className="mt-4">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-300">You haven't written any blogs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
