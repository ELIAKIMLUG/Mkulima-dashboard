import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiBook,
  FiFile,
  FiShield,
  FiSettings,
  FiMenu,
  FiLogOut
} from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Sidebar = ({ toggleSidebar, isMobile }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      <div className="sidebar">
        {/* Header */}
        <div className="sidebar-header">
          <img src={logo} alt="Mkulima Logo" className="logo" />
          {!isMobile && <h2 className="title">Mkulima's Table</h2>}
        </div>

        {/* Navigation */}
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
          <NavLink to="/admin" className="sidebar-item">
            <FiShield className="icon" />
            <span>Admin</span>
          </NavLink>
          <NavLink to="/settings" className="sidebar-item">
            <FiSettings className="icon" />
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* Footer / Logout */}
        <div className="sidebar-footer">
          <button className="sidebar-item logout" onClick={handleLogout}>
            <FiLogOut className="icon" />
            <span>Logout</span>
          </button>

          {isMobile && (
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              <FiMenu className="icon" />
            </button>
          )}
        </div>
      </div>

      {/* Custom CSS */}
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

  .icon {
    font-size: 1.2rem;
  }

  .sidebar-footer {
    padding: 1rem;
    border-top: 1px solid #eaeaea;
  }

  .sidebar-toggle {
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    padding: 0.6rem;
    text-align: center;
  }

  .sidebar-toggle .icon {
    font-size: 1.4rem;
    color: #333;
  }
`}</style>

    </>
  );
};

export default Sidebar;
