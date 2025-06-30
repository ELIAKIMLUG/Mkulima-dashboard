import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { FiMenu, FiUser, FiUsers, FiUserCheck, FiBriefcase } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Header from './Header';
import { AuthContext } from '../context/AuthContext';
import AddUserModal from './AddUserModal';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const Dashboard = () => {
  const { authToken } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [addUserModal, setAddUserModal] = useState(false);
  const [loadingAddUser, setLoadingAddUser] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchUsers = async () => {
    if (!authToken) return;
    setLoadingUsers(true);
    try {
      const res = await axios.get('http://localhost:5000/user', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [authToken]);

  const totalUsers = users.length;
  const farmerCount = users.filter(u => u.role !== 'expert').length;
  const expertCount = users.filter(u => u.role === 'expert').length;

  const monthly = users.reduce((acc, u) => {
    if (!u.created_at) return acc;
    const key = new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const months = Object.keys(monthly).sort((a, b) => new Date(a) - new Date(b));
  const signupsPerMonth = months.map(m => monthly[m]);

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

  const handleAddUserSave = async (userData) => {
    setLoadingAddUser(true);
    try {
      await axios.post('http://localhost:5000/user', userData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      alert('User added successfully');
      setAddUserModal(false);
      await fetchUsers(); // Refresh list
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
    <div className="admin-role">Backend Developer</div>
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
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  min-height: 100px;
}

.admin-avatar {
  background: #19551B;
  color: white;
  border-radius: 50%;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.admin-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0.2rem 0;
}

.admin-info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #19551B;
}

.admin-role {
  margin-top: auto;
  color: #666;
  font-size: 0.95rem;
}


      `}</style>
    </div>
  );
};

export default Dashboard;