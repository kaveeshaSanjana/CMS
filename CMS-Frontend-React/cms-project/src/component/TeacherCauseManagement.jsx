import React, { useState, useEffect } from 'react';
import api from '../api';
import { getAllVideos } from '../services/VideoService';

// Main Cause Management Page Component
const CauseManagementPage = () => {
  // State for causes data
  const [causes, setCauses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCause, setSelectedCause] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddCauseModal, setShowAddCauseModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);

  // Fetch all causes for the logged-in teacher
  useEffect(() => {
    fetchCauses();
  }, []);

  const fetchCauses = async () => {
    setIsLoading(true);
    try {

      const response= await getAllVideos(10)   
      
      if (response.status === 200) {
        setCauses(response.data);
      }
    } catch (err) {
      setError("Failed to load causes. Please try again later.");
      console.error("Error fetching causes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Create new cause handler
  const handleCreateCause = async (causeData) => {
    setIsLoading(true);
    try {
      // Simulated API call to create cause
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            status: 201,
            data: {
              id: Date.now(),
              ...causeData,
              videos: []
            }
          });
        }, 800);
      });
      
      if (response.status === 201) {
        setCauses([...causes, response.data]);
        setShowAddCauseModal(false);
      }
    } catch (err) {
      setError("Failed to create cause. Please try again.");
      console.error("Error creating cause:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update cause handler
  const handleUpdateCause = async (causeId, updatedData) => {
    setIsLoading(true);
    try {
      // Simulated API call to update cause
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            status: 200,
            data: updatedData
          });
        }, 800);
      });
      
      if (response.status === 200) {
        setCauses(causes.map(cause => 
          cause.id === causeId ? { ...cause, ...updatedData } : cause
        ));
        setIsEditing(false);
        setSelectedCause(null);
      }
    } catch (err) {
      setError("Failed to update cause. Please try again.");
      console.error("Error updating cause:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete cause handler
  const handleDeleteCause = async (causeId) => {
    if (!window.confirm("Are you sure you want to delete this cause?")) return;
    
    setIsLoading(true);
    try {
      // Simulated API call to delete cause
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            status: 200
          });
        }, 800);
      });
      
      if (response.status === 200) {
        setCauses(causes.filter(cause => cause.id !== causeId));
        if (selectedCause && selectedCause.id === causeId) {
          setSelectedCause(null);
        }
      }
    } catch (err) {
      setError("Failed to delete cause. Please try again.");
      console.error("Error deleting cause:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add video to cause handler
  const handleAddVideo = async (causeId, videoData) => {
    setIsLoading(true);
    try {
      // Simulated API call to add video
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            status: 201,
            data: {
              videoId: Date.now(),
              causeId,
              ...videoData
            }
          });
        }, 800);
      });
      
      if (response.status === 201) {
        setCauses(causes.map(cause => {
          if (cause.id === causeId) {
            return {
              ...cause,
              videos: [...(cause.videos || []), response.data]
            };
          }
          return cause;
        }));
        setShowAddVideoModal(false);
      }
    } catch (err) {
      setError("Failed to add video. Please try again.");
      console.error("Error adding video:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle video enable/disable handler
  const handleToggleVideoStatus = async (causeId, videoId, currentStatus) => {
    setIsLoading(true);
    try {
      // Simulated API call to toggle video status
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            status: 200,
            data: { isEnable: !currentStatus }
          });
        }, 500);
      });
      
      if (response.status === 200) {
        setCauses(causes.map(cause => {
          if (cause.id === causeId) {
            return {
              ...cause,
              videos: cause.videos.map(video => 
                video.videoId === videoId 
                  ? { ...video, isEnable: !currentStatus }
                  : video
              )
            };
          }
          return cause;
        }));
      }
    } catch (err) {
      setError("Failed to update video status. Please try again.");
      console.error("Error updating video status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle cause enable/disable handler
  const handleToggleCauseStatus = async (causeId, currentStatus) => {
    setIsLoading(true);
    try {
      // Simulated API call to toggle cause status
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            status: 200,
            data: { isEnable: !currentStatus }
          });
        }, 500);
      });
      
      if (response.status === 200) {
        setCauses(causes.map(cause => 
          cause.id === causeId 
            ? { ...cause, isEnable: !currentStatus }
            : cause
        ));
      }
    } catch (err) {
      setError("Failed to update cause status. Please try again.");
      console.error("Error updating cause status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#D4AF37', borderBottom: '2px solid #D4AF37', paddingBottom: '10px' }}>
        Cause Management
      </h1>
      
      {error && (
        <div style={{ 
          backgroundColor: '#FFE6E6', 
          color: '#D8000C', 
          padding: '15px', 
          margin: '15px 0', 
          borderRadius: '5px', 
          border: '1px solid #D8000C' 
        }}>
          {error}
          <button 
            style={{ 
              float: 'right', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              fontWeight: 'bold' 
            }}
            onClick={() => setError(null)}
          >
            ✕
          </button>
        </div>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button 
          style={{
            backgroundColor: '#D4AF37',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}
          onClick={() => setShowAddCauseModal(true)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#B8860B'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D4AF37'}
        >
          Add New Cause
        </button>
        
        <div>
          <input 
            type="text" 
            placeholder="Search causes..." 
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #D4AF37',
              marginRight: '10px'
            }}
          />
          <select 
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #D4AF37'
            }}
          >
            <option value="all">All Causes</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>
      
      {isLoading && !causes.length ? (
        <div style={{ textAlign: 'center', padding: '30px' }}>
          <LoadingSpinner />
          <p>Loading causes...</p>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          {/* Causes List */}
          <div style={{ width: '30%', marginRight: '20px' }}>
            <h2 style={{ color: '#D4AF37' }}>Your Causes</h2>
            {causes.length === 0 ? (
              <p>No causes found. Create your first cause to get started.</p>
            ) : (
              <ul style={{ 
                listStyleType: 'none', 
                padding: 0, 
                margin: 0,
                maxHeight: '600px',
                overflowY: 'auto'
              }}>
                {causes.map(cause => (
                  <li 
                    key={cause.id} 
                    style={{
                      padding: '15px',
                      margin: '10px 0',
                      borderRadius: '5px',
                      border: `1px solid ${selectedCause && selectedCause.id === cause.id ? '#D4AF37' : '#e0e0e0'}`,
                      backgroundColor: selectedCause && selectedCause.id === cause.id ? '#F5EFD5' : 'white',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedCause(cause)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ 
                        margin: '0 0 5px 0', 
                        color: cause.isEnable ? '#D4AF37' : '#999' 
                      }}>
                        {cause.title}
                      </h3>
                      <span style={{ 
                        backgroundColor: cause.isEnable ? '#D4AF37' : '#999',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        {cause.isEnable ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                      {cause.description.length > 80 ? 
                        `${cause.description.substring(0, 80)}...` : 
                        cause.description}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginTop: '10px',
                      fontSize: '14px' 
                    }}>
                      <span>${cause.price.toFixed(2)}</span>
                      <span>{cause.videos?.length || 0} video(s)</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Cause Details */}
          <div style={{ width: '70%', backgroundColor: '#fcfcfc', borderRadius: '5px', padding: '20px' }}>
            {selectedCause ? (
              isEditing ? (
                <CauseEditForm 
                  cause={selectedCause}
                  onCancel={() => setIsEditing(false)}
                  onSubmit={(updatedData) => handleUpdateCause(selectedCause.id, updatedData)}
                />
              ) : (
                <CauseDetail 
                  cause={selectedCause}
                  onEdit={() => setIsEditing(true)}
                  onDelete={() => handleDeleteCause(selectedCause.id)}
                  onToggleStatus={() => handleToggleCauseStatus(selectedCause.id, selectedCause.isEnable)}
                  onAddVideo={() => setShowAddVideoModal(true)}
                  onToggleVideoStatus={(videoId, status) => 
                    handleToggleVideoStatus(selectedCause.id, videoId, status)}
                />
              )
            ) : (
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <svg 
                  width="80" 
                  height="80" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" 
                    fill="#D4AF37"
                  />
                </svg>
                <h3 style={{ color: '#666' }}>Select a cause to view details</h3>
                <p>Or create a new cause using the button above</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {showAddCauseModal && (
        <Modal onClose={() => setShowAddCauseModal(false)}>
          <AddCauseForm onSubmit={handleCreateCause} onCancel={() => setShowAddCauseModal(false)} />
        </Modal>
      )}
      
      {showAddVideoModal && selectedCause && (
        <Modal onClose={() => setShowAddVideoModal(false)}>
          <AddVideoForm 
            causeId={selectedCause.id}
            onSubmit={(videoData) => handleAddVideo(selectedCause.id, videoData)}
            onCancel={() => setShowAddVideoModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

// CauseDetail Component
const CauseDetail = ({ cause, onEdit, onDelete, onToggleStatus, onAddVideo, onToggleVideoStatus }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h2 style={{ color: '#D4AF37', margin: '0 0 15px 0' }}>{cause.title}</h2>
        <div>
          <button
            style={{
              backgroundColor: 'transparent',
              color: '#D4AF37',
              border: '1px solid #D4AF37',
              margin: '0 5px',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            style={{
              backgroundColor: cause.isEnable ? '#999' : '#D4AF37',
              color: 'white',
              border: 'none',
              margin: '0 5px',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={onToggleStatus}
          >
            {cause.isEnable ? 'Disable' : 'Enable'}
          </button>
          <button
            style={{
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              margin: '0 5px',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ 
          width: '200px', 
          height: '150px', 
          backgroundColor: '#F5EFD5', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '5px',
          marginRight: '20px'
        }}>
          {cause.thumbnailUrl ? (
            <img 
              src={cause.thumbnailUrl} 
              alt={cause.title} 
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '5px' }}
            />
          ) : (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z" fill="#D4AF37"/>
            </svg>
          )}
        </div>
        <div>
          <p style={{ margin: '0 0 10px 0' }}>{cause.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '10px' }}>
            <div>
              <strong>Price:</strong> ${cause.price.toFixed(2)}
            </div>
            <div>
              <strong>Review:</strong> {cause.review}/5
            </div>
            <div>
              <strong>Visibility:</strong> {cause.videoVisibility}
            </div>
            <div>
              <strong>Status:</strong> {cause.isEnable ? 'Active' : 'Disabled'}
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: '#D4AF37' }}>Videos ({cause.videos?.length || 0})</h3>
          <button
            style={{
              backgroundColor: '#D4AF37',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={onAddVideo}
          >
            Add Video
          </button>
        </div>
        
        {!cause.videos || cause.videos.length === 0 ? (
          <p>No videos available for this cause. Add your first video.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #F5EFD5' }}>
                <th style={{ textAlign: 'left', padding: '10px', color: '#666' }}>Title</th>
                <th style={{ textAlign: 'left', padding: '10px', color: '#666' }}>Description</th>
                <th style={{ textAlign: 'center', padding: '10px', color: '#666' }}>Position</th>
                <th style={{ textAlign: 'center', padding: '10px', color: '#666' }}>Visibility</th>
                <th style={{ textAlign: 'center', padding: '10px', color: '#666' }}>Status</th>
                <th style={{ textAlign: 'center', padding: '10px', color: '#666' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cause.videos.sort((a, b) => a.position - b.position).map(video => (
                <tr key={video.videoId} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px 10px' }}>{video.title}</td>
                  <td style={{ padding: '12px 10px' }}>
                    {video.description.length > 50 
                      ? `${video.description.substring(0, 50)}...` 
                      : video.description}
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px 10px' }}>{video.position}</td>
                  <td style={{ textAlign: 'center', padding: '12px 10px' }}>
                    <span style={{
                      backgroundColor: video.causeVisibility === 'PUBLIC' ? '#D4AF37' : '#999',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {video.causeVisibility}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px 10px' }}>
                    <span style={{
                      backgroundColor: video.isEnable ? '#4CAF50' : '#999',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {video.isEnable ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px 10px' }}>
                    <button
                      style={{
                        backgroundColor: 'transparent',
                        color: '#D4AF37',
                        border: '1px solid #D4AF37',
                        padding: '5px 10px',
                        marginRight: '5px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                      onClick={() => {
                        // View video logic can be added here
                        window.open(video.url, '_blank');
                      }}
                    >
                      View
                    </button>
                    <button
                      style={{
                        backgroundColor: video.isEnable ? '#999' : '#D4AF37',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                      onClick={() => onToggleVideoStatus(video.videoId, video.isEnable)}
                    >
                      {video.isEnable ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// CauseEditForm Component
const CauseEditForm = ({ cause, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: cause.title,
    description: cause.description,
    price: cause.price,
    thumbnailUrl: cause.thumbnailUrl || '',
    videoVisibility: cause.videoVisibility,
    isEnable: cause.isEnable
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (isNaN(formData.price) || formData.price <= 0) newErrors.price = "Price must be a positive number";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...cause,
        ...formData,
        price: parseFloat(formData.price)
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ color: '#D4AF37', marginBottom: '20px' }}>Edit Cause</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: errors.title ? '1px solid #ff6b6b' : '1px solid #ddd'
          }}
        />
        {errors.title && <span style={{ color: '#ff6b6b', fontSize: '14px' }}>{errors.title}</span>}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Description:
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: errors.description ? '1px solid #ff6b6b' : '1px solid #ddd'
          }}
        ></textarea>
        {errors.description && <span style={{ color: '#ff6b6b', fontSize: '14px' }}>{errors.description}</span>}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Price ($):
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: errors.price ? '1px solid #ff6b6b' : '1px solid #ddd'
          }}
        />
        {errors.price && <span style={{ color: '#ff6b6b', fontSize: '14px' }}>{errors.price}</span>}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Thumbnail URL:
        </label>
        <input
          type="text"
          name="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Video Visibility:
        </label>
        <select
          name="videoVisibility"
          value={formData.videoVisibility}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}
        >
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
        </select>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            name="isEnable"
            checked={formData.isEnable}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
          />
          <span>Enable this cause</span>
        </label>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            backgroundColor: '#f0f0f0',
            color: '#333',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            backgroundColor: '#D4AF37',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

// AddCauseForm Component
const AddCauseForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    thumbnailUrl: '',
    videoVisibility: 'PUBLIC',
    isEnable: true
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price),
        ownerId: 101, // Assuming current logged in teacher ID
        review: 0
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ color: '#D4AF37', marginBottom: '20px' }}>Create New Cause</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: errors.title ? '1px solid #ff6b6b' : '1px solid #ddd'
          }}
          placeholder="Enter cause title"
        />
        {errors.title && <span style={{ color: '#ff6b6b', fontSize: '14px' }}>{errors.title}</span>}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Description:
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: errors.description ? '1px solid #ff6b6b' : '1px solid #ddd'
          }}
          placeholder="Enter cause description"
        ></textarea>
        {errors.description && <span style={{ color: '#ff6b6b', fontSize: '14px' }}>{errors.description}</span>}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Price ($):
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: errors.price ? '1px solid #ff6b6b' : '1px solid #ddd'
          }}
          placeholder="0.00"
        />
        {errors.price && <span style={{ color: '#ff6b6b', fontSize: '14px' }}>{errors.price}</span>}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Thumbnail URL:
        </label>
        <input
          type="text"
          name="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Video Visibility:
        </label>
        <select
          name="videoVisibility"
          value={formData.videoVisibility}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}
        >
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
        </select>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            name="isEnable"
            checked={formData.isEnable}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
          />
          <span>Enable this cause</span>
        </label>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            backgroundColor: '#f0f0f0',
            color: '#333',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            backgroundColor: '#D4AF37',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Create Cause
        </button>
      </div>
    </form>
  );
};

// AddVideoForm Component
const AddVideoForm = ({ causeId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    position: 1,
    isEnable: true,
    causeVisibility: 'PUBLIC'
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : name === 'position' ? parseInt(value) : value
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.url.trim()) newErrors.url = "Video URL is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (isNaN(formData.position) || formData.position < 1) {
      newErrors.position = "Position must be a positive number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ color: '#D4AF37', marginBottom: '20px' }}>Add New Video</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Video Title:
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: errors.title ? '1px solid #ff6b6b' : '1px solid #ddd'
          }}
          placeholder="Enter video title"
        />
        {errors.title && <span style={{ color: '#ff6b6b', fontSize: '14px' }}>{errors.title}</span>}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Video URL:
        </label>
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: errors.url ? '1px solid #ff6b6b' : '1px solid #ddd'
          }}
          placeholder="https://example.com/video.mp4"
        />
        {errors.url && <span style={{ color: '#ff6b6b', fontSize: '14px' }}>{errors.url}</span>}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Description:
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: errors.description ? '1px solid #ff6b6b' : '1px solid #ddd'
          }}
          placeholder="Enter video description"
        ></textarea>
        {errors.description && <span style={{ color: '#ff6b6b', fontSize: '14px' }}>{errors.description}</span>}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Position (Order):
        </label>
        <input
          type="number"
          name="position"
          value={formData.position}
          onChange={handleChange}
          min="1"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: errors.position ? '1px solid #ff6b6b' : '1px solid #ddd'
          }}
        />
        {errors.position && <span style={{ color: '#ff6b6b', fontSize: '14px' }}>{errors.position}</span>}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Visibility:
        </label>
        <select
          name="causeVisibility"
          value={formData.causeVisibility}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}
        >
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
        </select>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            name="isEnable"
            checked={formData.isEnable}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
          />
          <span>Enable this video</span>
        </label>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            backgroundColor: '#f0f0f0',
            color: '#333',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            backgroundColor: '#D4AF37',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add Video
        </button>
      </div>
    </form>
  );
};

// Modal Component
const Modal = ({ children, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '20px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

// LoadingSpinner Component
const LoadingSpinner = () => {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 50 50" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <circle 
        cx="25" 
        cy="25" 
        r="20" 
        fill="none" 
        strokeWidth="5" 
        stroke="#D4AF37" 
        strokeDasharray="31.4 31.4" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

export default CauseManagementPage;