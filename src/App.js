<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
=======
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
>>>>>>> cd44ef185f10c5005131cbe8fcc5b25794206aed
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Courses from './components/Courses';
import Files from './components/Files';
import Admin from './components/Admin';
import Settings from './components/Settings';
<<<<<<< HEAD
=======
import Login from './components/Login'; // New login component
>>>>>>> cd44ef185f10c5005131cbe8fcc5b25794206aed
import './App.css';
import './styles/dashboard.css';
import './styles/users.css';
import './styles/courses.css';
import './styles/files.css';
import './styles/admin.css';
import './styles/settings.css';
<<<<<<< HEAD

function App() {
=======
import './styles/login.css';  // Match the exact file name case

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Login handler
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

>>>>>>> cd44ef185f10c5005131cbe8fcc5b25794206aed
  return (
    <Router>
      <div className="app">
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/files" element={<Files />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/settings" element={<Settings />} />
=======
          <Route 
            path="/login" 
            element={isAuthenticated ? 
              <Navigate to="/" replace /> : 
              <Login onLogin={handleLogin} />} 
          />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard onLogout={handleLogout} />
            </ProtectedRoute>
          } />
          
          <Route path="/users" element={
            <ProtectedRoute>
              <Users onLogout={handleLogout} />
            </ProtectedRoute>
          } />
          
          <Route path="/courses" element={
            <ProtectedRoute>
              <Courses onLogout={handleLogout} />
            </ProtectedRoute>
          } />
          
          <Route path="/files" element={
            <ProtectedRoute>
              <Files onLogout={handleLogout} />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin onLogout={handleLogout} />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings onLogout={handleLogout} />
            </ProtectedRoute>
          } />
>>>>>>> cd44ef185f10c5005131cbe8fcc5b25794206aed
        </Routes>
      </div>
    </Router>
  );
}

export default App;