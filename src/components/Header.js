import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <header className="app-header">
      <h1>Mkulima App</h1>
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
    </header>
  );
};

export default Header;