import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiMenu, FiUser, FiMail, FiPhone, FiLock, FiCheckCircle, FiUserCheck, FiBriefcase, FiUsers, FiFileText, FiBook } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Header from './Header';
import { Doughnut, Line } from 'react-chartjs-2';
import { AuthContext } from '../context/AuthContext';
import zxcvbn from 'zxcvbn';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

// AddUserModal component, embedded here for completeness
const AddUserModal = ({ onClose, onSave, loading }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.role) e.role = 'Please select role';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      if (value.length > 0) {
        const strength = zxcvbn(value).score;
        setPasswordStrength(strength);
      } else {
        setPasswordStrength(0);
      }
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(form);
    }
  };

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const strengthColors = ['#ff3b30', '#ff9500', '#ffcc00', '#4cd964', '#34c759'];

  return (
    <div className="modal-overlay">
      <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title">Add User</h2>

        {/* Name */}
        <label className="input-label">
          <FiUser className="input-icon" />
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
        </label>
        {errors.name && <small className="error-text">{errors.name}</small>}

        {/* Email */}
        <label className="input-label">
          <FiMail className="input-icon" />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
        </label>
        {errors.email && <small className="error-text">{errors.email}</small>}

        {/* Phone */}
        <label className="input-label">
          <FiPhone className="input-icon" />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className={errors.phone ? 'input-error' : ''}
          />
        </label>
        {errors.phone && <small className="error-text">{errors.phone}</small>}

        {/* Role */}
        <label className="input-label role-select-label">
          <FiUserCheck className="input-icon" />
          <select name="role" value={form.role} onChange={handleChange} className={errors.role ? 'input-error' : ''}>
            <option value="">Select Role</option>
            <option value="regular">Regular</option>
            <option value="expert">Expert</option>
          </select>
        </label>
        {errors.role && <small className="error-text">{errors.role}</small>}

        {/* Password */}
        <label className="input-label">
          <FiLock className="input-icon" />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
          />
        </label>
        {errors.password && <small className="error-text">{errors.password}</small>}

        {/* Password Strength */}
        {form.password && (
          <div className="password-strength">
            <span>Password strength: </span>
            <span style={{ color: strengthColors[passwordStrength], fontWeight: '600' }}>
              {strengthLabels[passwordStrength]}
            </span>
            <div className="strength-bars">
              {[0,1,2,3,4].map(i => (
                <div
                  key={i}
                  className="strength-bar"
                  style={{ backgroundColor: i <= passwordStrength ? strengthColors[passwordStrength] : '#ddd' }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <label className="input-label">
          <FiCheckCircle className="input-icon" />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'input-error' : ''}
          />
        </label>
        {errors.confirmPassword && <small className="error-text">{errors.confirmPassword}</small>}

        {/* Buttons */}
        <div className="button-row">
          <button className="btn cancel-btn" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn save-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save User'}
          </button>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 1rem;
        }
        .modal-container {
          background: #fff;
          padding: 2rem 2.5rem;
          border-radius: 12px;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        h2 {
          margin-bottom: 1rem;
          color: #19551B;
          text-align: center;
        }
        .input-label {
          display: flex;
          align-items: center;
          border-bottom: 2px solid #19551B;
          padding: 0.25rem 0.5rem;
          gap: 0.5rem;
        }
        input, select {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1rem;
          padding: 0.5rem 0;
          color: #333;
          background: transparent;
        }
        select {
          appearance: none;
          cursor: pointer;
        }
        .input-icon {
          color: #19551B;
          font-size: 1.25rem;
          min-width: 24px;
        }
        .input-error {
          border-color: #ff3b30 !important;
        }
        .error-text {
          color: #ff3b30;
          font-size: 0.85rem;
          margin-left: 2.5rem;
          margin-top: 0.1rem;
        }
        .role-select-label {
          padding-right: 0;
        }
        .password-strength {
          font-size: 0.9rem;
          color: #666;
          margin-left: 2.5rem;
        }
        .strength-bars {
          display: flex;
          gap: 3px;
          margin-top: 4px;
        }
        .strength-bar {
          flex: 1;
          height: 5px;
          border-radius: 3px;
          background-color: #ddd;
        }
        .button-row {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
        }
        .btn {
          padding: 0.6rem 1.5rem;
          font-weight: 600;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.25s ease;
        }
        .cancel-btn {
          background: #ccc;
          color: #333;
        }
        .cancel-btn:hover:not(:disabled) {
          background: #b3b3b3;
        }
        .save-btn {
          background: #19551B;
          color: white;
        }
        .save-btn:hover:not(:disabled) {
          background: #144314;
        }
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

const Dashboard = () => {
  const { authToken } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [addUserModal, setAddUserModal] = useState(false);
  const [loadingAddUser, setLoadingAddUser] = useState(false);

  // Responsive sidebar toggling
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch users on mount and when authToken changes
  useEffect(() => {
    if (!authToken) return;

    setLoadingUsers(true);
    axios.get('http://localhost:5000/user', {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    .then(res => setUsers(res.data || []))
    .catch(err => {
      console.error(err);
      setUsers([]);
    })
    .finally(() => setLoadingUsers(false));
  }, [authToken]);

  // User stats
  const totalUsers = users.length;
  const farmerCount = users.filter(u => u.role !== 'expert').length;
  const expertCount = users.filter(u => u.role === 'expert').length;

  // Monthly signups aggregation
  const monthly = users.reduce((acc, u) => {
    if (!u.created_at) return acc;
    const key = new Date(u.created_at).toLocaleDateString('en-US', { month:'short', year:'numeric' });
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const months = Object.keys(monthly).sort((a,b) => new Date(a) - new Date(b));
  const signupsPerMonth = months.map(m => monthly[m]);

  // Chart data
  const doughnutData = {
    labels: ['Farmers', 'Experts'],
    datasets: [{
      data: [farmerCount, expertCount],
      backgroundColor: ['#4CAF50', '#FFC107']
    }]
  };

  const lineData = {
    labels: months,
    datasets: [{
      label: 'Signups per Month',
      data: signupsPerMonth,
      borderColor: '#19551B',
      backgroundColor: '#19551B50',
      fill: true,
      tension: 0.3,
    }]
  };

  // Add user API call handler
  const handleAddUserSave = async (userData) => {
    setLoadingAddUser(true);
    try {
      await axios.post('http://localhost:5000/user', userData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      alert('User added successfully');
      setAddUserModal(false);
      // Refresh user list
      setLoadingUsers(true);
      const res = await axios.get('http://localhost:5000/user', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setUsers(res.data || []);
    } catch (error) {
      console.error(error);
      alert('Failed to add user');
    } finally {
      setLoadingAddUser(false);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-container">
      {sidebarOpen && <Sidebar toggleSidebar={toggleSidebar} isMobile={isMobile} />}

      <main className={`main-content ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
        {isMobile && !sidebarOpen && (
          <button className="mobile-menu-button" onClick={toggleSidebar}>
            <FiMenu />
          </button>
        )}
        <Header />

        {/* Admin Info Card */}
<motion.div
  className="admin-card"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <div className="admin-avatar">
    <FiUser size={28} />
  </div>
  <div className="admin-info">
    <h3>David Pamphil</h3>
    <h4>Backend Developer</h4>
  </div>
</motion.div>


        <div className="stats-cards">
          <div className="stat-card">
            <FiUsers size={24} style={{ marginRight: 8 }} />
            <div>
              <div className="stat-number">{loadingUsers ? '...' : totalUsers}</div>
              <div>Total Users</div>
            </div>
          </div>
          <div className="stat-card">
            <FiBriefcase size={24} style={{ marginRight: 8 }} />
            <div>
              <div className="stat-number">{loadingUsers ? '...' : farmerCount}</div>
              <div>Farmers</div>
            </div>
          </div>
          <div className="stat-card">
            <FiUserCheck size={24} style={{ marginRight: 8 }} />
            <div>
              <div className="stat-number">{loadingUsers ? '...' : expertCount}</div>
              <div>Experts</div>
            </div>
          </div>

          <button
            className="add-user-btn"
            onClick={() => setAddUserModal(true)}
            disabled={loadingUsers}
          >
            + Add User
          </button>
        </div>

        <div className="charts-section">
          <motion.div
            className="chart-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>User Distribution</h3>
            <Doughnut data={doughnutData} />
          </motion.div>
          <motion.div
            className="chart-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Signups Over Time</h3>
            <Line data={lineData} />
          </motion.div>
        </div>

        {loadingUsers && <p>Loading users...</p>}

        {addUserModal && (
          <AddUserModal
            onClose={() => setAddUserModal(false)}
            onSave={handleAddUserSave}
            loading={loadingAddUser}
          />
        )}
      </main>

      <style>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: #f5f8f6;
          color: #333;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .main-content {
          flex-grow: 1;
          padding: 1.5rem 2rem;
          transition: margin-left 0.3s ease;
          min-width: 0;
        }
        .sidebar-collapsed {
          margin-left: 0 !important;
        }
        .stats-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: center;
        }
        .stat-card {
          background: white;
          flex: 1 1 180px;
          min-width: 180px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.05);
          font-weight: 600;
          color: #19551B;
        }
        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #19551B;
        }
        .add-user-btn {
          background: #19551B;
          color: white;
          padding: 0.7rem 1.2rem;
          border-radius: 8px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          flex-grow: 0;
          height: 44px;
          transition: background-color 0.25s ease;
        }
        .add-user-btn:hover:not(:disabled) {
          background: #144314;
        }
        .add-user-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .charts-section {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .chart-card {
          background: white;
          padding: 1.5rem 1.75rem;
          border-radius: 12px;
          flex: 1 1 320px;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.07);
        }
        h3 {
          color: #19551B;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        .mobile-menu-button {
          position: fixed;
          top: 15px;
          left: 15px;
          background: #19551B;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.5rem;
          cursor: pointer;
          z-index: 1100;
          font-size: 1.5rem;
        }

        @media (max-width: 767px) {
          .stats-cards {
            flex-direction: column;
          }
          .chart-card {
            flex: 1 1 100%;
          }
          main {
            padding: 1rem;
          }
        }
        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none;
          }
        }     
                  .admin-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
.admin-avatar {
  background: #19551B;
  color: white;
  border-radius: 50%;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.admin-info h3 {
  margin: 0;
  color: #19551B;
  font-size: 1.2rem;
}
.admin-info p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

      `}</style>
    </div>
  );
};

export default Dashboard;
