import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEye, FiEyeOff, FiArrowRight, FiLock, FiMail, FiAlertCircle } from 'react-icons/fi';
import '../styles/login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    email: false,
    password: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError('');
    if (inputErrors[name]) {
      setInputErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const errors = {
      email: !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      password: formData.password.length < 6
    };
    setInputErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Please correct the highlighted fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email: formData.email.toLowerCase().trim(),
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 seconds timeout
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        onLogin(response.data.token);
        navigate('/dashboard', { replace: true });
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data.message || errorMessage;
      } else if (err.request) {
        // Request was made but no response
        errorMessage = 'Network error. Please check your connection.';
      }

      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome to Mkulima</h1>
          <p className="login-subtitle">Manage your agricultural operations</p>
        </div>

        {error && (
          <div className="error-message" role="alert">
            <FiAlertCircle className="error-icon" />
            <span>{error}</span>
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${inputErrors.email ? 'error' : ''}`}>
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                autoComplete="username"
                autoFocus
                disabled={isLoading}
              />
            </div>
            {inputErrors.email && (
              <span className="field-error">Please enter a valid email</span>
            )}
          </div>

          <div className={`form-group ${inputErrors.password ? 'error' : ''}`}>
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength="6"
                autoComplete="current-password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {inputErrors.password && (
              <span className="field-error">Password must be at least 6 characters</span>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <span className="button-loader"></span>
                Signing In...
              </>
            ) : (
              <>
                Sign In <FiArrowRight className="button-icon" />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <a href="/forgot-password" className="footer-link">Forgot password?</a>
          <span className="footer-divider">•</span>
          <a href="/register" className="footer-link">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;