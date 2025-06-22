import React from 'react';
import Sidebar from './Sidebar';
import { FiUser, FiUsers, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Users = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@gmail.com', category: 'Farmer', joinDate: '2023-01-15' },
    { id: 2, name: 'John Doe', email: 'john@gmail.com', category: 'Agricultural Specialist', joinDate: '2023-02-20' },
    { id: 3, name: 'John Doe', email: 'john@gmail.com', category: 'Farmer', joinDate: '2023-03-10' },
    { id: 4, name: 'John Doe', email: 'john@gmail.com', category: 'Agricultural Specialist', joinDate: '2023-04-05' },
    { id: 5, name: 'John Doe', email: 'john@gmail.com', category: 'Farmer', joinDate: '2023-05-12' },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="main-content">
        <div className="page-header">
          <h1>
            <FiUsers className="page-icon" />
            Users
          </h1>
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search users..." />
          </div>
        </div>
        
        <div className="content-card">
          <div className="table-responsive">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Category</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          <FiUser />
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`user-category ${user.category === 'Farmer' ? 'farmer' : 'specialist'}`}>
                        {user.category}
                      </span>
                    </td>
                    <td>{user.joinDate}</td>
                    <td>
                      <button className="action-btn view">View</button>
                      <button className="action-btn edit">Edit</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="user-categories">
            <h3>User Categories</h3>
            <div className="category-stats">
              <div className="category-card">
                <h4>Farmers</h4>
                <p>3 users</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="category-card">
                <h4>Agricultural Specialists</h4>
                <p>2 users</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;