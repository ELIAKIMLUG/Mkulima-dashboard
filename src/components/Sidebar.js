import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiHome, FiUsers, FiBook, FiFile, FiShield,
  FiSettings, FiLogOut, FiMenu, FiX, FiMessageSquare
} from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <>
      {/* Hamburger Button */}
      {isMobile && (
        <button className="hamburger-btn" onClick={toggleSidebar}>
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      )}

      {/* Sidebar Panel */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Mkulima Logo" className="logo" />
          {!isMobile && <h2 className="title">Mkulima's Table</h2>}
        </div>

        <nav className="sidebar-nav">
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
          <NavLink to="/forum" className="sidebar-item">
            <FiMessageSquare className="icon" />
            <span>Forum</span>
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

        <div className="sidebar-footer">
          <button className="sidebar-item logout" onClick={handleLogout}>
            <FiLogOut className="icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .sidebar {
          width: 250px;
          min-height: 100vh;
          background-color: #F7FBF1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid #e0e0e0;
          box-shadow: 2px 0 5px rgba(0,0,0,0.05);
          transition: transform 0.3s ease-in-out;
        }

        .sidebar.mobile {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          transform: translateX(-100%);
        }

        .sidebar.mobile.open {
          transform: translateX(0);
        }

        .hamburger-btn {
          position: fixed;
          top: 15px;
          left: 15px;
          z-index: 1100;
          background: #19551B;
          color: #fff;
          padding: 10px;
          border-radius: 6px;
          border: none;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.75rem 1rem 0.25rem 1rem;
          margin-bottom: 0;
        }

        .logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .title {
          font-size: 1.2rem;
          font-weight: bold;
          color: #19551B;
        }

        .sidebar-nav {
          padding: 0 1rem 1rem 1rem;
          margin-top: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.6rem 0.8rem;
          border-radius: 5px;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: background-color 0.2s ease;
        }

        .sidebar-item:hover {
          background-color: #19551BAA;
        }

        .sidebar-item.logout {
          color: #b91c1c;
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-family: inherit;
          text-align: left;
          padding: 0.6rem 0.8rem;
        }

        .sidebar-item.logout:hover {
          background-color: #fee2e2;
        }

        .sidebar-item.active {
          background-color: #19551B;
          color: white;
        }

        .icon {
          font-size: 1.2rem;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid #eaeaea;
        }

        @media (min-width: 768px) {
          .hamburger-btn {
            display: none;
          }

          .sidebar.mobile {
            transform: none;
            position: relative;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
