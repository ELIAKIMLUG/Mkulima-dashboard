import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Courses from './components/Courses';
import Files from './components/Files';
import Admin from './components/Admin';
import Settings from './components/Settings';
import Login from './components/Login';

import { AuthContext } from './context/AuthContext';

import './App.css';
import './styles/dashboard.css';
import './styles/users.css';
import './styles/courses.css';
import './styles/files.css';
import './styles/admin.css';
import './styles/settings.css';
import './styles/login.css';

function App() {
  const { authToken, login, logout } = useContext(AuthContext);

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!authToken) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={
              authToken ? (
                <Navigate to="/" replace />
              ) : (
                // Pass the login function to Login component
                <Login onLogin={login} />
              )
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard onLogout={logout} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users onLogout={logout} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses onLogout={logout} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/files"
            element={
              <ProtectedRoute>
                <Files onLogout={logout} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin onLogout={logout} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings onLogout={logout} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
