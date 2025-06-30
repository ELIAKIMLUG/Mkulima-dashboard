import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEye, FiEyeOff, FiArrowRight, FiLock, FiMail, FiAlertCircle } from 'react-icons/fi';
import logo from '../assets/logo.png'; // Adjust path if needed

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [inputErrors, setInputErrors] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (inputErrors[name]) setInputErrors(prev => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const errors = {
      email: !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      password: formData.password.length < 6,
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

    // TEMP ADMIN LOGIN SHORTCUT
    if (
      formData.email.toLowerCase().trim() === 'admin@gmail.com' &&
      formData.password === 'admin'
    ) {
      const fakeToken = 'wsde456tfty78uyhui9iujko0-oklp-=0987654321';
      onLogin(fakeToken);
      setIsLoading(false);
      // No navigation here — your app should redirect on auth state change
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/user/login',
        {
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
        }
      );

      if (response.data && response.data.token) {
        onLogin(response.data.token);
        setIsLoading(false);
        // No navigate here — rely on parent redirect
      } else {
        setError('No token received from server.');
        setIsLoading(false);
      }
    } catch (err) {
      let msg = 'Login failed. Please try again.';
      if (err.response && err.response.data && err.response.data.message) {
        msg = err.response.data.message;
      } else if (err.request) {
        msg = 'Network error. Please check your connection.';
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
      setIsLoading(false);
      console.error('Login error:', err);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card" role="main" aria-label="Login Form">
          <img src={logo} alt="Mkulima Logo" className="login-logo" />
          <h1 className="login-title">Welcome to Mkulima's Table App</h1>
          <p className="login-subtitle">Managing agricultural operations</p>

          {error && (
            <div className="error-message" role="alert">
              <FiAlertCircle className="error-icon" />
              <span>{error}</span>
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className={`form-group ${inputErrors.email ? 'error' : ''}`}>
              <label htmlFor="email" className="form-label">Admin</label>
              <div className="input-wrapper">
                
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="Username or Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  autoFocus
                  disabled={isLoading}
                />
              </div>
              {inputErrors.email && <span className="field-error">Please enter a valid email</span>}
            </div>

            <div className={`form-group ${inputErrors.password ? 'error' : ''}`}>
              
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {inputErrors.password && <span className="field-error">Password must be at least 6 characters</span>}
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? 'Signing In...' : <>Sign In <FiArrowRight className="button-icon" /></>}
            </button>
          </form>


        </div>
      </div>

      <style>{`
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  padding: 1rem;
  box-sizing: border-box;
}
        .login-card {
          background: white;
          padding: 2.5rem 3rem;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
          box-sizing: border-box;
        }
        .login-logo {
          width: 80px;
          margin-bottom: 1rem;
          object-fit: contain;
        }
        .login-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: #19551B;
        }
        .login-subtitle {
          font-size: 1rem;
          color: #555;
          margin-bottom: 1.5rem;
        }
        .error-message {
          display: flex;
          align-items: center;
          background-color: #fee2e2;
          color: #b91c1c;
          border-radius: 5px;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
          font-weight: 600;
          justify-content: center;
        }
        .error-icon {
          margin-right: 0.5rem;
          font-size: 1.25rem;
        }
        .login-form {
          text-align: left;
        }
        .form-group {
          margin-bottom: 1.25rem;
        }
        .form-group.error .form-input {
          border-color: #b91c1c;
        }
        .form-label {
          display: block;
          margin-bottom: 0.4rem;
          font-weight: 600;
          color: #333;
        }
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          color: #19551B;
          font-size: 1.1rem;
        }
        .form-input {
          width: 100%;
          padding: 0.5rem 0.5rem 0.5rem 2.5rem;
          border: 1.8px solid #19551B;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .form-input:focus {
          outline: none;
          border-color: #3b7d22;
          box-shadow: 0 0 3px #3b7d22;
        }
        .field-error {
          color: #b91c1c;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: block;
        }
        .password-toggle {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          color: #19551B;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0;
          display: flex;
          align-items: center;
          user-select: none;
        }
        .password-toggle:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
        .login-button {
          width: 100%;
          background-color: #19551B;
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
          padding: 0.75rem;
          border: none;
          border-radius: 7px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          transition: background-color 0.3s ease;
        }
        .login-button:disabled {
          background-color: #4f6b39;
          cursor: not-allowed;
        }
        .button-icon {
          font-size: 1.2rem;
        }
        
      `}</style>
    </>
  );
};

export default Login;
