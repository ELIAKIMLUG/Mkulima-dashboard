import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { 
  FiUser, 
  FiBriefcase, 
  FiFileText, 
  FiDollarSign,
  FiMenu,
  FiUsers,  
  FiBook     
} from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ['#4CAF50', '#E0E0E0'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {sidebarOpen && <Sidebar toggleSidebar={toggleSidebar} isMobile={isMobile} />}
      
      <main className={`main-content ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
        {isMobile && !sidebarOpen && (
          <button className="mobile-menu-button" onClick={toggleSidebar}>
            <FiMenu />
          </button>
        )}
        
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-greeting">
            <p>Welcome</p>
            <h2>Pamphil</h2>
          </div>
        </div>
        
        <div className="dashboard-content">
          <motion.div 
            className="welcome-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="profile-section">
              <div className="avatar">
                <FiUser size={24} />
              </div>
              <div className="profile-info">
                <h3>David Pamphil</h3>
                <p>Backend Developer</p>
                <button className="profile-button">View Profile</button>
              </div>
            </div>
            
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-icon">
                  <FiBriefcase />
                </div>
                <div className="stat-info">
                  <h4>80</h4>
                  <p>Projects</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="targets-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Yearly Targets</h3>
            <p className="targets-subtitle">Targets Of The Year</p>
            
            <div className="target-progress">
              <div className="target-info">
                <div>
                  <h4>TZS 50,000,000</h4>
                  <p>Money</p>
                </div>
              </div>
              
              <div className="progress-container">
                <div className="progress-bar" style={{ width: '80%' }}></div>
                <span>80%</span>
              </div>
              
              <div className="chart-container">
                <Doughnut data={data} options={{ cutout: '70%' }} />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="quick-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-button">
                <FiFileText />
                <span>Add Report</span>
              </button>
              <button className="action-button">
                <FiUsers />
                <span>Add User</span>
              </button>
              <button className="action-button">
                <FiBook />
                <span>Add Course</span>
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;