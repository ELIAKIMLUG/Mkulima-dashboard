import React, { useEffect, useState, useContext } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FiUser, FiUsers, FiSearch, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  const { authToken } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalUser, setModalUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/user', {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [authToken]);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryName = (role) =>
    role === 'expert' ? 'Agricultural Specialist' : 'Farmer';

  const counts = {
    farmer: users.filter(u => u.role !== 'expert').length,
    expert: users.filter(u => u.role === 'expert').length
  };
  const total = users.length || 1;

  const confirmDelete = (user) => setModalUser(user);

  const deleteUser = async () => {
    const user = modalUser;
    setModalUser(null);
    try {
      // Soft-delete: mark locally then undoable
      setUsers(prev => prev.filter(u => u.id !== user.id));
      const toastId = toast.info(
        <div>
          Deleted <strong>{user.name}</strong>
          <button onClick={() => undoDelete(user)} style={{ marginLeft: 10 }}>
            Undo
          </button>
        </div>,
        { autoClose: 5000 }
      );
      await axios.delete(`http://localhost:5000/user/${user.id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      toast.update(toastId, {
        render: `${user.name} deleted successfully.`,
        type: toast.TYPE.SUCCESS,
        autoClose: 3000
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete user.');
    }
  };

  const undoDelete = (user) => {
    setUsers(prev => [...prev, user]);
    toast.success(`Restored ${user.name}`);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <h1><FiUsers className="page-icon" />Users</h1>
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? <p>Loading...</p> : error ? <p className="error">{error}</p> : (
          <div className="content-card">
            <div className="table-responsive">
              <table className="users-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Category</th><th>Join Date</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      <td><div className="user-info"><FiUser className="user-avatar" />{user.name}</div></td>
                      <td>{user.email}</td>
                      <td><span className={`user-category ${user.role}`}>{getCategoryName(user.role)}</span></td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        <button className="delete-btn" onClick={() => confirmDelete(user)}>
                          <FiTrash2 />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="user-categories">
              <h3>User Categories</h3>
              <div className="category-stats">
                <div className="category-card">
                  <h4>Farmers</h4>
                  <p>{counts.farmer} users</p>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${(counts.farmer/total)*100}%` }} /></div>
                </div>
                <div className="category-card">
                  <h4>Agricultural Specialists</h4>
                  <p>{counts.expert} users</p>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${(counts.expert/total)*100}%` }} /></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {modalUser && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Delete <strong>{modalUser.name}</strong>?</p>
            <div className="modal-actions">
              <button onClick={() => setModalUser(null)}>Cancel</button>
              <button className="danger" onClick={deleteUser}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />

      <style>{`
        .delete-btn { background:none; border:none; color:#b91c1c; cursor:pointer; font-size:1.2rem; }
        .delete-btn:hover { color:#7f1d1d; }
        .modal-overlay { position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.4);display:flex;justify-content:center;align-items:center;z-index:1000; }
        .modal { background:#fff; padding:1.5rem; border-radius:8px; text-align:center; width:300px; }
        .modal-actions { margin-top:1rem; display:flex; justify-content:space-between; }
        .modal-actions button { padding:0.5rem 1rem; border-radius:4px; font-size:1rem; cursor:pointer; }
        .modal-actions .danger { background:#b91c1c; color:#fff; border:none; }
        .modal-actions button:not(.danger) { background:#e0e0e0; border:none; }
        .toastify-toast { font-size:0.9rem; }
        .user-categories { margin-top:2rem; }
        .category-stats { display:flex; gap:1rem; }
        .category-card { background:#fff; padding:1rem; border-radius:5px; width:200px; box-shadow:0 1px 3px rgba(0,0,0,0.1); }
        .progress-bar { width:100%; height:8px; background:#f0f0f0; border-radius:4px; overflow:hidden; }
        .progress-fill { height:100%; background:#19551B; }
      `}</style>
    </div>
  );
};

export default Users;
