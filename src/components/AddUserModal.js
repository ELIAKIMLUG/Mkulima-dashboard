import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { FiUser, FiMail, FiPhone, FiLock, FiCheckCircle, FiUserCheck } from 'react-icons/fi';

const AddUserModal = ({ onClose, onSave, loading }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.role) e.role = 'Please select role';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      if (value.length > 0) {
        const strength = zxcvbn(value).score;
        setPasswordStrength(strength);
      } else {
        setPasswordStrength(0);
      }
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(form);
    }
  };

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const strengthColors = ['#ff3b30', '#ff9500', '#ffcc00', '#4cd964', '#34c759'];

  return (
    <div className="modal-overlay">
      <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title">Add User</h2>

        {/* Name */}
        <label className="input-label">
          <FiUser className="input-icon" />
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
        </label>
        {errors.name && <small className="error-text">{errors.name}</small>}

        {/* Email */}
        <label className="input-label">
          <FiMail className="input-icon" />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
        </label>
        {errors.email && <small className="error-text">{errors.email}</small>}

        {/* Phone */}
        <label className="input-label">
          <FiPhone className="input-icon" />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className={errors.phone ? 'input-error' : ''}
          />
        </label>
        {errors.phone && <small className="error-text">{errors.phone}</small>}

        {/* Role */}
        <label className="input-label role-select-label">
          <FiUserCheck className="input-icon" />
          <select name="role" value={form.role} onChange={handleChange} className={errors.role ? 'input-error' : ''}>
            <option value="">Select Role</option>
            <option value="regular">Regular</option>
            <option value="expert">Expert</option>
          </select>
        </label>
        {errors.role && <small className="error-text">{errors.role}</small>}

        {/* Password */}
        <label className="input-label">
          <FiLock className="input-icon" />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
          />
        </label>
        {errors.password && <small className="error-text">{errors.password}</small>}

        {/* Password Strength */}
        {form.password && (
          <div className="password-strength">
            <span>Password strength: </span>
            <span style={{ color: strengthColors[passwordStrength], fontWeight: '600' }}>
              {strengthLabels[passwordStrength]}
            </span>
            <div className="strength-bars">
              {[0,1,2,3,4].map(i => (
                <div
                  key={i}
                  className="strength-bar"
                  style={{ backgroundColor: i <= passwordStrength ? strengthColors[passwordStrength] : '#ddd' }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <label className="input-label">
          <FiCheckCircle className="input-icon" />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'input-error' : ''}
          />
        </label>
        {errors.confirmPassword && <small className="error-text">{errors.confirmPassword}</small>}

        {/* Buttons */}
        <div className="button-row">
          <button className="btn cancel-btn" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn save-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save User'}
          </button>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 1rem;
        }
        .modal-container {
          background: #fff;
          padding: 2rem 2.5rem;
          border-radius: 12px;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        h2 {
          margin-bottom: 1rem;
          color: #19551B;
          text-align: center;
        }
        .input-label {
          display: flex;
          align-items: center;
          border-bottom: 2px solid #19551B;
          padding: 0.25rem 0.5rem;
          gap: 0.5rem;
        }
        input, select {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1rem;
          padding: 0.5rem 0;
          color: #333;
          background: transparent;
        }
        select {
          appearance: none;
          cursor: pointer;
        }
        .input-icon {
          color: #19551B;
          font-size: 1.25rem;
          min-width: 24px;
        }
        .input-error {
          border-color: #ff3b30 !important;
        }
        .error-text {
          color: #ff3b30;
          font-size: 0.85rem;
          margin-left: 2.5rem;
          margin-top: 0.1rem;
        }
        .role-select-label {
          padding-right: 0;
        }
        .password-strength {
          font-size: 0.9rem;
          color: #666;
          margin-left: 2.5rem;
        }
        .strength-bars {
          display: flex;
          gap: 3px;
          margin-top: 4px;
        }
        .strength-bar {
          flex: 1;
          height: 5px;
          border-radius: 3px;
          background-color: #ddd;
        }
        .button-row {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
        }
        .btn {
          padding: 0.6rem 1.5rem;
          font-weight: 600;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.25s ease;
        }
        .cancel-btn {
          background: #ccc;
          color: #333;
        }
        .cancel-btn:hover:not(:disabled) {
          background: #b3b3b3;
        }
        .save-btn {
          background: #19551B;
          color: white;
        }
        .save-btn:hover:not(:disabled) {
          background: #144314;
        }
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default AddUserModal;
