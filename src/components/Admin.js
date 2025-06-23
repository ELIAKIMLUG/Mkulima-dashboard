import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header'; 
import { FiShield, FiUser, FiMail, FiKey, FiActivity } from 'react-icons/fi';

const Admin = () => {
  const adminData = {
    name: 'Admin User',
    email: 'admin@mkulima.com',
    role: 'Super Administrator',
    lastLogin: '2023-06-20 14:30:45',
    permissions: ['Full Access'],
    activity: [
      { id: 1, action: 'Updated user permissions', date: '2023-06-20 10:15' },
      { id: 2, action: 'Created new course', date: '2023-06-19 16:20' },
      { id: 3, action: 'Deleted outdated files', date: '2023-06-18 09:45' },
    ]
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="main-content">
        <div className="page-header">
          <h1>
            <FiShield className="page-icon" />
            Admin
          </h1>
        </div>
        
        <div className="content-card admin-profile">
          <div className="admin-info">
            <div className="admin-avatar">
              <FiUser size={32} />
            </div>
            <div className="admin-details">
              <h2>{adminData.name}</h2>
              <p className="admin-role">{adminData.role}</p>
              
              <div className="detail-row">
                <FiMail className="detail-icon" />
                <span>{adminData.email}</span>
              </div>
              
              <div className="detail-row">
                <FiKey className="detail-icon" />
                <span>Last Login: {adminData.lastLogin}</span>
              </div>
            </div>
          </div>
          
          <div className="admin-permissions">
            <h3>Permissions</h3>
            <ul>
              {adminData.permissions.map((permission, index) => (
                <li key={index}>{permission}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="content-card admin-activity">
          <h3>
            <FiActivity className="activity-icon" />
            Recent Activity
          </h3>
          
          <div className="activity-list">
            {adminData.activity.map((item) => (
              <div key={item.id} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p>{item.action}</p>
                  <span className="activity-date">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="admin-actions">
          <button className="admin-button primary">Manage Users</button>
          <button className="admin-button">System Settings</button>
          <button className="admin-button warning">Audit Logs</button>
        </div>
      </main>
    </div>
  );
};

export default Admin;