import React, { useState, useEffect } from 'react';
import { resourceAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import './ResourceForm.css';

const ResourceForm = ({ resource, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    type: 'Textbook',
    description: '',
    subject: '',
    fileUrl: '',
    fileName: '',
    fileSize: 0,
    tags: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadType, setUploadType] = useState('url'); // 'url' or 'file'
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const resourceTypes = ['Textbook', 'Research Paper', 'Study Guide', 'Lecture Notes', 'Video', 'Other'];

  useEffect(() => {
    if (resource) {
      setFormData({
        title: resource.title || '',
        type: resource.type || 'Textbook',
        description: resource.description || '',
        subject: resource.subject || '',
        fileUrl: resource.fileUrl || '',
        fileName: resource.fileName || '',
        fileSize: resource.fileSize || 0,
        tags: resource.tags ? resource.tags.join(', ') : ''
      });
    }
  }, [resource]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, file: 'Only PDF files are allowed' }));
        return;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'File size must be less than 10MB' }));
        return;
      }
      
      setSelectedFile(file);
      setFormData(prev => ({
        ...prev,
        fileName: file.name,
        fileSize: file.size
      }));
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (uploadType === 'url') {
      if (!formData.fileUrl.trim()) {
        newErrors.fileUrl = 'File URL is required';
      }
      if (!formData.fileName.trim()) {
        newErrors.fileName = 'File name is required';
      }
    } else {
      if (!selectedFile && !resource) {
        newErrors.file = 'Please select a PDF file to upload';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage('');
    setUploadProgress(0);

    try {
      let fileUrl = formData.fileUrl;
      let fileName = formData.fileName;
      let fileSize = formData.fileSize;

      // If uploading a file, upload it first
      if (uploadType === 'file' && selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', selectedFile);

        const uploadResponse = await resourceAPI.uploadFile(uploadFormData, (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        });

        fileUrl = uploadResponse.data.fileUrl;
        fileName = uploadResponse.data.fileName;
        fileSize = uploadResponse.data.fileSize;
      }

      const submitData = {
        ...formData,
        fileUrl,
        fileName,
        fileSize: parseInt(fileSize) || 0,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (resource) {
        await resourceAPI.update(resource._id, submitData);
        setMessage('Resource updated successfully!');
      } else {
        await resourceAPI.create(submitData);
        setMessage('Resource created successfully!');
      }

      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save resource');
      console.error(err);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{resource ? 'Edit Resource' : 'Add New Resource'}</h2>
          <button onClick={onClose} className="btn-close">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="resource-form">
          {message && (
            <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
              placeholder="Enter resource title"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="type">Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={errors.type ? 'error' : ''}
            >
              {resourceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <span className="error-message">{errors.type}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? 'error' : ''}
              placeholder="e.g., Computer Science, Mathematics"
            />
            {errors.subject && <span className="error-message">{errors.subject}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
              placeholder="Describe the resource..."
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label>Upload Method *</label>
            <div className="upload-type-selector">
              <button
                type="button"
                className={`upload-type-btn ${uploadType === 'url' ? 'active' : ''}`}
                onClick={() => setUploadType('url')}
              >
                📎 Provide URL
              </button>
              <button
                type="button"
                className={`upload-type-btn ${uploadType === 'file' ? 'active' : ''}`}
                onClick={() => setUploadType('file')}
              >
                📄 Upload PDF
              </button>
            </div>
          </div>

          {uploadType === 'url' ? (
            <>
              <div className="form-group">
                <label htmlFor="fileUrl">File URL *</label>
                <input
                  type="text"
                  id="fileUrl"
                  name="fileUrl"
                  value={formData.fileUrl}
                  onChange={handleChange}
                  className={errors.fileUrl ? 'error' : ''}
                  placeholder="https://example.com/file.pdf"
                />
                {errors.fileUrl && <span className="error-message">{errors.fileUrl}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fileName">File Name *</label>
                  <input
                    type="text"
                    id="fileName"
                    name="fileName"
                    value={formData.fileName}
                    onChange={handleChange}
                    className={errors.fileName ? 'error' : ''}
                    placeholder="file.pdf"
                  />
                  {errors.fileName && <span className="error-message">{errors.fileName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="fileSize">File Size (bytes)</label>
                  <input
                    type="number"
                    id="fileSize"
                    name="fileSize"
                    value={formData.fileSize}
                    onChange={handleChange}
                    placeholder="1048576"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="form-group">
              <label htmlFor="file">Select PDF File *</label>
              <div className="file-upload-container">
                <input
                  type="file"
                  id="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileSelect}
                  className="file-input"
                />
                {selectedFile && (
                  <div className="file-info">
                    <span className="file-name">📄 {selectedFile.name}</span>
                    <span className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                )}
                {!selectedFile && (
                  <div className="file-placeholder">
                    <span>📤 Click to select a PDF file (max 10MB)</span>
                  </div>
                )}
              </div>
              {errors.file && <span className="error-message">{errors.file}</span>}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <span className="progress-text">{uploadProgress}% uploaded</span>
                </div>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="programming, algorithms, tutorial"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (resource ? 'Update Resource' : 'Create Resource')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceForm;
