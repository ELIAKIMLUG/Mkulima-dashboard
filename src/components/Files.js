import React from 'react';
import Sidebar from './Sidebar';
import { FiFile, FiSearch, FiUpload, FiDownload, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Files = () => {
  const files = [
    { id: 1, name: 'Farm_Report_2023.pdf', type: 'pdf', size: '2.4 MB', date: '2023-06-15' },
    { id: 2, name: 'Soil_Analysis.xlsx', type: 'excel', size: '1.8 MB', date: '2023-06-10' },
    { id: 3, name: 'Crop_Rotation_Guide.docx', type: 'word', size: '3.2 MB', date: '2023-05-28' },
    { id: 4, name: 'Pest_Control_Presentation.pptx', type: 'ppt', size: '5.1 MB', date: '2023-05-20' },
    { id: 5, name: 'Harvest_Photos.zip', type: 'archive', size: '12.4 MB', date: '2023-04-30' },
  ];

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf':
        return <FiFile color="#FF5252" />;
      case 'excel':
        return <FiFile color="#4CAF50" />;
      case 'word':
        return <FiFile color="#2196F3" />;
      case 'ppt':
        return <FiFile color="#FF9800" />;
      default:
        return <FiFile color="#9E9E9E" />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="main-content">
        <div className="page-header">
          <h1>
            <FiFile className="page-icon" />
            Files
          </h1>
          <div className="action-buttons">
            <button className="upload-button">
              <FiUpload />
              Upload File
            </button>
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search files..." />
            </div>
          </div>
        </div>
        
        <div className="content-card">
          <div className="files-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <motion.tr 
                    key={file.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>
                      <div className="file-info">
                        {getFileIcon(file.type)}
                        <span>{file.name}</span>
                      </div>
                    </td>
                    <td>{file.type.toUpperCase()}</td>
                    <td>{file.size}</td>
                    <td>{file.date}</td>
                    <td>
                      <button className="action-icon download">
                        <FiDownload />
                      </button>
                      <button className="action-icon delete">
                        <FiTrash2 />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="storage-info">
            <h3>Storage Usage</h3>
            <div className="storage-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '65%' }}></div>
              </div>
              <div className="storage-details">
                <span>25.7 MB of 40 MB used</span>
                <span>65%</span>
              </div>
            </div>
            <button className="upgrade-button">Upgrade Storage</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Files;