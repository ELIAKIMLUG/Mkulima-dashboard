import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/ForumPage.css';
import { getUserId } from '../services/userService';
import API_BASE from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { FaHeart, FaComment, FaPaperPlane, FaPlus } from 'react-icons/fa';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [replyInputs, setReplyInputs] = useState({});
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setSidebarOpen] = useState(!isMobile);

  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/forum/posts`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  const handleAddPost = async () => {
    if (!title || !content) return;
    try {
      const res = await fetch(`${API_BASE}/api/forum/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error('Failed to post');

      const newPost = await res.json();
      setPosts([newPost, ...posts]);
      setTitle('');
      setContent('');
      setModalVisible(false);
    } catch (err) {
      console.error('Post failed:', err);
      alert('Failed to create post. Are you logged in?');
    }
  };

  const handleAddReply = async (postId) => {
    const reply = replyInputs[postId];
    if (!reply) return;
    try {
      const res = await fetch(`${API_BASE}/api/forum/posts/${postId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ content: reply }),
      });

      if (!res.ok) throw new Error('Reply failed');

      const newReply = await res.json();
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, replies: [...(post.replies || []), newReply] } : post
      ));
      setReplyInputs({ ...replyInputs, [postId]: '' });
    } catch (err) {
      console.error('Reply failed:', err);
      alert('Failed to reply. Please log in.');
    }
  };

  const handleToggleLike = async (postId) => {
    try {
      const res = await fetch(`${API_BASE}/api/forum/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const result = await res.json();

      setPosts(posts.map(post =>
        post.id === postId
          ? {
              ...post,
              liked: result.liked,
              likeAnimating: true,
              likes: result.liked ? (post.likes || 0) + 1 : (post.likes || 0) - 1,
            }
          : post
      ));

      setTimeout(() => {
        setPosts(prev =>
          prev.map(post =>
            post.id === postId ? { ...post, likeAnimating: false } : post
          )
        );
      }, 400);
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString();
  };

  return (
    <div className="forum-page">
      <Sidebar
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />

      <div className={`forum-content ${isSidebarOpen ? 'with-sidebar' : ''}`}>
        <div className="forum-header">Forum</div>

        <div className="posts-list">
          {posts.map(post => (
            <div key={post.id} className="post">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-content">{post.content}</p>
              <p className="post-meta">By {post.user_name} • {formatDate(post.created_at)}</p>

              <div className="post-actions">
                <div
                  className={`action like-icon ${post.liked ? 'liked' : ''} ${post.likeAnimating ? 'animate' : ''}`}
                  onClick={() => handleToggleLike(post.id)}
                >
                  <FaHeart size={14} /> {post.likes || 0} Likes
                </div>

                <div
                  className="action"
                  onClick={() =>
                    setExpandedPostId(expandedPostId === post.id ? null : post.id)
                  }
                >
                  <FaComment size={14} /> {expandedPostId === post.id ? 'Hide Replies' : `${post.replies?.length || 0} Replies`}
                </div>
              </div>

              {expandedPostId === post.id && (
                <div className="reply-box">
                  {post.replies?.map(reply => (
                    <div key={reply.id}>
                      <p className="reply-meta">{reply.user_name} • {formatDate(reply.created_at)}</p>
                      <p>{reply.content}</p>
                    </div>
                  ))}
                  <div className="reply-form">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      value={replyInputs[post.id] || ''}
                      onChange={(e) => setReplyInputs({ ...replyInputs, [post.id]: e.target.value })}
                    />
                    <button onClick={() => handleAddReply(post.id)}>
                      <FaPaperPlane size={12} /> Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button className="floating-btn" onClick={() => setModalVisible(true)}>
        <FaPlus size={24} />
      </button>

      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Create New Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleAddPost}>Post</button>
              <button className="cancel" onClick={() => setModalVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;
