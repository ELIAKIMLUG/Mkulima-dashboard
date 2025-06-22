import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiBook, 
  FiFile, 
  FiShield, 
  FiSettings,
  FiMenu 
} from 'react-icons/fi';
import logo from '../assets/logo.png'; // Make sure this path is correct

const Sidebar = ({ toggleSidebar, isMobile }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Mkulima's Table Logo" className="logo" />
        {!isMobile && <h2>Mkulima's Table</h2>}
      </div>
      <nav>
        <NavLink to="/" className="sidebar-item" end>
          <FiHome className="icon" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/users" className="sidebar-item">
          <FiUsers className="icon" />
          <span>Users</span>
        </NavLink>
        <NavLink to="/courses" className="sidebar-item">
          <FiBook className="icon" />
          <span>Courses</span>
        </NavLink>
        <NavLink to="/files" className="sidebar-item">
          <FiFile className="icon" />
          <span>Files</span>
        </NavLink>
        <NavLink to="/admin" className="sidebar-item">
          <FiShield className="icon" />
          <span>Admin</span>
        </NavLink>
        <NavLink to="/settings" className="sidebar-item">
          <FiSettings className="icon" />
          <span>Settings</span>
        </NavLink>
      </nav>
      {isMobile && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FiMenu />
        </button>
      )}
    </div>
  );
};

export default Sidebar; // This is the crucial export