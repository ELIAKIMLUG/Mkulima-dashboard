import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Courses from './components/Courses';
import Files from './components/Files';
import Admin from './components/Admin';
import Settings from './components/Settings';
import Login from './components/Login';
import Forum from './components/Forum';

import { AuthContext } from './context/AuthContext';

import './App.css';
import './styles/dashboard.css';
import './styles/users.css';
import './styles/courses.css';
import './styles/files.css';
import './styles/admin.css';
import './styles/settings.css';
import './styles/login.css';
import './styles/ForumPage.css';

function App() {
  const { authToken, login, logout } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    return authToken ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Login Route */}
          <Route
            path="/login"
            element={
              authToken ? <Navigate to="/" replace /> : <Login onLogin={login} />
            }
          />

          {/* Protected Routes */}
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
          <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <Forum onLogout={logout} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
