import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Courses from './components/Courses';
import Files from './components/Files';
import Admin from './components/Admin';
import Settings from './components/Settings';
import './App.css';
import './styles/dashboard.css';
import './styles/users.css';
import './styles/courses.css';
import './styles/files.css';
import './styles/admin.css';
import './styles/settings.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/files" element={<Files />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;