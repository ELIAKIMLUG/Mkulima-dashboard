import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FiSettings, FiUser, FiLock, FiBell, FiDatabase, FiGlobe } from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'David Pamphil',
    email: 'david@mkulima.com',
    phone: '+255 123 456 789',
    language: 'en',
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic would go here
    alert('Settings saved successfully!');
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="main-content">
        <div className="page-header">
          <h1>
            <FiSettings className="page-icon" />
            Settings
          </h1>
        </div>
        
        <div className="settings-container">
          <div className="settings-tabs">
            <button 
              className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser className="tab-icon" />
              Profile
            </button>
            <button 
              className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <FiLock className="tab-icon" />
              Security
            </button>
            <button 
              className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <FiBell className="tab-icon" />
              Notifications
            </button>
            <button 
              className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <FiGlobe className="tab-icon" />
              Preferences
            </button>
            <button 
              className={`tab-button ${activeTab === 'data' ? 'active' : ''}`}
              onClick={() => setActiveTab('data')}
            >
              <FiDatabase className="tab-icon" />
              Data Management
            </button>
          </div>
          
          <div className="settings-content">
            {activeTab === 'profile' && (
              <form onSubmit={handleSubmit}>
                <h2>Profile Settings</h2>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                  />
                </div>
                <button type="submit" className="save-button">Save Changes</button>
              </form>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2>Security Settings</h2>
                <div className="security-item">
                  <h3>Password</h3>
                  <p>Last changed 3 months ago</p>
                  <button className="change-password">Change Password</button>
                </div>
                <div className="security-item">
                  <h3>Two-Factor Authentication</h3>
                  <p>Add an extra layer of security to your account</p>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="security-item">
                  <h3>Active Sessions</h3>
                  <p>You're currently logged in on this device</p>
                  <button className="logout-all">Logout from all devices</button>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2>Notification Preferences</h2>
                <div className="notification-item">
                  <h3>Email Notifications</h3>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="notifications" 
                      checked={formData.notifications} 
                      onChange={handleChange} 
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <h3>System Messages</h3>
                  <p>Receive important system notifications</p>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <h3>Course Updates</h3>
                  <p>Get notified when new courses are added</p>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            )}
            
            {activeTab === 'preferences' && (
              <div>
                <h2>Application Preferences</h2>
                <div className="preference-item">
                  <h3>Language</h3>
                  <select 
                    name="language" 
                    value={formData.language} 
                    onChange={handleChange}
                  >
                    <option value="en">English</option>
                    <option value="sw">Swahili</option>
                  </select>
                </div>
                <div className="preference-item">
                  <h3>Dark Mode</h3>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="darkMode" 
                      checked={formData.darkMode} 
                      onChange={handleChange} 
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="preference-item">
                  <h3>Dashboard View</h3>
                  <div className="view-options">
                    <label>
                      <input type="radio" name="view" defaultChecked />
                      <span>Default</span>
                    </label>
                    <label>
                      <input type="radio" name="view" />
                      <span>Compact</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'data' && (
              <div>
                <h2>Data Management</h2>
                <div className="data-item">
                  <h3>Export Data</h3>
                  <p>Download all your data in a portable format</p>
                  <button className="export-button">Export All Data</button>
                </div>
                <div className="data-item">
                  <h3>Delete Account</h3>
                  <p>Permanently remove your account and all associated data</p>
                  <button className="delete-account">Delete Account</button>
                </div>
                <div className="data-item">
                  <h3>Agricultural Data Sync</h3>
                  <p>Sync your farming data with government agricultural systems</p>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;