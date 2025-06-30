import React from 'react';
import Sidebar from './Sidebar';

import { FiBook, FiSearch, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Courses = () => {
  const courses = [
    { 
      id: 1, 
      title: 'Sustainable Farming Techniques', 
      description: 'Learn modern sustainable farming methods that increase yield while preserving the environment.',
      duration: '4 weeks',
      students: 45,
      category: 'Farming'
    },
    { 
      id: 2, 
      title: 'Organic Pest Control', 
      description: 'Discover natural ways to control pests without using harmful chemicals.',
      duration: '3 weeks',
      students: 28,
      category: 'Pest Management'
    },
    { 
      id: 3, 
      title: 'Soil Health Management', 
      description: 'Understand soil composition and techniques to maintain healthy soil for better crops.',
      duration: '5 weeks',
      students: 32,
      category: 'Soil Science'
    },
    { 
      id: 4, 
      title: 'Crop Rotation Strategies', 
      description: 'Master crop rotation techniques to maximize land use and prevent soil depletion.',
      duration: '2 weeks',
      students: 19,
      category: 'Farming'
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="main-content">
        <div className="page-header">
          <h1>
            <FiBook className="page-icon" />
            Courses
          </h1>
          <div className="action-buttons">
            <button className="add-button">
              <FiPlus />
              Add Course
            </button>
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search courses..." />
            </div>
          </div>
        </div>
        
        <div className="content-card">
          <div className="courses-grid">
            {courses.map((course) => (
              <motion.div 
                key={course.id}
                className="course-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="course-header">
                  <h3>{course.title}</h3>
                  <span className="course-category">{course.category}</span>
                </div>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <span>Duration: {course.duration}</span>
                  <span>Students: {course.students}</span>
                </div>
                <div className="course-actions">
                  <button className="view-button">View Details</button>
                  <button className="edit-button">Edit</button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="course-statistics">
            <h3>Course Statistics</h3>
            <div className="stats-cards">
              <div className="stat-card">
                <h4>Total Courses</h4>
                <p>4</p>
              </div>
              <div className="stat-card">
                <h4>Total Students</h4>
                <p>124</p>
              </div>
              <div className="stat-card">
                <h4>Most Popular</h4>
                <p>Sustainable Farming</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Courses;